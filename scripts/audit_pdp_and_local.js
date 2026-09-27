const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  // 1. Inspect Local Card
  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  
  const localCardRest = await localPage.evaluate(() => {
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
        border: s.border,
        borderRadius: s.borderRadius,
        transform: s.transform,
        before: { content: before.content, background: before.background, boxShadow: before.boxShadow },
        after: { content: after.content, background: after.background, boxShadow: after.boxShadow }
      };
    };
    return { card: getStyles(card), inner: getStyles(inner), media: getStyles(media), img: getStyles(img) };
  });
  console.log('LOCAL CARD REST STYLES:', JSON.stringify(localCardRest, null, 2));

  // Hover on local card
  const localFirstCard = await localPage.$('.card-wrapper');
  if (localFirstCard) {
    await localFirstCard.hover();
    await localPage.waitForTimeout(500);
    await localFirstCard.screenshot({ path: 'scripts/local_card_hover_crop.png' });
  }

  // 2. Inspect Live Product Page Review Sections
  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto('https://www.veloraa.co.in/products/ultimate-combo-vpods-pro-2-magsafe-10000mah-powerbank-4-in-1-fast-charging-cable-silicone-case-sticky-pad', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await livePage.waitForTimeout(4000);

  const pdpSections = await livePage.evaluate(() => {
    const main = document.querySelector('main');
    if (!main) return [];
    return Array.from(main.querySelectorAll('section, [class*="review"], [id*="review"], [class*="trustoo"], [id*="trustoo"]')).map(el => ({
      tag: el.tagName,
      id: el.id,
      className: el.className ? el.className.toString().slice(0, 100) : '',
      heading: el.querySelector('h1, h2, h3, h4')?.innerText || '',
      textSnippet: el.innerText ? el.innerText.slice(0, 120).replace(/\s+/g, ' ') : ''
    }));
  });
  console.log('LIVE PDP REVIEW/SECTIONS count:', pdpSections.length);
  const relevantPdp = pdpSections.filter(s => s.textSnippet.toLowerCase().includes('review') || s.textSnippet.toLowerCase().includes('customer') || s.textSnippet.toLowerCase().includes('influencer') || s.id.includes('review') || s.className.includes('review'));
  console.log('LIVE PDP RELEVANT REVIEWS:', JSON.stringify(relevantPdp, null, 2));

  // Take screenshot of review section on PDP
  const reviewEl = await livePage.$('#trustoo-widget, [class*="review"], [id*="review"]');
  if (reviewEl) {
    await reviewEl.scrollIntoViewIfNeeded();
    await livePage.waitForTimeout(1000);
    await livePage.screenshot({ path: 'scripts/live_pdp_review_section.png' });
  }

  await browser.close();
})();
