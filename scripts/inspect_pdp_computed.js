const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const styles = await page.evaluate(() => {
    const s = document.querySelector('#shopify-section-template--26661922308414__main');
    const mediaWrapper = s.querySelector('.product__media-wrapper');
    const mediaList = s.querySelector('.product__media-list');
    const mediaItem = s.querySelector('.product__media-item');
    const infoWrapper = s.querySelector('.product__info-wrapper');
    const infoContainer = s.querySelector('.product__info-container');

    const getKeys = (el) => {
      if (!el) return null;
      const c = window.getComputedStyle(el);
      return {
        display: c.display,
        flexDirection: c.flexDirection,
        position: c.position,
        top: c.top,
        width: c.width,
        maxWidth: c.maxWidth,
        padding: c.padding,
        margin: c.margin,
        gap: c.gap
      };
    };

    return {
      mediaWrapper: getKeys(mediaWrapper),
      mediaList: getKeys(mediaList),
      mediaItem: getKeys(mediaItem),
      infoWrapper: getKeys(infoWrapper),
      infoContainer: getKeys(infoContainer)
    };
  });

  console.log('Computed styles on live:');
  console.log(JSON.stringify(styles, null, 2));

  await browser.close();
})();
