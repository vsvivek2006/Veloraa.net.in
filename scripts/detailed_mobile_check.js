const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });

  const page = await mobileContext.newPage();

  // 1. Home page
  console.log('Testing Home page...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'mobile_local_home_full.png', fullPage: true });
  await page.screenshot({ path: 'mobile_local_home_above_fold.png', fullPage: false });

  // 2. Open Mobile Drawer
  console.log('Testing Mobile Drawer...');
  const drawerBtn = page.locator('#header-drawer button');
  if (await drawerBtn.count() > 0) {
    await drawerBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'mobile_local_drawer_open_new.png', fullPage: false });
    // Close it by clicking drawerBtn again
    await drawerBtn.click();
    await page.waitForTimeout(400);
  }

  // 3. PDP page
  console.log('Testing PDP page...');
  // Find a product handle
  await page.goto('http://localhost:3000/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile_local_pdp_above_fold.png', fullPage: false });

  // Scroll to buy button / price
  const buyBtn = page.locator('button:has-text("Add to Cart"), button:has-text("Buy"), button:has-text("Sold Out")').first();
  if (await buyBtn.count() > 0) {
    await buyBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'mobile_local_pdp_buy_section.png', fullPage: false });
  }

  // Scroll to Influencer Video section
  const influencerSec = page.locator('.veloraa-video-section').first();
  if (await influencerSec.count() > 0) {
    await influencerSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'mobile_local_pdp_influencer.png', fullPage: false });
  }

  // Scroll to Trust section
  const trustSec = page.locator('.veloraa-trust-section').first();
  if (await trustSec.count() > 0) {
    await trustSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'mobile_local_pdp_trust.png', fullPage: false });
  }

  // 4. Cart Drawer on Mobile
  console.log('Testing Cart Drawer on Mobile...');
  const cartIcon = page.locator('header a[href="/cart"], header button:has-text("Cart"), header svg.icon-cart, header button[aria-label*="cart" i], header .cart-icon-bubble').first();
  if (await cartIcon.count() > 0) {
    await cartIcon.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'mobile_local_cart_drawer.png', fullPage: false });
  }

  // 5. Checkout page on Mobile
  console.log('Testing Checkout Page on Mobile...');
  await page.goto('http://localhost:3000/checkout', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile_local_checkout.png', fullPage: true });

  // 6. Check for horizontal overflow across all pages
  const checkOverflow = async (url) => {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const overflowWidth = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const innerWidth = await page.evaluate(() => window.innerWidth);
    console.log(`Page ${url}: scrollWidth=${scrollWidth}, innerWidth=${innerWidth}, hasOverflow=${overflowWidth}`);
  };

  await checkOverflow('http://localhost:3000/');
  await checkOverflow('http://localhost:3000/products/5-in-1-bundle');
  await checkOverflow('http://localhost:3000/collections/all');
  await checkOverflow('http://localhost:3000/pages/contact-us');
  await checkOverflow('http://localhost:3000/policies/refund-policy');
  await checkOverflow('http://localhost:3000/checkout');

  const artifactsDir = 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d';
  const shots = [
    'mobile_local_home_full.png',
    'mobile_local_home_above_fold.png',
    'mobile_local_drawer_open_new.png',
    'mobile_local_pdp_above_fold.png',
    'mobile_local_pdp_buy_section.png',
    'mobile_local_pdp_influencer.png',
    'mobile_local_pdp_trust.png',
    'mobile_local_cart_drawer.png',
    'mobile_local_checkout.png'
  ];
  for (const s of shots) {
    if (fs.existsSync(s)) {
      fs.copyFileSync(s, `${artifactsDir}/${s}`);
      console.log(`Copied ${s} to artifacts.`);
    }
  }

  await browser.close();
  console.log('Detailed mobile check complete!');
})();
