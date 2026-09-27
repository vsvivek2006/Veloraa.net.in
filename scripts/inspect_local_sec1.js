const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('http://localhost:3000/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const localInfo = await page.evaluate(() => {
    const s = document.querySelector('#shopify-section-template--26661922308414__main');
    const mediaList = s ? s.querySelector('.lg\\:grid') : null;
    const mediaItems = mediaList ? Array.from(mediaList.children) : [];
    const infoWrapper = s ? s.querySelector('.product__info-wrapper') : null;
    return {
      secHeight: s ? s.getBoundingClientRect().height : null,
      hasDesktopGrid: !!mediaList,
      desktopItemsCount: mediaItems.length,
      desktopItemsHeights: mediaItems.map(m => Math.round(m.getBoundingClientRect().height)),
      infoHeight: infoWrapper ? Math.round(infoWrapper.getBoundingClientRect().height) : null
    };
  });

  console.log('Local Sec 1 inspection:', JSON.stringify(localInfo, null, 2));

  await browser.close();
})();
