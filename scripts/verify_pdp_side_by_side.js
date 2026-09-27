const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const localPage = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  const livePage = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  console.log('Navigating to local and live PDP...');
  await localPage.goto('http://localhost:3000/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await livePage.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await localPage.waitForTimeout(3000);
  await livePage.waitForTimeout(3000);

  const sectionPairs = [
    { name: 'sec1_main', selector: '#shopify-section-template--26661922308414__main' },
    { name: 'sec2_highlights', selector: '#shopify-section-template--26661922308414__custom_liquid_cgrL4w' },
    { name: 'sec3_customer_reviews', selector: '#shopify-section-template--26661922308414__custom_liquid_K4grnV' },
    { name: 'sec4_influencer_reels', selector: '#shopify-section-template--26661922308414__custom_liquid_YiiVN4' },
    { name: 'sec5_banner', selector: '#shopify-section-template--26661922308414__image_banner_hCj3Hc' },
    { name: 'sec6_faq_jump', selector: '#shopify-section-template--26661922308414__custom_liquid_mUmtdr' },
    { name: 'sec7_trustoo', selector: '#shopify-section-template--26661922308414__17391977265eb60ca1' },
    { name: 'sec8_you_may_like', selector: '#shopify-section-template--26661922308414__featured_collection_4Q3YAU' },
    { name: 'sec9_faq_accordion', selector: '#shopify-section-template--26661922308414__custom_liquid_im8A6L' }
  ];

  const results = [];

  for (const pair of sectionPairs) {
    const localEl = await localPage.$(pair.selector);
    const liveEl = await livePage.$(pair.selector);

    let localBox = null;
    let liveBox = null;

    if (localEl) {
      localBox = await localEl.boundingBox();
      await localEl.screenshot({ path: `scripts/local_${pair.name}.png` });
    }
    if (liveEl) {
      liveBox = await liveEl.boundingBox();
      await liveEl.screenshot({ path: `scripts/live_${pair.name}.png` });
    }

    results.push({
      section: pair.name,
      selector: pair.selector,
      foundLocal: !!localEl,
      foundLive: !!liveEl,
      localHeight: localBox ? Math.round(localBox.height) : null,
      liveHeight: liveBox ? Math.round(liveBox.height) : null,
      localWidth: localBox ? Math.round(localBox.width) : null,
      liveWidth: liveBox ? Math.round(liveBox.width) : null
    });
  }

  console.log('--- Comparison Results ---');
  console.log(JSON.stringify(results, null, 2));

  fs.writeFileSync('scripts/pdp_comparison_results.json', JSON.stringify(results, null, 2));

  await browser.close();
})();
