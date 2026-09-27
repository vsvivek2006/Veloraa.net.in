const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const livePage = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await livePage.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await livePage.waitForTimeout(3000);

  const sec1Info = await livePage.evaluate(() => {
    const s = document.querySelector('#shopify-section-template--26661922308414__main');
    const media = s.querySelector('.product__media-wrapper');
    const mediaList = s.querySelector('.product__media-list');
    const mediaItems = Array.from(s.querySelectorAll('.product__media-item')).map(m => {
      const rect = m.getBoundingClientRect();
      const style = window.getComputedStyle(m);
      return {
        display: style.display,
        visibility: style.visibility,
        height: rect.height,
        width: rect.width
      };
    });

    const info = s.querySelector('.product__info-wrapper');
    const infoRect = info ? info.getBoundingClientRect() : null;
    const mediaRect = media ? media.getBoundingClientRect() : null;

    return {
      mediaRectHeight: mediaRect ? mediaRect.height : null,
      infoRectHeight: infoRect ? infoRect.height : null,
      mediaItemsCount: mediaItems.length,
      visibleMediaItems: mediaItems.filter(m => m.height > 0).length,
      mediaListDisplay: mediaList ? window.getComputedStyle(mediaList).display : null
    };
  });

  console.log('Live Sec 1 Layout:', JSON.stringify(sec1Info, null, 2));

  const sec2Info = await livePage.evaluate(() => {
    const s = document.querySelector('#shopify-section-template--26661922308414__custom_liquid_cgrL4w');
    const imgs = Array.from(s.querySelectorAll('img')).map(img => {
      const rect = img.getBoundingClientRect();
      return {
        src: img.src.slice(-30),
        width: rect.width,
        height: rect.height,
        gridCol: window.getComputedStyle(img).gridColumn
      };
    });
    return {
      rectHeight: s.getBoundingClientRect().height,
      imgs
    };
  });

  console.log('Live Sec 2 Details:', JSON.stringify(sec2Info, null, 2));

  const sec8Info = await livePage.evaluate(() => {
    const s = document.querySelector('#shopify-section-template--26661922308414__featured_collection_4Q3YAU');
    const slider = s.querySelector('slider-component, ul.grid');
    const items = Array.from(s.querySelectorAll('li.grid__item')).map(li => {
      const rect = li.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        left: rect.left
      };
    });
    return {
      rectHeight: s.getBoundingClientRect().height,
      items
    };
  });

  console.log('Live Sec 8 Details:', JSON.stringify(sec8Info, null, 2));

  await browser.close();
})();
