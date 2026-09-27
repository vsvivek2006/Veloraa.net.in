const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const sec1 = await page.$('#shopify-section-template--26661922308414__main');
  if (sec1) {
    await sec1.screenshot({ path: 'scripts/live_sec1.png' });
  }

  // Also let's inspect the layout of left vs right column on desktop
  const details = await page.evaluate(() => {
    const s = document.querySelector('#shopify-section-template--26661922308414__main');
    const media = s.querySelector('.product__media-wrapper');
    const info = s.querySelector('.product__info-wrapper');
    
    // Order of children in .product__info-container
    const container = s.querySelector('.product__info-container');
    const children = Array.from(container.children).map(c => ({
      tagName: c.tagName,
      className: c.className,
      id: c.id,
      text: c.innerText?.trim().slice(0, 80).replace(/\n+/g, ' ')
    }));

    return {
      sectionClass: s.className,
      mediaClass: media?.className,
      mediaWidth: media?.getBoundingClientRect().width,
      infoClass: info?.className,
      infoWidth: info?.getBoundingClientRect().width,
      children
    };
  });

  console.log('Section 1 details:', JSON.stringify(details, null, 2));

  await browser.close();
})();
