const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  // 1. Live Homepage Cards
  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await livePage.waitForTimeout(3000);

  const liveCards = await livePage.evaluate(() => {
    const items = Array.from(document.querySelectorAll('#Slider-template--26661922144574__featured_collection_DMqcQx li, .product-grid li'));
    return items.map((li, idx) => {
      const img = li.querySelector('img');
      const title = li.querySelector('.card__heading')?.innerText || '';
      const price = li.querySelector('.price')?.innerText.replace(/\s+/g, ' ') || '';
      const badge = li.querySelector('.badge')?.innerText || '';
      return {
        idx: idx + 1,
        title,
        price,
        badge,
        imgSrc: img ? img.src : '',
        imgClass: img ? img.className : '',
      };
    });
  });
  console.log('LIVE HOMEPAGE 8 CARDS:');
  console.log(JSON.stringify(liveCards, null, 2));

  // 2. Local Homepage Cards
  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await localPage.waitForTimeout(2000);

  const localCards = await localPage.evaluate(() => {
    const items = Array.from(document.querySelectorAll('#Slider-template--26661922144574__featured_collection_DMqcQx li, .product-grid li'));
    return items.map((li, idx) => {
      const img = li.querySelector('img');
      const title = li.querySelector('.card__heading')?.innerText || '';
      const price = li.querySelector('.price')?.innerText.replace(/\s+/g, ' ') || '';
      const badge = li.querySelector('.badge')?.innerText || '';
      return {
        idx: idx + 1,
        title,
        price,
        badge,
        imgSrc: img ? img.src : '',
        imgClass: img ? img.className : '',
      };
    });
  });
  console.log('LOCAL HOMEPAGE 8 CARDS:');
  console.log(JSON.stringify(localCards, null, 2));

  await browser.close();
})();
