const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  // 1. Live site
  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await livePage.waitForTimeout(3000);

  // Scroll down step by step and track what classes and styles change
  const liveSteps = [];
  for (const scrollY of [0, 200, 400, 600, 800, 1000]) {
    await livePage.evaluate((y) => window.scrollTo(0, y), scrollY);
    await livePage.waitForTimeout(400);
    const state = await livePage.evaluate(() => {
      const heading = document.querySelector('h2.title');
      const card1 = document.querySelector('.grid__item:nth-child(1)');
      const card2 = document.querySelector('.grid__item:nth-child(2)');
      const banner2 = document.querySelector('.banner--small');
      return {
        heading: heading ? { class: heading.className, opacity: window.getComputedStyle(heading).opacity, transform: window.getComputedStyle(heading).transform } : null,
        card1: card1 ? { class: card1.className, opacity: window.getComputedStyle(card1).opacity, transform: window.getComputedStyle(card1).transform } : null,
        card2: card2 ? { class: card2.className, opacity: window.getComputedStyle(card2).opacity, transform: window.getComputedStyle(card2).transform } : null,
        banner2: banner2 ? { class: banner2.className, opacity: window.getComputedStyle(banner2).opacity, transform: window.getComputedStyle(banner2).transform } : null
      };
    });
    liveSteps.push({ scrollY, state });
  }
  console.log('=== LIVE SCROLL STEPS ===');
  console.log(JSON.stringify(liveSteps, null, 2));

  // 2. Local site
  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await localPage.waitForTimeout(2000);

  const localSteps = [];
  for (const scrollY of [0, 200, 400, 600, 800, 1000]) {
    await localPage.evaluate((y) => window.scrollTo(0, y), scrollY);
    await localPage.waitForTimeout(400);
    const state = await localPage.evaluate(() => {
      const heading = document.querySelector('h2.title');
      const card1 = document.querySelector('.grid__item:nth-child(1)');
      const card2 = document.querySelector('.grid__item:nth-child(2)');
      const banner2 = document.querySelector('.banner--small');
      return {
        heading: heading ? { class: heading.className, opacity: window.getComputedStyle(heading).opacity, transform: window.getComputedStyle(heading).transform } : null,
        card1: card1 ? { class: card1.className, opacity: window.getComputedStyle(card1).opacity, transform: window.getComputedStyle(card1).transform } : null,
        card2: card2 ? { class: card2.className, opacity: window.getComputedStyle(card2).opacity, transform: window.getComputedStyle(card2).transform } : null,
        banner2: banner2 ? { class: banner2.className, opacity: window.getComputedStyle(banner2).opacity, transform: window.getComputedStyle(banner2).transform } : null
      };
    });
    localSteps.push({ scrollY, state });
  }
  console.log('=== LOCAL SCROLL STEPS ===');
  console.log(JSON.stringify(localSteps, null, 2));

  await browser.close();
})();
