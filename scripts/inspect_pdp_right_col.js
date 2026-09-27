const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'networkidle', timeout: 35000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const info = document.querySelector('.product__info-container') || document.querySelector('.product__info-wrapper');
    if (!info) return 'Not found';

    const blocks = Array.from(info.children).map(child => ({
      tag: child.tagName,
      className: child.className,
      text: child.textContent.replace(/\s+/g, ' ').trim().slice(0, 100),
      height: Math.round(child.getBoundingClientRect().height)
    }));

    return { blocks };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
