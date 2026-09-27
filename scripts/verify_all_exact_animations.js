const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // 1. Check Announcement Bar Carousel
  const annState = await page.evaluate(() => {
    const slider = document.querySelector('.announcement-bar-slider');
    const prevBtn = document.querySelector('.slider-button--prev');
    const nextBtn = document.querySelector('.slider-button--next');
    return {
      sliderWidth: slider.getBoundingClientRect().width,
      prevX: prevBtn.getBoundingClientRect().x,
      nextX: nextBtn.getBoundingClientRect().x,
      buttonSpanDistance: nextBtn.getBoundingClientRect().left - prevBtn.getBoundingClientRect().right
    };
  });
  console.log('ANNOUNCEMENT GEOMETRY:', annState);

  // 2. Check Scroll Animation initial state
  const scrollInitial = await page.evaluate(() => {
    const card = document.querySelector('.grid__item.scroll-trigger');
    return {
      classes: card ? card.className : null,
      opacity: card ? window.getComputedStyle(card).opacity : null,
      transform: card ? window.getComputedStyle(card).transform : null
    };
  });
  console.log('SCROLL INITIAL (OFFSCREEN):', scrollInitial);

  // 3. Scroll down and check Scroll Animation triggered
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(800);

  const scrollTriggered = await page.evaluate(() => {
    const card = document.querySelector('.grid__item.scroll-trigger');
    return {
      classes: card ? card.className : null,
      opacity: card ? window.getComputedStyle(card).opacity : null,
      transform: card ? window.getComputedStyle(card).transform : null
    };
  });
  console.log('SCROLL TRIGGERED (IN VIEW):', scrollTriggered);

  // 4. Check Card Hover Animation
  const firstCard = await page.$('.card-wrapper');
  if (firstCard) {
    await firstCard.hover();
    await page.waitForTimeout(400);
    const hoverState = await page.evaluate(() => {
      const img = document.querySelector('.card-wrapper .card__media img');
      return {
        transform: img ? window.getComputedStyle(img).transform : null,
        transition: img ? window.getComputedStyle(img).transition : null
      };
    });
    console.log('CARD HOVER STATE:', hoverState);
  }

  // 5. Check #vstar-tab
  const vstar = await page.evaluate(() => {
    const tab = document.getElementById('vstar-tab');
    return {
      text: tab.innerText.trim(),
      rect: tab.getBoundingClientRect(),
      transform: window.getComputedStyle(tab).transform
    };
  });
  console.log('VSTAR TAB:', vstar);

  await browser.close();
})();
