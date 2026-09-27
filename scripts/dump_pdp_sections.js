const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const sectionIds = [
    'shopify-section-template--26661922308414__custom_liquid_K4grnV', // sec 3
    'shopify-section-template--26661922308414__custom_liquid_YiiVN4', // sec 4
    'shopify-section-template--26661922308414__image_banner_hCj3Hc',  // sec 5
    'shopify-section-template--26661922308414__custom_liquid_mUmtdr', // sec 6
    'shopify-section-template--26661922308414__17391977265eb60ca1',  // sec 7 (Trustoo)
    'shopify-section-template--26661922308414__featured_collection_4Q3YAU', // sec 8
    'shopify-section-template--26661922308414__custom_liquid_im8A6L'  // sec 9 (FAQ)
  ];

  for (let i = 0; i < sectionIds.length; i++) {
    const id = sectionIds[i];
    const num = i + 3;
    const html = await page.evaluate((secId) => {
      const el = document.getElementById(secId);
      return el ? el.outerHTML : null;
    }, id);

    if (html) {
      fs.writeFileSync(`scripts/sec${num}_live.html`, html);
      console.log(`Saved sec${num}_live.html (${html.length} bytes)`);
    } else {
      console.log(`Section ${id} not found`);
    }
  }

  await browser.close();
})();
