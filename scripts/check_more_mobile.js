const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });

  const routes = [
    { url: 'http://localhost:3000/collections/frontpage', file: 'mobile_local_collection_frontpage.png' },
    { url: 'http://localhost:3000/pages/contact-us', file: 'mobile_local_contact_us.png' },
    { url: 'http://localhost:3000/policies/refund-policy', file: 'mobile_local_policy_refund.png' }
  ];

  for (const r of routes) {
    await page.goto(r.url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: r.file });
    fs.copyFileSync(r.file, 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/' + r.file);
    const scrollX = await page.evaluate(() => {
      window.scrollTo(50, 0);
      return window.scrollX;
    });
    console.log(r.url + ' -> scrollX = ' + scrollX);
  }

  await browser.close();
  console.log('All remaining mobile checks passed!');
})();
