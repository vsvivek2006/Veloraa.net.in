const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'networkidle', timeout: 35000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const effects = await page.evaluate(() => {
    const list = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          const text = rule.cssText;
          if (
            text.includes('radial-gradient') || 
            text.includes('conic-gradient') || 
            text.includes('box-shadow') || 
            text.includes('animation') || 
            text.includes('keyframes') ||
            text.includes('shine') ||
            text.includes('glow') ||
            text.includes('border-image')
          ) {
            if (text.includes('card') || text.includes('review') || text.includes('vstar') || text.includes('trustoo')) {
              list.push(text);
            }
          }
        }
      } catch (e) {}
    }
    return list.slice(0, 30);
  });

  console.log(JSON.stringify(effects, null, 2));
  await browser.close();
})();
