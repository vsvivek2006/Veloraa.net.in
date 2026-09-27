const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  const zoomIn = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.animate--zoom-in, [class*="zoom"]')).map(e => ({
      tag: e.tagName,
      id: e.id,
      className: e.className
    }));
  });
  console.log('ZOOM ELEMENTS ON LIVE:', JSON.stringify(zoomIn, null, 2));
  await browser.close();
})();
