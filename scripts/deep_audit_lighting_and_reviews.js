const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // 1. Get ALL sections on the homepage
  const sections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('main > *')).map((s, idx) => ({
      index: idx,
      id: s.id,
      className: s.className,
      textPreview: s.innerText ? s.innerText.slice(0, 150).replace(/\n/g, ' ') : ''
    }));
  });
  console.log('=== ALL HOMEPAGE MAIN SECTIONS ===');
  console.log(JSON.stringify(sections, null, 2));

  // 2. Check if there are ANY review elements/sections anywhere on the homepage
  const reviewElements = await page.evaluate(() => {
    const list = Array.from(document.querySelectorAll('[class*="review"], [id*="review"], [class*="trustoo"], [class*="judge"], [class*="testimonial"]'));
    return list.map(el => ({
      tag: el.tagName,
      id: el.id,
      className: el.className,
      rect: el.getBoundingClientRect(),
      textPreview: el.innerText ? el.innerText.slice(0, 100).replace(/\n/g, ' ') : ''
    })).filter(e => e.rect.height > 0);
  });
  console.log('=== REVIEW ELEMENTS ON HOMEPAGE ===');
  console.log(JSON.stringify(reviewElements, null, 2));

  // 3. Inspect CARD "lighting effects" on live
  const cardLighting = await page.evaluate(() => {
    const card = document.querySelector('.card-wrapper');
    if (!card) return 'No card';
    const inner = card.querySelector('.card__inner');
    const media = card.querySelector('.card__media');
    const img = card.querySelector('img');

    const getStyles = (el, pseudo = null) => {
      if (!el) return null;
      const c = window.getComputedStyle(el, pseudo);
      return {
        background: c.background,
        backgroundColor: c.backgroundColor,
        backgroundImage: c.backgroundImage,
        boxShadow: c.boxShadow,
        filter: c.filter,
        backdropFilter: c.backdropFilter,
        opacity: c.opacity,
        content: pseudo ? c.content : undefined
      };
    };

    return {
      card: getStyles(card),
      cardBefore: getStyles(card, '::before'),
      cardAfter: getStyles(card, '::after'),
      inner: getStyles(inner),
      innerBefore: getStyles(inner, '::before'),
      innerAfter: getStyles(inner, '::after'),
      media: getStyles(media),
      mediaBefore: getStyles(media, '::before'),
      mediaAfter: getStyles(media, '::after'),
      img: getStyles(img)
    };
  });
  console.log('=== CARD LIGHTING NORMAL ===');
  console.log(JSON.stringify(cardLighting, null, 2));

  // 4. Hover over card and inspect CARD "lighting effects" on hover
  const cardEl = await page.$('.card-wrapper');
  if (cardEl) {
    await cardEl.hover();
    await page.waitForTimeout(500);

    const cardLightingHover = await page.evaluate(() => {
      const card = document.querySelector('.card-wrapper');
      const inner = card.querySelector('.card__inner');
      const media = card.querySelector('.card__media');
      const img = card.querySelector('img');

      const getStyles = (el, pseudo = null) => {
        if (!el) return null;
        const c = window.getComputedStyle(el, pseudo);
        return {
          background: c.background,
          backgroundColor: c.backgroundColor,
          backgroundImage: c.backgroundImage,
          boxShadow: c.boxShadow,
          filter: c.filter,
          backdropFilter: c.backdropFilter,
          opacity: c.opacity,
          transform: c.transform
        };
      };

      return {
        card: getStyles(card),
        cardBefore: getStyles(card, '::before'),
        cardAfter: getStyles(card, '::after'),
        inner: getStyles(inner),
        innerBefore: getStyles(inner, '::before'),
        innerAfter: getStyles(inner, '::after'),
        media: getStyles(media),
        mediaBefore: getStyles(media, '::before'),
        mediaAfter: getStyles(media, '::after'),
        img: getStyles(img)
      };
    });
    console.log('=== CARD LIGHTING ON HOVER ===');
    console.log(JSON.stringify(cardLightingHover, null, 2));
  }

  // 5. Look at review modal on live when opened
  await page.click('#vstar-tab');
  await page.waitForTimeout(2000);

  const reviewModalDetails = await page.evaluate(() => {
    const modal = document.getElementById('vstar-window-review');
    if (!modal) return 'No modal';
    const header = modal.querySelector('#reviews-head, .review-head-type2, .tt-head-content');
    const cards = Array.from(modal.querySelectorAll('.grid-review, .review-item, [class*="review"]'));
    return {
      modalRect: modal.getBoundingClientRect(),
      modalBg: window.getComputedStyle(modal).backgroundColor,
      headerHtml: header ? header.outerHTML.slice(0, 800) : null,
      cardsCount: cards.length,
      sampleCard: cards[0] ? {
        outerHTML: cards[0].outerHTML.slice(0, 1000),
        className: cards[0].className
      } : null
    };
  });
  console.log('=== REVIEW MODAL DETAILS ===');
  console.log(JSON.stringify(reviewModalDetails, null, 2));

  await browser.close();
})();
