const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // 1. Observe slide transitions on live
  const slidesHtml = await page.evaluate(() => {
    const slider = document.querySelector('#Slider-sections--26661918277950__announcement-bar');
    return slider ? slider.innerHTML : null;
  });
  console.log('SLIDES HTML:', slidesHtml);

  // 2. Track slider component on live
  const sliderComponent = await page.evaluate(() => {
    const comp = document.querySelector('slideshow-component');
    return comp ? {
      tag: comp.tagName,
      attributes: Array.from(comp.attributes).map(a => ({ name: a.name, value: a.value }))
    } : null;
  });
  console.log('SLIDER COMPONENT:', sliderComponent);

  // 3. Listen to DOM mutations on announcement-bar
  await page.evaluate(() => {
    window.__events = [];
    const target = document.querySelector('.announcement-bar');
    if (!target) return;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        window.__events.push({
          type: m.type,
          attributeName: m.attributeName,
          targetClass: m.target.className
        });
      });
    });
    observer.observe(target, { attributes: true, subtree: true, childList: true });
  });

  // Wait 4 seconds for autoplay or click
  await page.waitForTimeout(4000);
  const mutations = await page.evaluate(() => window.__events);
  console.log('AUTOPLAY MUTATIONS:', mutations ? mutations.slice(0, 15) : []);

  await browser.close();
})();
