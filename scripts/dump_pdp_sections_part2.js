const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'networkidle', timeout: 35000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const s7 = document.querySelector('#shopify-section-template--26661922308414__17391977265eb60ca1');
    const s8 = document.querySelector('#shopify-section-template--26661922308414__featured_collection_4Q3YAU');
    const s9 = document.querySelector('#shopify-section-template--26661922308414__custom_liquid_im8A6L');
    
    return {
      s7Html: s7 ? s7.innerHTML : null,
      s8Html: s8 ? s8.innerHTML : null,
      s9Html: s9 ? s9.innerHTML : null
    };
  });

  fs.writeFileSync('scripts/pdp_sections_dump_part2.json', JSON.stringify(data, null, 2));
  console.log('Saved dump part 2 to scripts/pdp_sections_dump_part2.json');
  console.log('S7 Length:', data.s7Html ? data.s7Html.length : 0);
  console.log('S8 Length:', data.s8Html ? data.s8Html.length : 0);
  console.log('S9 Length:', data.s9Html ? data.s9Html.length : 0);
  await browser.close();
})();
