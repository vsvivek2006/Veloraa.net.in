const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Check PDP Influencer Heading
  await page.goto('http://localhost:3000/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  const headingColor = await page.locator('.veloraa-heading h2').evaluate(el => window.getComputedStyle(el).color);
  console.log('1. PDP Influencer Heading color:', headingColor);

  // 2. Check CartDrawer / PDP for COD mentions
  const cartCodText = await page.locator('text=Cash on Delivery').count();
  console.log('2. PDP COD mentions count:', cartCodText);

  // 3. Check Checkout page
  await page.goto('http://localhost:3000/checkout', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  const checkoutCodCount = await page.locator('text=Cash on Delivery').count();
  const codRadioCount = await page.locator('input[value="COD"]').count();
  console.log('3. Checkout page COD text count:', checkoutCodCount, 'COD radio count:', codRadioCount);

  await browser.close();
})();
