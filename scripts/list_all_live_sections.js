const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const sections = await page.evaluate(() => {
    // Traverse body children or direct sections
    const elements = Array.from(document.querySelectorAll('header, main > *, footer, [id*="shopify-section-sections--"], [id*="shopify-section-template--"]'));
    const unique = [];
    const seen = new Set();
    for (const el of elements) {
      if (seen.has(el.id)) continue;
      if (el.id) seen.add(el.id);
      const rect = el.getBoundingClientRect();
      if (rect.height > 10) {
        unique.push({
          tag: el.tagName,
          id: el.id,
          height: Math.round(rect.height),
          top: Math.round(rect.top + window.scrollY),
          sampleText: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 70)
        });
      }
    }
    return unique.sort((a, b) => a.top - b.top);
  });

  console.log(JSON.stringify(sections, null, 2));
  await browser.close();
})();
