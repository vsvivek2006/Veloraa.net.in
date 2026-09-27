const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  // 1. Live page
  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await livePage.waitForTimeout(3000);

  // 2. Local page
  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await localPage.waitForTimeout(2000);

  // A. Check Root / Body / Zoom / Font-size
  const getScaleInfo = (page) => page.evaluate(() => {
    return {
      htmlFontSize: window.getComputedStyle(document.documentElement).fontSize,
      bodyFontSize: window.getComputedStyle(document.body).fontSize,
      bodyZoom: window.getComputedStyle(document.body).zoom,
      docWidth: document.documentElement.clientWidth,
      bodyWidth: document.body.clientWidth,
      pageWidthEl: document.querySelector('.page-width') ? {
        maxWidth: window.getComputedStyle(document.querySelector('.page-width')).maxWidth,
        padding: window.getComputedStyle(document.querySelector('.page-width')).padding,
        width: document.querySelector('.page-width').getBoundingClientRect().width
      } : null
    };
  });
  console.log('=== SCALE / ZOOM INFO ===');
  console.log('LIVE:', await getScaleInfo(livePage));
  console.log('LOCAL:', await getScaleInfo(localPage));

  // B. Check Animations on Live site
  const liveAnimations = await livePage.evaluate(() => {
    // Check all elements with animate- or scroll-trigger classes
    const animElements = Array.from(document.querySelectorAll('[class*="anim"], [class*="scroll-trigger"]')).map(el => ({
      tag: el.tagName,
      className: el.className,
      animation: window.getComputedStyle(el).animation,
      transition: window.getComputedStyle(el).transition
    }));

    // Check all keyframes in stylesheets
    const keyframes = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.type === CSSRule.KEYFRAMES_RULE) {
            keyframes.push(rule.name);
          }
        }
      } catch (e) {}
    }

    return {
      animElementsCount: animElements.length,
      sampleElements: animElements.slice(0, 10),
      keyframes: [...new Set(keyframes)]
    };
  });
  console.log('=== LIVE ANIMATIONS ===');
  console.log(JSON.stringify(liveAnimations, null, 2));

  // C. Check "Review" widget / tab / badge on live site
  const reviewsLive = await livePage.evaluate(() => {
    // Look for anything with review, rating, star, vstar
    const els = Array.from(document.querySelectorAll('[class*="review"], [id*="review"], [class*="star"], [id*="vstar"], [class*="badge"], [class*="judge"], [class*="loox"], [class*="yotpo"]'));
    return els.map(el => ({
      id: el.id,
      className: el.className,
      text: el.innerText ? el.innerText.trim() : '',
      rect: el.getBoundingClientRect(),
      style: {
        position: window.getComputedStyle(el).position,
        top: window.getComputedStyle(el).top,
        right: window.getComputedStyle(el).right,
        bottom: window.getComputedStyle(el).bottom,
        left: window.getComputedStyle(el).left,
        transform: window.getComputedStyle(el).transform,
        zIndex: window.getComputedStyle(el).zIndex,
        background: window.getComputedStyle(el).backgroundColor,
        color: window.getComputedStyle(el).color
      }
    })).filter(e => e.rect.width > 0 && e.rect.height > 0);
  });
  console.log('=== LIVE REVIEWS / BADGES / WIDGETS ===');
  console.log(JSON.stringify(reviewsLive, null, 2));

  // Also check local reviews widget
  const reviewsLocal = await localPage.evaluate(() => {
    const els = Array.from(document.querySelectorAll('[class*="review"], [id*="review"], [class*="star"], [id*="vstar"]'));
    return els.map(el => ({
      id: el.id,
      className: el.className,
      text: el.innerText ? el.innerText.trim() : '',
      rect: el.getBoundingClientRect(),
      style: {
        position: window.getComputedStyle(el).position,
        top: window.getComputedStyle(el).top,
        right: window.getComputedStyle(el).right,
        bottom: window.getComputedStyle(el).bottom,
        left: window.getComputedStyle(el).left,
        transform: window.getComputedStyle(el).transform,
        zIndex: window.getComputedStyle(el).zIndex,
        background: window.getComputedStyle(el).backgroundColor,
        color: window.getComputedStyle(el).color
      }
    })).filter(e => e.rect.width > 0 && e.rect.height > 0);
  });
  console.log('=== LOCAL REVIEWS / BADGES / WIDGETS ===');
  console.log(JSON.stringify(reviewsLocal, null, 2));

  // Take screenshot of live right side / top right
  await livePage.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/live_viewport_top.png' });
  await localPage.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/local_viewport_top.png' });

  await browser.close();
})();
