const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await localPage.waitForTimeout(2000);

  const tab = await localPage.evaluate(() => {
    const el = document.getElementById('vstar-tab');
    if (!el) return null;
    const computed = window.getComputedStyle(el);
    return {
      outerHTML: el.outerHTML,
      rect: el.getBoundingClientRect(),
      styles: {
        position: computed.position,
        top: computed.top,
        right: computed.right,
        transform: computed.transform,
        transformOrigin: computed.transformOrigin,
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        fontSize: computed.fontSize,
        lineHeight: computed.lineHeight,
        padding: computed.padding,
        borderRadius: computed.borderRadius
      }
    };
  });
  console.log('LOCAL VSTAR AFTER FIX:', JSON.stringify(tab, null, 2));

  // Take screenshot of local tab
  const tabEl = await localPage.$('#vstar-tab');
  if (tabEl) {
    await tabEl.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/vstar_local_fixed.png' });
  }

  // Click on local vstar tab to test modal opening
  await localPage.click('#vstar-tab');
  await localPage.waitForTimeout(1000);
  await localPage.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/vstar_local_modal.png' });

  await browser.close();
})();
