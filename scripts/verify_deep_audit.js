const { chromium } = require('playwright');

(async () => {
  console.log('Starting Playwright Deep Verification...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  // 1. Audit Local Homepage & Floating Review Modal
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  console.log('Navigating to local homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Check card hover on homepage
  const firstCard = await page.$('.card-wrapper');
  if (firstCard) {
    await firstCard.hover();
    await page.waitForTimeout(500);
    await firstCard.screenshot({ path: 'scripts/verified_local_card_hover.png' });
    console.log('Saved verified_local_card_hover.png');
  }

  // Open Floating Review Modal
  console.log('Opening #vstar-tab modal...');
  await page.click('#vstar-tab');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'scripts/verified_local_vstar_modal.png' });
  console.log('Saved verified_local_vstar_modal.png');

  // Close modal
  const closeBtn = await page.$('#vstar-window-review button[aria-label="Close reviews"]');
  if (closeBtn) await closeBtn.click();
  await page.waitForTimeout(500);

  // 2. Audit Local Product Page Review Sections
  console.log('Navigating to local PDP...');
  await page.goto('http://localhost:3000/products/ultimate-combo-10000mah', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Screenshot Customer Reviews Section
  const customerSection = await page.$('.veloraa-reviews-section');
  if (customerSection) {
    await customerSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await customerSection.screenshot({ path: 'scripts/verified_local_customer_reviews.png' });
    console.log('Saved verified_local_customer_reviews.png');
  } else {
    console.error('CustomerReviewsSection not found on PDP!');
  }

  // Screenshot Influencer Reviews Section
  const influencerSection = await page.$('.veloraa-video-section');
  if (influencerSection) {
    await influencerSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await influencerSection.screenshot({ path: 'scripts/verified_local_influencer_section.png' });
    console.log('Saved verified_local_influencer_section.png');

    // Test clicking a video card to open popup
    const firstVidCard = await page.$('.veloraa-card');
    if (firstVidCard) {
      await firstVidCard.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'scripts/verified_local_video_popup.png' });
      console.log('Saved verified_local_video_popup.png');

      const vidClose = await page.$('.veloraa-popup-close');
      if (vidClose) await vidClose.click();
      await page.waitForTimeout(500);
    }
  } else {
    console.error('InfluencerReviewsSection not found on PDP!');
  }

  // Screenshot Trustoo Reviews Widget
  const trustooWidget = await page.$('#shopify-section-template--26661922308414__17391977265eb60ca1');
  if (trustooWidget) {
    await trustooWidget.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await trustooWidget.screenshot({ path: 'scripts/verified_local_trustoo_widget.png' });
    console.log('Saved verified_local_trustoo_widget.png');
  } else {
    console.error('TrustooReviewsWidget not found on PDP!');
  }

  console.log('Total console errors on local:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  await browser.close();
  console.log('Verification finished successfully.');
})();
