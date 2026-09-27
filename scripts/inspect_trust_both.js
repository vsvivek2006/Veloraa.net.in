const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  
  // 1. Live site
  const pLive = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pLive.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await pLive.waitForTimeout(2000);
  const liveTrust = await pLive.locator('.veloraa-trust-section').first();
  if (await liveTrust.count() > 0) {
    await liveTrust.screenshot({ path: 'live_trust_screenshot.png' });
    const box = await liveTrust.boundingBox();
    console.log('Live trust bounding box:', box);
    const html = await liveTrust.evaluate(el => el.outerHTML);
    fs.writeFileSync('scripts/live_trust.html', html);
    const styles = await liveTrust.evaluate(el => {
      const computed = window.getComputedStyle(el);
      const card = el.querySelector('.veloraa-trust-card');
      const cardComputed = card ? window.getComputedStyle(card) : null;
      return {
        section: {
          display: computed.display,
          gridTemplateColumns: computed.gridTemplateColumns,
          flexDirection: computed.flexDirection,
          width: computed.width
        },
        card: cardComputed ? {
          display: cardComputed.display,
          flexDirection: cardComputed.flexDirection,
          width: cardComputed.width
        } : null
      };
    });
    console.log('Live trust styles:', JSON.stringify(styles, null, 2));
  } else {
    console.log('Live trust not found!');
  }

  // 2. Local site
  const pLocal = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pLocal.goto('http://localhost:3000/products/5-in-1-bundle', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await pLocal.waitForTimeout(2000);
  const localTrust = await pLocal.locator('.veloraa-trust-section').first();
  if (await localTrust.count() > 0) {
    await localTrust.screenshot({ path: 'local_trust_screenshot.png' });
    const box = await localTrust.boundingBox();
    console.log('Local trust bounding box:', box);
    const styles = await localTrust.evaluate(el => {
      const computed = window.getComputedStyle(el);
      const card = el.querySelector('.veloraa-trust-card');
      const cardComputed = card ? window.getComputedStyle(card) : null;
      return {
        section: {
          display: computed.display,
          gridTemplateColumns: computed.gridTemplateColumns,
          flexDirection: computed.flexDirection,
          width: computed.width
        },
        card: cardComputed ? {
          display: cardComputed.display,
          flexDirection: cardComputed.flexDirection,
          width: cardComputed.width
        } : null
      };
    });
    console.log('Local trust styles:', JSON.stringify(styles, null, 2));
  } else {
    console.log('Local trust not found on local!');
  }

  // Also check if Shiprocket pincode checker exists anywhere on local
  const pincodeChecker = await pLocal.locator('text=CHECK DELIVERY TIME').count();
  console.log('Pincode checker count on local:', pincodeChecker);

  await browser.close();
})();
