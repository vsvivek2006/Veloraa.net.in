const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  try {
    const res = await page.goto('http://localhost:3000/products/5-in-1-bundle', { waitUntil: 'domcontentloaded', timeout: 5000 });
    console.log('Local server response status:', res ? res.status() : 'no response');
  } catch (e) {
    console.log('Local dev server not reachable:', e.message);
  }

  await browser.close();
})();
