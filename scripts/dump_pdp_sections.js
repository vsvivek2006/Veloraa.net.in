const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'networkidle', timeout: 35000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const s3 = document.querySelector('#shopify-section-template--26661922308414__custom_liquid_K4grnV');
    const s4 = document.querySelector('#shopify-section-template--26661922308414__custom_liquid_YiiVN4');
    const s5 = document.querySelector('#shopify-section-template--26661922308414__image_banner_hCj3Hc');
    const s6 = document.querySelector('#shopify-section-template--26661922308414__custom_liquid_mUmtdr');
    
    return {
      s3Html: s3 ? s3.innerHTML : null,
      s4Html: s4 ? s4.innerHTML : null,
      s5Html: s5 ? s5.innerHTML : null,
      s6Html: s6 ? s6.innerHTML : null
    };
  });

  fs.writeFileSync('scripts/pdp_sections_dump.json', JSON.stringify(data, null, 2));
  console.log('Saved dump to scripts/pdp_sections_dump.json');
  console.log('S3 Length:', data.s3Html ? data.s3Html.length : 0);
  console.log('S4 Length:', data.s4Html ? data.s4Html.length : 0);
  console.log('S5 Length:', data.s5Html ? data.s5Html.length : 0);
  console.log('S6 Length:', data.s6Html ? data.s6Html.length : 0);
  await browser.close();
})();
