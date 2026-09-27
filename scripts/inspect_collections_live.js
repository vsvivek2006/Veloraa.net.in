const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/collections/frontpage', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const title = document.querySelector('h1')?.textContent.trim();
    const productCount = document.querySelector('#ProductCount, #ProductCountDesktop')?.textContent.trim();
    const cards = Array.from(document.querySelectorAll('.card, .product-card, [id*="Card-"]'));
    const sections = Array.from(document.querySelectorAll('main > *, [id*="shopify-section-template--"]')).map(s => ({
      id: s.id,
      tag: s.tagName,
      className: s.className,
      height: Math.round(s.getBoundingClientRect().height)
    }));
    return {
      title,
      productCount,
      totalCards: cards.length,
      sections
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
