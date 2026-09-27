const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. Inspect live product card media HTML
  const cardHtml = await page.evaluate(() => {
    const card = document.querySelector('.card-wrapper');
    return card ? card.innerHTML : 'No card';
  });
  console.log('=== LIVE FIRST CARD INNER HTML ===');
  console.log(cardHtml.slice(0, 1500));

  // 2. Inspect all images in first card
  const imgData = await page.evaluate(() => {
    const card = document.querySelector('.card-wrapper');
    const imgs = card ? Array.from(card.querySelectorAll('img')) : [];
    return imgs.map((img, i) => ({
      index: i,
      src: img.src,
      className: img.className,
      style: img.getAttribute('style'),
      computedOpacity: window.getComputedStyle(img).opacity,
      computedVisibility: window.getComputedStyle(img).visibility,
      computedDisplay: window.getComputedStyle(img).display
    }));
  });
  console.log('=== LIVE FIRST CARD IMAGES BEFORE HOVER ===');
  console.log(JSON.stringify(imgData, null, 2));

  // 3. Hover over the card
  const cardEl = await page.$('.card-wrapper');
  if (cardEl) {
    await cardEl.hover();
    await page.waitForTimeout(500);

    const imgDataAfter = await page.evaluate(() => {
      const card = document.querySelector('.card-wrapper');
      const imgs = card ? Array.from(card.querySelectorAll('img')) : [];
      return imgs.map((img, i) => ({
        index: i,
        src: img.src,
        className: img.className,
        computedOpacity: window.getComputedStyle(img).opacity,
        computedVisibility: window.getComputedStyle(img).visibility,
        computedTransform: window.getComputedStyle(img).transform,
        computedTransition: window.getComputedStyle(img).transition
      }));
    });
    console.log('=== LIVE FIRST CARD IMAGES AFTER HOVER ===');
    console.log(JSON.stringify(imgDataAfter, null, 2));

    // Also check what classes changed or what styles changed
    const cardStylesAfter = await page.evaluate(() => {
      const card = document.querySelector('.card-wrapper .card');
      const inner = document.querySelector('.card-wrapper .card__inner');
      const media = document.querySelector('.card-wrapper .media');
      return {
        cardTransform: card ? window.getComputedStyle(card).transform : null,
        innerTransform: inner ? window.getComputedStyle(inner).transform : null,
        mediaTransform: media ? window.getComputedStyle(media).transform : null,
      };
    });
    console.log('=== CARD STYLES AFTER HOVER ===', cardStylesAfter);
  }

  // 4. Take screenshot of live card normal and hover
  if (cardEl) {
    await page.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/card_live_hover.png', clip: await cardEl.boundingBox() });
  }

  // 5. Now check local site at http://localhost:3000
  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await localPage.waitForTimeout(2000);

  const localCardEl = await localPage.$('.card-wrapper');
  if (localCardEl) {
    const localImgData = await localPage.evaluate(() => {
      const card = document.querySelector('.card-wrapper');
      const imgs = card ? Array.from(card.querySelectorAll('img')) : [];
      return imgs.map((img, i) => ({
        index: i,
        src: img.src,
        className: img.className,
        computedOpacity: window.getComputedStyle(img).opacity,
        computedVisibility: window.getComputedStyle(img).visibility
      }));
    });
    console.log('=== LOCAL FIRST CARD IMAGES BEFORE HOVER ===');
    console.log(JSON.stringify(localImgData, null, 2));

    await localCardEl.hover();
    await localPage.waitForTimeout(500);

    const localImgDataAfter = await localPage.evaluate(() => {
      const card = document.querySelector('.card-wrapper');
      const imgs = card ? Array.from(card.querySelectorAll('img')) : [];
      return imgs.map((img, i) => ({
        index: i,
        src: img.src,
        className: img.className,
        computedOpacity: window.getComputedStyle(img).opacity,
        computedVisibility: window.getComputedStyle(img).visibility,
        computedTransform: window.getComputedStyle(img).transform
      }));
    });
    console.log('=== LOCAL FIRST CARD IMAGES AFTER HOVER ===');
    console.log(JSON.stringify(localImgDataAfter, null, 2));

    await localPage.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/card_local_hover.png', clip: await localCardEl.boundingBox() });
  }

  await browser.close();
})();
