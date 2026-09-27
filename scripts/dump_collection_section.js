const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/collections/frontpage', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const sectionHtml = await page.evaluate(() => {
    const s = document.querySelector('section.shopify-section');
    if (!s) return 'None';
    return {
      id: s.id,
      className: s.className,
      titleHtml: s.querySelector('.collection__title, .title-wrapper')?.outerHTML,
      gridClasses: s.querySelector('ul.grid')?.className,
      padding: window.getComputedStyle(s).padding,
      innerPadding: window.getComputedStyle(s.firstElementChild).padding,
      headingText: s.querySelector('h1, h2')?.textContent.trim()
    };
  });

  console.log(JSON.stringify(sectionHtml, null, 2));
  await browser.close();
})();
