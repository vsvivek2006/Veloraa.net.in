const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. Inspect all elements with animation or transition on live
  const allLiveAnimations = await page.evaluate(() => {
    const results = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const computed = window.getComputedStyle(el);
      const hasAnim = computed.animationName && computed.animationName !== 'none';
      const hasTrans = computed.transitionProperty && computed.transitionProperty !== 'none' && computed.transitionDuration !== '0s';
      const className = el.className && typeof el.className === 'string' ? el.className : '';
      if (hasAnim || className.includes('animate') || className.includes('scroll-trigger') || className.includes('banner')) {
        results.push({
          tag: el.tagName,
          id: el.id,
          className: className,
          animation: computed.animation,
          animationName: computed.animationName,
          animationDuration: computed.animationDuration,
          animationTimingFunction: computed.animationTimingFunction,
          transition: computed.transition,
          transform: computed.transform
        });
      }
    }
    return results;
  });

  console.log('=== ALL LIVE ANIMATIONS (COUNT: ' + allLiveAnimations.length + ') ===');
  console.log(JSON.stringify(allLiveAnimations.slice(0, 25), null, 2));

  // 2. Specifically inspect Hero Banner (Banner 1) and Secondary Banner (Banner 2) on live
  const banners = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.banner, [id*="banner"], [id*="Banner"]')).map(b => ({
      id: b.id,
      className: b.className,
      outerHTML: b.outerHTML.slice(0, 500),
      mediaClasses: b.querySelector('.media')?.className,
      imgClasses: b.querySelector('img')?.className,
      style: b.getAttribute('style')
    }));
  });
  console.log('=== LIVE BANNERS DETAILED ===');
  console.log(JSON.stringify(banners, null, 2));

  // 3. Inspect what happens to banners when scrolling
  console.log('=== SCROLLING LIVE AND CHECKING BANNERS ===');
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(1000);

  const bannersAfterScroll = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.banner, [id*="banner"], [id*="Banner"]')).map(b => ({
      id: b.id,
      className: b.className,
      animation: window.getComputedStyle(b).animation,
      transform: window.getComputedStyle(b).transform,
      opacity: window.getComputedStyle(b).opacity,
      mediaTransform: b.querySelector('.media') ? window.getComputedStyle(b.querySelector('.media')).transform : null,
      imgTransform: b.querySelector('img') ? window.getComputedStyle(b.querySelector('img')).transform : null
    }));
  });
  console.log(JSON.stringify(bannersAfterScroll, null, 2));

  // 4. Inspect announcement bar animation on live
  const annAnimation = await page.evaluate(() => {
    const slider = document.querySelector('.announcement-bar-slider');
    const msg = document.querySelector('.announcement-bar__message');
    const span = msg?.querySelector('span');
    return {
      sliderClass: slider?.className,
      msgClass: msg?.className,
      msgAnimation: msg ? window.getComputedStyle(msg).animation : null,
      spanAnimation: span ? window.getComputedStyle(span).animation : null
    };
  });
  console.log('=== ANNOUNCEMENT BAR ANIMATION ===', annAnimation);

  await browser.close();
})();
