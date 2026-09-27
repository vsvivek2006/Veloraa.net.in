const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/pages/contact-us', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const info1 = await page.evaluate(() => ({
    title: document.querySelector('h1')?.textContent.trim(),
    inputs: Array.from(document.querySelectorAll('input, textarea')).length,
    hasForm: !!document.querySelector('form#ContactForm'),
    btnText: document.querySelector('button[type="submit"]')?.textContent.trim()
  }));

  await page.goto('http://localhost:3000/contact', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const info2 = await page.evaluate(() => ({
    title: document.querySelector('h1')?.textContent.trim(),
    inputs: Array.from(document.querySelectorAll('input, textarea')).length,
    hasForm: !!document.querySelector('form#ContactForm'),
    btnText: document.querySelector('button[type="submit"]')?.textContent.trim()
  }));

  console.log('contact-us:', JSON.stringify(info1));
  console.log('contact:', JSON.stringify(info2));

  await browser.close();
})();
