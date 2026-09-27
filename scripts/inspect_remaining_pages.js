const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Inspect Track Order link from homepage
  await page.goto('https://www.veloraa.co.in', { waitUntil: 'domcontentloaded' });
  const trackLink = await page.evaluate(() => {
    const a = Array.from(document.querySelectorAll('a')).find(el => el.textContent.toLowerCase().includes('track order'));
    return a ? { text: a.textContent.trim(), href: a.href } : null;
  });
  console.log('Track Order link on live homepage:', trackLink);

  // 2. Inspect /pages/contact-us
  await page.goto('https://www.veloraa.co.in/pages/contact-us', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const contactTitle = await page.title();
  const contactMainHtml = await page.locator('main').evaluate(el => el.outerHTML);
  fs.writeFileSync('scripts/live_contact.html', contactMainHtml);
  await page.screenshot({ path: 'live_contact.png' });
  console.log('Live Contact page title:', contactTitle);

  // 3. Inspect policy pages
  const policies = [
    'refund-policy',
    'privacy-policy',
    'terms-of-service',
    'shipping-policy',
    'contact-information'
  ];

  for (const pol of policies) {
    const pUrl = 'https://www.veloraa.co.in/policies/' + pol;
    await page.goto(pUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    const polTitle = await page.title();
    const polMainHtml = await page.locator('main').evaluate(el => el.outerHTML);
    fs.writeFileSync('scripts/live_policy_' + pol + '.html', polMainHtml);
    console.log('Policy', pol, 'Title:', polTitle);
  }

  await browser.close();
})();
