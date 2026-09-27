const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const pLive = await browser.newPage();
  const pLocal = await browser.newPage();
  await pLive.setViewportSize({ width: 1440, height: 900 });
  await pLocal.setViewportSize({ width: 1440, height: 900 });

  await Promise.all([
    pLive.goto('https://www.veloraa.co.in/', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {}),
    pLocal.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' }).catch(() => {})
  ]);
  await pLive.waitForTimeout(2000);
  await pLocal.waitForTimeout(2000);

  const measure = async (p, name) => {
    return await p.evaluate((n) => {
      const ann = document.querySelector('.announcement-bar') || document.querySelector('[id*="announcement-bar"]');
      const footer = document.querySelector('footer') || document.querySelector('[id*="footer"]');
      return {
        name: n,
        announcementHeight: ann ? Math.round(ann.getBoundingClientRect().height) : null,
        footerHeight: footer ? Math.round(footer.getBoundingClientRect().height) : null
      };
    }, name);
  };

  const lData = await measure(pLive, 'LIVE');
  const localData = await measure(pLocal, 'LOCAL');
  console.log(JSON.stringify({ lData, localData }, null, 2));

  await browser.close();
})();
