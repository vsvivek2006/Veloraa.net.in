const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await livePage.waitForTimeout(3000);

  // Check event listeners on the first card
  const cardDetails = await livePage.evaluate(() => {
    const card = document.querySelector('.card, .card-wrapper, .product-card-wrapper');
    const inner = document.querySelector('.card__inner');
    const badge = document.querySelector('.badge');
    const media = document.querySelector('.card__media');
    const img = document.querySelector('.card__media img');

    const getFullStyles = (el) => {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      const before = window.getComputedStyle(el, '::before');
      const after = window.getComputedStyle(el, '::after');
      return {
        tagName: el.tagName,
        className: el.className,
        background: s.background,
        backgroundColor: s.backgroundColor,
        backgroundImage: s.backgroundImage,
        boxShadow: s.boxShadow,
        filter: s.filter,
        border: s.border,
        outline: s.outline,
        borderRadius: s.borderRadius,
        transform: s.transform,
        transition: s.transition,
        mixBlendMode: s.mixBlendMode,
        before: {
          content: before.content,
          background: before.background,
          boxShadow: before.boxShadow,
          borderRadius: before.borderRadius,
          border: before.border,
          opacity: before.opacity,
          transform: before.transform,
          zIndex: before.zIndex
        },
        after: {
          content: after.content,
          background: after.background,
          boxShadow: after.boxShadow,
          borderRadius: after.borderRadius,
          border: after.border,
          opacity: after.opacity,
          transform: after.transform,
          zIndex: after.zIndex
        }
      };
    };

    return {
      card: getFullStyles(card),
      inner: getFullStyles(inner),
      badge: getFullStyles(badge),
      media: getFullStyles(media),
      img: getFullStyles(img)
    };
  });
  console.log('LIVE CARD EXACT CSS:');
  console.log(JSON.stringify(cardDetails, null, 2));

  // Check if there are any CSS rules with 'gradient', 'light', 'shine', 'glow', 'shadow'
  const matchingRules = await livePage.evaluate(() => {
    const res = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          const text = rule.cssText;
          if (
            (text.includes('.card') || text.includes('.product-card')) &&
            (text.includes('gradient') || text.includes('shadow') || text.includes('filter') || text.includes('hover') || text.includes('::'))
          ) {
            res.push(text);
          }
        }
      } catch (e) {}
    }
    return res.slice(0, 30);
  });
  console.log('LIVE CSS RULES FOR CARD HOVER/GRADIENT/SHADOW:');
  console.log(JSON.stringify(matchingRules, null, 2));

  // Take high-res screenshot of first 4 cards on live
  const featured = await livePage.$('#shopify-section-template--26661922144574__featured_collection_DMqcQx');
  if (featured) {
    await featured.screenshot({ path: 'scripts/live_featured_section.png' });
  }

  // Hover over the first card and screenshot
  const firstCard = await livePage.$('.card-wrapper');
  if (firstCard) {
    await firstCard.hover();
    await livePage.waitForTimeout(600);
    await firstCard.screenshot({ path: 'scripts/live_card_hover_exact.png' });
  }

  await browser.close();
})();
