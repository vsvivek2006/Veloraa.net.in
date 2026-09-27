const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  const reviewSectionStyles = await page.evaluate(() => {
    const section = document.querySelector('.shopify-section:has([class*="veloraa-review"])') ||
                    document.querySelector('#shopify-section-template--26661922308414__custom_liquid_K4grnV');
    
    const card = document.querySelector('.veloraa-review-card');
    const influencerCard = document.querySelector('.custom_liquid_YiiVN4 video, .custom_liquid_YiiVN4 img, .custom_liquid_YiiVN4 div');

    const getCSS = (el) => {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      const b = window.getComputedStyle(el, '::before');
      const a = window.getComputedStyle(el, '::after');
      return {
        className: el.className,
        background: s.background,
        backgroundColor: s.backgroundColor,
        boxShadow: s.boxShadow,
        border: s.border,
        borderRadius: s.borderRadius,
        filter: s.filter,
        backdropFilter: s.backdropFilter,
        transform: s.transform,
        transition: s.transition,
        before: {
          content: b.content,
          background: b.background,
          boxShadow: b.boxShadow,
          borderRadius: b.borderRadius,
          border: b.border
        },
        after: {
          content: a.content,
          background: a.background,
          boxShadow: a.boxShadow,
          borderRadius: a.borderRadius,
          border: a.border
        }
      };
    };

    return {
      sectionHTML: section ? section.innerHTML.slice(0, 2000) : null,
      cardCSS: getCSS(card),
    };
  });

  console.log('REVIEW SECTION HTML & CARD CSS:');
  console.log(JSON.stringify(reviewSectionStyles, null, 2));

  // Also check the Trustoo reviews section on PDP:
  const trustooSection = await page.evaluate(() => {
    const t = document.querySelector('#shopify-section-template--26661922308414__17391977265eb60ca1');
    return t ? {
      innerHTML: t.innerHTML.slice(0, 1500),
      className: t.className
    } : null;
  });
  console.log('TRUSTOO SECTION ON PDP:', JSON.stringify(trustooSection, null, 2));

  // Also check what floating review modal #vstar-window-review looks like on live
  await page.click('#vstar-tab');
  await page.waitForTimeout(2000);
  const modalHTML = await page.evaluate(() => {
    const m = document.querySelector('#vstar-window-review') || document.querySelector('.vstar-window-review');
    return m ? {
      innerHTML: m.innerHTML.slice(0, 2500),
      className: m.className
    } : null;
  });
  console.log('VSTAR MODAL HTML:', JSON.stringify(modalHTML, null, 2));
  await page.screenshot({ path: 'scripts/live_vstar_modal_opened.png' });

  await browser.close();
})();
