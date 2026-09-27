const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('Launching browser to audit live veloraa vs local...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  // 1. Audit Live Site
  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  console.log('Navigating to live site...');
  await livePage.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await livePage.waitForTimeout(4000);

  // Check all sections in main
  const liveMainSections = await livePage.evaluate(() => {
    const main = document.querySelector('main#MainContent') || document.querySelector('main');
    if (!main) return [];
    return Array.from(main.children).map(child => ({
      tag: child.tagName,
      id: child.id,
      className: child.className,
      firstHeading: child.querySelector('h1, h2, h3, h4')?.innerText || '',
      textSnippet: child.innerText.slice(0, 150).replace(/\s+/g, ' ')
    }));
  });
  console.log('LIVE MAIN SECTIONS:', JSON.stringify(liveMainSections, null, 2));

  // Check card styles and lighting effects
  const liveCardInfo = await livePage.evaluate(() => {
    const card = document.querySelector('.card, .card-wrapper, .product-card-wrapper');
    const inner = document.querySelector('.card__inner');
    const media = document.querySelector('.card__media');
    const img = document.querySelector('.card__media img');
    
    if (!card) return null;

    const getStyles = (el) => {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      const before = window.getComputedStyle(el, '::before');
      const after = window.getComputedStyle(el, '::after');
      return {
        background: s.background,
        backgroundColor: s.backgroundColor,
        backgroundImage: s.backgroundImage,
        boxShadow: s.boxShadow,
        filter: s.filter,
        backdropFilter: s.backdropFilter,
        border: s.border,
        borderRadius: s.borderRadius,
        transform: s.transform,
        transition: s.transition,
        opacity: s.opacity,
        overflow: s.overflow,
        before: {
          content: before.content,
          background: before.background,
          boxShadow: before.boxShadow,
          opacity: before.opacity,
        },
        after: {
          content: after.content,
          background: after.background,
          boxShadow: after.boxShadow,
          opacity: after.opacity,
        }
      };
    };

    return {
      card: getStyles(card),
      inner: getStyles(inner),
      media: getStyles(media),
      img: getStyles(img),
    };
  });
  console.log('LIVE CARD REST STYLES:', JSON.stringify(liveCardInfo, null, 2));

  // Now hover over the first product card on live
  const firstCard = await livePage.$('.card-wrapper, .product-card-wrapper, .card');
  if (firstCard) {
    await firstCard.hover();
    await livePage.waitForTimeout(500);

    const liveCardHoverInfo = await livePage.evaluate(() => {
      const card = document.querySelector('.card, .card-wrapper, .product-card-wrapper');
      const inner = document.querySelector('.card__inner');
      const media = document.querySelector('.card__media');
      const img = document.querySelector('.card__media img');
      
      const getStyles = (el) => {
        if (!el) return null;
        const s = window.getComputedStyle(el);
        const before = window.getComputedStyle(el, '::before');
        const after = window.getComputedStyle(el, '::after');
        return {
          background: s.background,
          boxShadow: s.boxShadow,
          filter: s.filter,
          transform: s.transform,
          before: {
            content: before.content,
            background: before.background,
            boxShadow: before.boxShadow,
          },
          after: {
            content: after.content,
            background: after.background,
            boxShadow: after.boxShadow,
          }
        };
      };

      return {
        card: getStyles(card),
        inner: getStyles(inner),
        media: getStyles(media),
        img: getStyles(img),
      };
    });
    console.log('LIVE CARD HOVER STYLES:', JSON.stringify(liveCardHoverInfo, null, 2));
    await firstCard.screenshot({ path: 'scripts/live_card_hover_crop.png' });
  }

  // Check any review widgets / sections on homepage or PDP
  const liveReviews = await livePage.evaluate(() => {
    const list = [];
    document.querySelectorAll('*').forEach(el => {
      const cls = el.className && typeof el.className === 'string' ? el.className : '';
      const id = el.id || '';
      if (id.includes('review') || id.includes('vstar') || id.includes('trustoo') || id.includes('loox') || id.includes('judgeme') ||
          cls.includes('review') || cls.includes('vstar') || cls.includes('trustoo')) {
        list.push({
          tag: el.tagName,
          id: el.id,
          cls: cls.slice(0, 100),
          rect: el.getBoundingClientRect(),
          snippet: el.innerText ? el.innerText.slice(0, 100).replace(/\s+/g, ' ') : ''
        });
      }
    });
    return list;
  });
  console.log('LIVE REVIEWS ELEMENTS FOUND:', JSON.stringify(liveReviews.filter(r => r.rect.width > 0 && r.rect.height > 0), null, 2));

  // Take full page screenshot of live to inspect visual cards and sections
  await livePage.screenshot({ path: 'scripts/live_home_full.png', fullPage: true });

  await browser.close();
  console.log('Audit script completed successfully.');
})();
