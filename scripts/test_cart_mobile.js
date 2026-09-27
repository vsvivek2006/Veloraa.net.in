const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3000/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  
  // Click Add to Cart
  const addBtn = page.locator('button:has-text("ADD TO CART")').first();
  await addBtn.click();
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'mobile_local_cart_drawer_with_item.png' });
  fs.copyFileSync('mobile_local_cart_drawer_with_item.png', 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/mobile_local_cart_drawer_with_item.png');
  await browser.close();
  console.log('Cart drawer with item captured successfully!');
})();
