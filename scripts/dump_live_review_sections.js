const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  // Extract all stylesheets and custom liquid contents
  const reviewSectionCode = await page.evaluate(() => {
    const sec1 = document.querySelector('#shopify-section-template--26661922308414__custom_liquid_K4grnV');
    const sec2 = document.querySelector('#shopify-section-template--26661922308414__custom_liquid_YiiVN4');
    const sec3 = document.querySelector('#shopify-section-template--26661922308414__17391977265eb60ca1');

    return {
      customerReviewsHTML: sec1 ? sec1.outerHTML : '',
      influencerReviewsHTML: sec2 ? sec2.outerHTML : '',
      trustooWidgetHTML: sec3 ? sec3.outerHTML : ''
    };
  });

  fs.writeFileSync('scripts/live_customer_reviews.html', reviewSectionCode.customerReviewsHTML);
  fs.writeFileSync('scripts/live_influencer_reviews.html', reviewSectionCode.influencerReviewsHTML);
  fs.writeFileSync('scripts/live_trustoo_widget.html', reviewSectionCode.trustooWidgetHTML);

  console.log('Saved raw HTML of all 3 review sections.');
  await browser.close();
})();
