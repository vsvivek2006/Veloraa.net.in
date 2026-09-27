const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  const html = fs.readFileSync('scripts/live_vstar_modal.html', 'utf8');
  await page.setContent(html);

  const reviews = await page.evaluate(() => {
    // Only select the primary desktop column reviews or unique review-id cards
    const cardMap = new Map();
    const cards = Array.from(document.querySelectorAll('.grid-review[review-id]'));
    
    cards.forEach(card => {
      const id = card.getAttribute('review-id');
      if (cardMap.has(id)) return;

      const author = card.querySelector('.author-name')?.innerText.trim() || '';
      const text = card.querySelector('.reviews-text')?.innerText.trim() || '';
      const img = card.querySelector('.resource-item img')?.getAttribute('src') ||
                  card.querySelector('.resource-item img')?.getAttribute('data-original') || '';
      const productTitle = card.querySelector('.product-name')?.innerText.trim() || '';
      
      let productImg = '';
      const prodImgEl = card.querySelector('.related-product-image');
      if (prodImgEl && prodImgEl.style.backgroundImage) {
        const m = prodImgEl.style.backgroundImage.match(/url\(["']?([^"']+)["']?\)/);
        if (m) productImg = m[1];
      }

      const rating = card.querySelectorAll('.vstar-star .star-item:not(.half-star)').length || 5;

      if (author && text) {
        cardMap.set(id, {
          id,
          author,
          verified: true,
          rating,
          comment: text,
          image: img,
          productTitle: productTitle || 'Ultimate Combo | VPods Pro 2 (2nd Gen) ANC + MagSafe...',
          productImage: productImg || 'https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_4_2026_at_01_35_25_AM.png?v=1783109171&width=360'
        });
      }
    });

    return Array.from(cardMap.values());
  });

  console.log('Extracted', reviews.length, 'unique reviews from live modal HTML:');
  console.log(JSON.stringify(reviews.slice(0, 5), null, 2));

  fs.writeFileSync('src/data/modalReviews.json', JSON.stringify(reviews, null, 2));
  console.log('Saved to src/data/modalReviews.json');

  await browser.close();
})();
