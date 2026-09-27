const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  // 1. Check Homepage
  const pageHome = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageHome.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await pageHome.waitForTimeout(3000);

  const homeReviews = await pageHome.evaluate(() => {
    return Array.from(document.querySelectorAll('*')).filter(el => {
      const text = el.innerText ? el.innerText.toLowerCase() : '';
      return (text.includes('customer reviews') || text.includes('happy customers') || text.includes('rating')) && el.children.length > 2;
    }).map(e => ({
      tag: e.tagName,
      id: e.id,
      className: e.className,
      rect: e.getBoundingClientRect(),
      textSnippet: e.innerText ? e.innerText.slice(0, 150).replace(/\n/g, ' ') : ''
    }));
  });
  console.log('=== HOME REVIEWS SECTIONS ===');
  console.log(JSON.stringify(homeReviews.slice(0, 5), null, 2));

  // 2. Check /products/5-in-1-bundle
  const pagePDP = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pagePDP.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await pagePDP.waitForTimeout(3000);

  const pdpReviews = await pagePDP.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section, [class*="review"], [id*="review"]'));
    return sections.map(s => ({
      tag: s.tagName,
      id: s.id,
      className: s.className,
      rect: s.getBoundingClientRect(),
      textSnippet: s.innerText ? s.innerText.slice(0, 100).replace(/\n/g, ' ') : ''
    })).filter(s => s.textSnippet.toLowerCase().includes('review') || s.textSnippet.toLowerCase().includes('customer'));
  });
  console.log('=== PDP REVIEWS SECTIONS ===');
  console.log(JSON.stringify(pdpReviews.slice(0, 5), null, 2));

  // 3. Inspect what happens when user clicks #vstar-tab on Homepage
  await pageHome.click('#vstar-tab');
  await pageHome.waitForTimeout(2000);
  const homeModalHtml = await pageHome.evaluate(() => {
    const modal = document.getElementById('vstar-window-review');
    return modal ? modal.innerHTML.slice(0, 1000) : 'none';
  });
  console.log('=== HOME VSTAR MODAL HTML ===');
  console.log(homeModalHtml);

  // Take screenshot of home vstar modal
  await pageHome.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/live_vstar_modal_full.png' });

  await browser.close();
})();
