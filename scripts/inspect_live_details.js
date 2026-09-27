const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. Get all sections on the page
  const sections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.shopify-section')).map((s, idx) => ({
      index: idx,
      id: s.id,
      className: s.className,
      rect: s.getBoundingClientRect(),
      textPreview: s.innerText ? s.innerText.slice(0, 80).replace(/\n/g, ' ') : ''
    }));
  });
  console.log('=== SECTIONS ON LIVE HOMEPAGE ===');
  console.log(JSON.stringify(sections, null, 2));

  // 2. Check product cards and hover behavior
  const productCardDetails = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.card-wrapper'));
    return cards.map(c => {
      const media = c.querySelector('.media');
      const imgs = c.querySelectorAll('img');
      return {
        cardClass: c.className,
        innerCardClass: c.querySelector('.card')?.className,
        mediaClass: media?.className,
        imageCount: imgs.length,
        imgSrcs: Array.from(imgs).map(i => i.src)
      };
    });
  });
  console.log('=== PRODUCT CARDS DETAILS (COUNT: ' + productCardDetails.length + ') ===');
  console.log(JSON.stringify(productCardDetails.slice(0, 3), null, 2));

  // 3. Check CSS rules for media hover effect on Dawn
  const hoverCss = await page.evaluate(() => {
    const card = document.querySelector('.card-wrapper');
    if (!card) return null;
    const media = card.querySelector('.media');
    const firstImg = card.querySelector('.media img');
    return {
      cardTransform: window.getComputedStyle(card).transform,
      cardTransition: window.getComputedStyle(card).transition,
      mediaTransform: media ? window.getComputedStyle(media).transform : null,
      firstImgTransform: firstImg ? window.getComputedStyle(firstImg).transform : null,
      firstImgTransition: firstImg ? window.getComputedStyle(firstImg).transition : null
    };
  });
  console.log('=== HOVER CSS NORMAL ===', hoverCss);

  // Trigger hover on card and measure
  const cardElement = await page.$('.card-wrapper');
  if (cardElement) {
    await cardElement.hover();
    await page.waitForTimeout(500);
    const hoverActiveCss = await page.evaluate(() => {
      const card = document.querySelector('.card-wrapper');
      const media = card.querySelector('.media');
      const firstImg = card.querySelector('.media img');
      const allImgs = Array.from(card.querySelectorAll('.media img'));
      return {
        cardTransform: window.getComputedStyle(card).transform,
        mediaTransform: window.getComputedStyle(media).transform,
        firstImgTransform: firstImg ? window.getComputedStyle(firstImg).transform : null,
        imgsOpacity: allImgs.map(i => window.getComputedStyle(i).opacity),
        imgsVisibility: allImgs.map(i => window.getComputedStyle(i).visibility)
      };
    });
    console.log('=== HOVER CSS ON HOVER ===', hoverActiveCss);
  }

  // 4. Check for any slider/slideshow or banner with left/right buttons
  const bannersAndSliders = await page.evaluate(() => {
    const banners = Array.from(document.querySelectorAll('.banner, .slideshow, .slider-component, [class*="banner"], [class*="slider"]'));
    return banners.map(b => ({
      tag: b.tagName,
      id: b.id,
      className: b.className,
      rect: b.getBoundingClientRect(),
      buttons: Array.from(b.querySelectorAll('button, a')).map(btn => ({
        tag: btn.tagName,
        className: btn.className,
        text: btn.innerText.trim(),
        ariaLabel: btn.getAttribute('aria-label'),
        rect: btn.getBoundingClientRect()
      }))
    }));
  });
  console.log('=== BANNERS AND SLIDERS ===');
  console.log(JSON.stringify(bannersAndSliders, null, 2));

  // 5. Look for buttons or arrows across the whole page
  const allButtons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, [role="button"], .slider-button')).map(btn => ({
      text: btn.innerText.trim(),
      className: btn.className,
      ariaLabel: btn.getAttribute('aria-label'),
      rect: btn.getBoundingClientRect(),
      parentClass: btn.parentElement?.className
    }));
  });
  console.log('=== ALL BUTTONS ON PAGE ===');
  console.log(JSON.stringify(allButtons, null, 2));

  await browser.close();
})();
