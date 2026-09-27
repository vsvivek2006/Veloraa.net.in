const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/collections/all', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const data = await page.evaluate(() => {
    const heading = document.querySelector('h1, h2.title')?.textContent.trim();
    const count = document.querySelector('#ProductCount, #ProductCountDesktop')?.textContent.trim();
    const cards = Array.from(document.querySelectorAll('.card, .grid__item')).map(c => {
      const title = c.querySelector('.card__heading, h3, a')?.textContent.trim();
      return title;
    }).filter(Boolean);
    const uniqueCards = Array.from(new Set(cards));
    return { heading, count, uniqueCards };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
