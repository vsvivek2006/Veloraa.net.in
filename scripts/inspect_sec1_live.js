const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const sec1 = await page.evaluate(() => {
    const s = document.querySelector('#shopify-section-template--26661922308414__main');
    if (!s) return null;

    const mediaGallery = s.querySelector('media-gallery');
    const productInfo = s.querySelector('.product__info-container, .product__info-wrapper');
    const title = s.querySelector('.product__title, h1')?.innerText?.trim();
    const prices = s.querySelector('.price')?.innerText?.trim();
    
    const buttons = Array.from(s.querySelectorAll('button, .sr-headless-checkout, .product-form__submit')).map(b => ({
      tag: b.tagName,
      className: b.className,
      text: b.innerText?.trim(),
      name: b.getAttribute('name')
    }));

    const trustCards = Array.from(s.querySelectorAll('.veloraa-trust-card, .veloraa-trust-section')).map(c => ({
      className: c.className,
      text: c.innerText?.trim()
    }));

    return {
      sectionHeight: s.getBoundingClientRect().height,
      mediaGalleryClass: mediaGallery ? mediaGallery.className : null,
      productInfoClass: productInfo ? productInfo.className : null,
      title,
      prices,
      buttons,
      trustCards
    };
  });

  console.log('Section 1 live details:');
  console.log(JSON.stringify(sec1, null, 2));

  const fullHtml = await page.evaluate(() => {
    return document.querySelector('#shopify-section-template--26661922308414__main')?.outerHTML;
  });
  fs.writeFileSync('sec1_live.html', fullHtml || '');

  await browser.close();
})();
