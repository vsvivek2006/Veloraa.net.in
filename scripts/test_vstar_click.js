const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);

  const tab = await page.$('#vstar-tab');
  if (tab) {
    await tab.click();
    await page.waitForTimeout(1500);
    const result = await page.evaluate(() => {
      const activeModals = Array.from(document.querySelectorAll('div')).filter(d => {
        const s = window.getComputedStyle(d);
        return (s.position === 'fixed' || s.position === 'absolute') && s.zIndex > 1000 && d.id !== 'vstar-tab';
      });
      return {
        url: window.location.href,
        modals: activeModals.slice(0, 3).map(m => ({ id: m.id, className: m.className, rect: m.getBoundingClientRect() }))
      };
    });
    console.log('CLICK RESULT:', JSON.stringify(result, null, 2));
    await page.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/vstar_clicked.png' });
  }

  await browser.close();
})();
