const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'networkidle', timeout: 35000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const cardDetails = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('[class*="card"], [class*="variant"], [class*="bundle"], .veloraa-card, .veloraa-review-card, .veloraa-trust-card, .grid-review'));
    return cards.map(c => {
      const cs = window.getComputedStyle(c);
      return {
        className: c.className,
        id: c.id,
        background: cs.background,
        boxShadow: cs.boxShadow,
        border: cs.border,
        borderRadius: cs.borderRadius,
        transition: cs.transition,
        filter: cs.filter,
        backdropFilter: cs.backdropFilter
      };
    }).filter(c => c.boxShadow !== 'none' || c.background.includes('gradient'));
  });

  console.log(JSON.stringify(cardDetails.slice(0, 20), null, 2));
  await browser.close();
})();
