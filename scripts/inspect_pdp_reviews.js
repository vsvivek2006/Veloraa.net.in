const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Opening PDP...');
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  // Take screenshot of entire PDP
  await page.screenshot({ path: 'scripts/live_pdp_full.png', fullPage: true });
  console.log('Saved live_pdp_full.png');

  // Also inspect all cards on PDP (e.g. "You may also like" cards or review cards)
  const pdpCards = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.card, .card-wrapper, .vstar-review-item, [class*="review-card"], [class*="product-card"]'));
    return cards.map(c => ({
      className: c.className,
      id: c.id,
      rect: c.getBoundingClientRect(),
      textSnippet: c.innerText ? c.innerText.slice(0, 80).replace(/\s+/g, ' ') : ''
    }));
  });
  console.log('PDP Cards found:', pdpCards.length);
  console.log('PDP Cards summary:', JSON.stringify(pdpCards.slice(0, 10), null, 2));

  // Check what "Hear It From Our Customers" section looks like
  const customerSection = await page.$('.shopify-section:has-text("Hear It From Our Customers")');
  if (customerSection) {
    await customerSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await customerSection.screenshot({ path: 'scripts/live_pdp_customer_reviews.png' });
    console.log('Saved live_pdp_customer_reviews.png');
  }

  // Check what "Your Favorite Influencers Trust Veloraa" section looks like
  const influencerSection = await page.$('.shopify-section:has-text("Your Favorite Influencers Trust Veloraa")');
  if (influencerSection) {
    await influencerSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await influencerSection.screenshot({ path: 'scripts/live_pdp_influencer_section.png' });
    console.log('Saved live_pdp_influencer_section.png');
  }

  // Check what Trustoo review widget looks like
  const trustooSection = await page.$('.shopify-section:has-text("reviews")');
  if (trustooSection) {
    await trustooSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await trustooSection.screenshot({ path: 'scripts/live_pdp_trustoo_widget.png' });
    console.log('Saved live_pdp_trustoo_widget.png');
  }

  await browser.close();
})();
