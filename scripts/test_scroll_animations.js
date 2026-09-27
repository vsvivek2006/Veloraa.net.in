const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Check initial state of scroll triggers (offscreen vs onscreen)
  const initialTriggers = await page.evaluate(() => {
    const list = Array.from(document.querySelectorAll('.scroll-trigger'));
    return list.map(el => ({
      id: el.id,
      classes: el.className,
      opacity: window.getComputedStyle(el).opacity,
      transform: window.getComputedStyle(el).transform
    }));
  });
  console.log('INITIAL SCROLL TRIGGERS (AT TOP):', JSON.stringify(initialTriggers.slice(0, 5), null, 2));

  // Now scroll down by 600px
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(600);

  const afterScrollTriggers = await page.evaluate(() => {
    const list = Array.from(document.querySelectorAll('.scroll-trigger'));
    return list.map(el => ({
      id: el.id,
      classes: el.className,
      opacity: window.getComputedStyle(el).opacity,
      transform: window.getComputedStyle(el).transform
    }));
  });
  console.log('AFTER SCROLLING (600px):', JSON.stringify(afterScrollTriggers.slice(0, 5), null, 2));

  await browser.close();
})();
