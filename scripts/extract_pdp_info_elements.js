const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'networkidle', timeout: 35000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const info = document.querySelector('.product__info-container') || document.querySelector('.product__info-wrapper');
    if (!info) return null;
    
    // Find urgency
    const urgency = Array.from(info.querySelectorAll('*')).find(el => el.textContent && el.textContent.includes('Selling Fast'));
    // Find buy buttons
    const buyBtns = Array.from(info.querySelectorAll('*')).find(el => el.textContent && el.textContent.includes('Extra ₹200 Off'));
    // Find trust
    const trust = info.querySelector('.veloraa-trust-section');
    // Find GTA widget
    const gta = info.querySelector('[class*="GSC-SMALL"]') || info.querySelector('.gta-widget');

    return {
      urgencyHtml: urgency ? urgency.closest('div').outerHTML : null,
      buyBtnsHtml: buyBtns ? buyBtns.closest('div').outerHTML : null,
      trustHtml: trust ? trust.outerHTML : null,
      gtaHtml: gta ? gta.outerHTML : null
    };
  });

  fs.writeFileSync('scripts/pdp_info_elements.json', JSON.stringify(data, null, 2));
  console.log('Saved PDP info elements to scripts/pdp_info_elements.json');
  await browser.close();
})();
