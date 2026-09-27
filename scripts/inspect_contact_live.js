const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/pages/contact-us', { waitUntil: 'networkidle', timeout: 35000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const sections = Array.from(main.querySelectorAll('section, [id*="shopify-section-template--"]')).map(s => ({
      id: s.id,
      className: s.className,
      tag: s.tagName,
      height: Math.round(s.getBoundingClientRect().height),
      h1: s.querySelector('h1')?.textContent.trim(),
      h2: s.querySelector('h2')?.textContent.trim(),
      htmlSnippet: s.innerHTML.slice(0, 600)
    }));
    return {
      title: document.title,
      sections
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
