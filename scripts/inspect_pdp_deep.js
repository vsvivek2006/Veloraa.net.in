const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'networkidle', timeout: 35000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const sections = await page.evaluate(() => {
    const list = Array.from(document.querySelectorAll('main > *, [id*="shopify-section-template--"], section'));
    const unique = [];
    const seen = new Set();
    for (const el of list) {
      if (seen.has(el.id)) continue;
      if (el.id) seen.add(el.id);
      const rect = el.getBoundingClientRect();
      if (rect.height > 20) {
        unique.push({
          tag: el.tagName,
          id: el.id,
          className: (el.className || '').slice(0, 60),
          height: Math.round(rect.height),
          top: Math.round(rect.top + window.scrollY),
          heading: el.querySelector('h1, h2, h3')?.textContent.trim()?.slice(0, 80)
        });
      }
    }
    return unique.sort((a, b) => a.top - b.top);
  });

  console.log(JSON.stringify(sections, null, 2));
  await browser.close();
})();
