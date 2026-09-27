const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/search', { waitUntil: 'networkidle', timeout: 35000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const searchInfo = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const title = document.querySelector('h1')?.textContent.trim();
    const input = document.querySelector('input[type="search"]');
    const sections = Array.from(main.querySelectorAll('section, [id*="shopify-section-template--"]')).map(s => ({
      id: s.id,
      className: s.className,
      height: Math.round(s.getBoundingClientRect().height)
    }));
    return {
      title,
      hasInput: !!input,
      inputPlaceholder: input ? input.getAttribute('placeholder') : null,
      sections
    };
  });

  console.log(JSON.stringify(searchInfo, null, 2));
  await browser.close();
})();
