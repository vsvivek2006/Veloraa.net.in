const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  const handles = [
    '5-in-1-bundle',
    'watch-series-10-free-pro-2nd-generation-anc-type-c-100-hassle-free-warranty',
    'vpods-max-anc',
    'magsafe-battery-pack-wireless-power-bank',
    'veloraa-watch-ultra-gps-cellular-49-mm-smart-watch',
    'veloraa-series10-cellular-49-mm-smart-watch',
    'untitled-aug7_12-30',
    'vpods-pro-2nd-gen-usa-quality'
  ];

  console.log('Testing all 8 live product URLs on local server...');

  for (const h of handles) {
    const res = await page.goto(`http://localhost:3000/products/${h}`, { waitUntil: 'domcontentloaded' });
    const title = await page.$eval('h1.product__title', el => el.innerText.trim()).catch(() => 'no title');
    const price = await page.$eval('.price-item--sale', el => el.innerText.trim()).catch(() => 'no price');
    console.log(`URL: /products/${h} -> HTTP ${res.status()} | Title: ${title.slice(0, 40)}... | Price: ${price}`);
  }

  await browser.close();
})();
