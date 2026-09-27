const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  for (const handle of ['frontpage', 'all']) {
    const url = 'https://www.veloraa.co.in/collections/' + handle;
    console.log('Navigating to', url);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const title = await page.title();
    const h1 = await page.locator('h1').first().textContent().catch(() => 'no h1');
    const sections = await page.locator('main > *').evaluateAll(els => els.map(e => ({
      tag: e.tagName,
      id: e.id,
      className: e.className,
      height: e.offsetHeight
    })));

    console.log(handle, 'Title:', title, 'H1:', h1);
    console.log('Sections:', JSON.stringify(sections, null, 2));

    await page.screenshot({ path: 'live_collection_' + handle + '.png' });
    const fullHtml = await page.locator('main').evaluate(el => el.outerHTML);
    fs.writeFileSync('scripts/live_collection_' + handle + '.html', fullHtml);
  }

  await browser.close();
})();
