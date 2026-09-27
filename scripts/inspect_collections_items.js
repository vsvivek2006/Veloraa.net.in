const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/collections/frontpage', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const data = await page.evaluate(() => {
    const heading = document.querySelector('h1, h2.title')?.textContent.trim();
    const items = Array.from(document.querySelectorAll('.card, .grid__item')).map(item => {
      const title = item.querySelector('.card__heading, h3, a')?.textContent.trim();
      const price = item.querySelector('.price, .price-item')?.textContent.replace(/\s+/g, ' ').trim();
      const href = item.querySelector('a')?.getAttribute('href');
      return { title, price, href };
    }).filter(i => i.title);

    return { heading, items };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
