const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  await page.click('#vstar-tab');
  await page.waitForTimeout(3000);

  const modalData = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('#vstar-window-review .vstar-review-item, #vstar-window-review .item, #vstar-window-review [class*="review-item"], #vstar-reviews .item'));
    return items.map(el => {
      const img = el.querySelector('img');
      const author = el.querySelector('.author, .name, [class*="author"], [class*="name"]')?.innerText || '';
      const content = el.querySelector('.content, .comment, [class*="content"], [class*="desc"]')?.innerText || '';
      const productTitle = el.querySelector('.product-title, .title, [class*="product"]')?.innerText || '';
      const productImg = el.querySelector('.product-img img, [class*="product"] img')?.src || '';
      return {
        author: author.trim(),
        content: content.trim(),
        productTitle: productTitle.trim(),
        imgSrc: img ? img.src : '',
        productImg
      };
    });
  });

  console.log('Extracted', modalData.length, 'modal reviews');
  fs.writeFileSync('scripts/live_modal_reviews.json', JSON.stringify(modalData, null, 2));

  // Also get the full innerHTML of the modal to see the exact classes and SVG icons
  const modalHTML = await page.evaluate(() => {
    const m = document.querySelector('#vstar-window-review');
    return m ? m.innerHTML : '';
  });
  fs.writeFileSync('scripts/live_vstar_modal.html', modalHTML);

  await browser.close();
})();
