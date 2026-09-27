const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Home page desktop
  console.log('Capturing home desktop...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'desktop_local_home_above_fold.png' });
  
  // 2. Collection page desktop
  console.log('Capturing collection desktop...');
  await page.goto('http://localhost:3000/collections/frontpage', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'desktop_local_collection.png' });

  // 3. PDP desktop
  console.log('Capturing PDP desktop...');
  await page.goto('http://localhost:3000/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'desktop_local_pdp.png' });

  // Live collection desktop
  console.log('Capturing live collection desktop...');
  const pageLive = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageLive.goto('https://www.veloraa.co.in/collections/frontpage', { waitUntil: 'domcontentloaded' });
  await pageLive.waitForTimeout(1500);
  await pageLive.screenshot({ path: 'desktop_live_collection.png' });

  // Live PDP desktop
  console.log('Capturing live PDP desktop...');
  await pageLive.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await pageLive.waitForTimeout(1500);
  await pageLive.screenshot({ path: 'desktop_live_pdp.png' });

  await browser.close();
  console.log('Desktop captures complete!');
})();
