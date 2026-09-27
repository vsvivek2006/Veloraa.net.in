const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/policies/shipping-policy', { waitUntil: 'networkidle', timeout: 35000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const policyInfo = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const title = document.querySelector('h1')?.textContent.trim();
    const content = document.querySelector('.shopify-policy__container, .rte, .shopify-policy__body')?.innerHTML.slice(0, 800);
    const container = document.querySelector('.shopify-policy__container');
    const cs = container ? window.getComputedStyle(container) : null;
    return {
      title,
      containerClasses: container ? container.className : null,
      maxWidth: cs ? cs.maxWidth : null,
      padding: cs ? cs.padding : null,
      contentSnippet: content
    };
  });

  console.log(JSON.stringify(policyInfo, null, 2));
  await browser.close();
})();
