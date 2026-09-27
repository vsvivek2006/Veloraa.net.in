const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const sections = await page.evaluate(() => {
    const main = document.querySelector('#MainContent');
    if (!main) return [];
    const children = Array.from(main.querySelectorAll(':scope > .shopify-section, :scope > div > .shopify-section, :scope > section, :scope > div[id^="shopify-section"]'));
    return children.map((el, i) => {
      const rect = el.getBoundingClientRect();
      return {
        index: i,
        id: el.id,
        className: el.className,
        tagName: el.tagName,
        height: rect.height,
        width: rect.width,
        top: rect.top + window.scrollY,
        innerTextSample: el.innerText ? el.innerText.trim().slice(0, 100).replace(/\n+/g, ' ') : '',
      };
    });
  });

  console.log('Found sections:', sections.length);
  sections.forEach(s => {
    console.log(`[${s.index}] ID: ${s.id} | Tag: ${s.tagName} | H: ${Math.round(s.height)}px | Text: ${s.innerTextSample}`);
  });

  fs.writeFileSync('scripts/live_pdp_sections_overview.json', JSON.stringify(sections, null, 2));

  await browser.close();
})();
