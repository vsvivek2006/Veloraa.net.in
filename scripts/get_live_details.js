const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href*="/products/"]')).map(a => a.href);
  });
  const uniqueLinks = [...new Set(links)];
  console.log('Product links on homepage:', uniqueLinks);

  if (uniqueLinks.length > 0) {
    console.log('Navigating to first product:', uniqueLinks[0]);
    await page.goto(uniqueLinks[0], { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);

    const pdpSections = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('main section, main [id*="shopify-section"]')).map(s => ({
        id: s.id,
        className: s.className,
        heading: s.querySelector('h1, h2, h3, h4')?.innerText || '',
        snippet: s.innerText ? s.innerText.slice(0, 150).replace(/\s+/g, ' ') : ''
      }));
    });
    console.log('PDP SECTIONS:', JSON.stringify(pdpSections, null, 2));

    // Also look for any review apps or widgets anywhere on PDP
    const reviewElements = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll('*'));
      return all
        .filter(el => {
          const txt = (el.innerText || '').toLowerCase();
          const id = (el.id || '').toLowerCase();
          const cls = (el.className || '').toString().toLowerCase();
          return (
            id.includes('review') ||
            id.includes('vstar') ||
            id.includes('trustoo') ||
            id.includes('rating') ||
            cls.includes('review') ||
            cls.includes('vstar') ||
            cls.includes('trustoo') ||
            txt.includes('customer review') ||
            txt.includes('loved by 80,000') ||
            txt.includes('hear it from our customers')
          );
        })
        .slice(0, 20)
        .map(el => ({
          tag: el.tagName,
          id: el.id,
          cls: (el.className || '').toString().slice(0, 80),
          snippet: el.innerText ? el.innerText.slice(0, 100).replace(/\s+/g, ' ') : ''
        }));
    });
    console.log('PDP REVIEWS ELEMENTS:', JSON.stringify(reviewElements, null, 2));

    await page.screenshot({ path: 'scripts/live_pdp_full.png', fullPage: true });
  }

  await browser.close();
})();
