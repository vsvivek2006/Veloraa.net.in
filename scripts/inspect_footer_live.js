const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const footerInfo = await page.evaluate(() => {
    const f = document.querySelector('footer');
    if (!f) return null;
    const cs = window.getComputedStyle(f);
    const top = f.querySelector('.footer__content-top');
    const bottom = f.querySelector('.footer__content-bottom');
    const topCs = top ? window.getComputedStyle(top) : null;
    const botCs = bottom ? window.getComputedStyle(bottom) : null;
    return {
      height: f.getBoundingClientRect().height,
      padding: cs.padding,
      topPadding: topCs ? topCs.padding : null,
      topMargin: topCs ? topCs.margin : null,
      topHeight: top ? top.getBoundingClientRect().height : null,
      bottomPadding: botCs ? botCs.padding : null,
      bottomMargin: botCs ? botCs.margin : null,
      bottomHeight: bottom ? bottom.getBoundingClientRect().height : null,
      bg: cs.backgroundColor
    };
  });

  console.log(JSON.stringify(footerInfo, null, 2));
  await browser.close();
})();
