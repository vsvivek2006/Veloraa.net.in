const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await livePage.waitForTimeout(3000);

  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await localPage.waitForTimeout(2000);

  // Take top viewport screenshots
  await livePage.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/audit_live_top.png' });
  await localPage.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/audit_local_top.png' });

  // Scroll down to products
  await livePage.evaluate(() => window.scrollTo(0, 950));
  await localPage.evaluate(() => window.scrollTo(0, 950));
  await livePage.waitForTimeout(1000);
  await localPage.waitForTimeout(1000);

  await livePage.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/audit_live_products.png' });
  await localPage.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/audit_local_products.png' });

  console.log('AUDIT SCREENSHOTS CAPTURED SUCCESSFULLY!');
  await browser.close();
})();
