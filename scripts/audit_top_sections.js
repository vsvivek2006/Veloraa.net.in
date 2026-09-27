const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  // 1. Live page
  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await livePage.waitForTimeout(3000);

  // 2. Local page
  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await localPage.waitForTimeout(2000);

  // Measure Section 1: Top Countdown Bar
  const sec1Live = await livePage.evaluate(() => {
    const el = document.querySelector('.gta-bar');
    const text = document.querySelector('.gta-content__text');
    const timer = document.querySelector('.gta-timer');
    const closeBtn = document.querySelector('.gta-content__close-btn');
    return {
      bar: {
        height: el ? el.getBoundingClientRect().height : null,
        bg: el ? window.getComputedStyle(el).backgroundColor : null,
        display: el ? window.getComputedStyle(el).display : null,
        padding: el ? window.getComputedStyle(el).padding : null
      },
      text: {
        content: text ? text.innerText.trim() : null,
        fontSize: text ? window.getComputedStyle(text).fontSize : null,
        fontWeight: text ? window.getComputedStyle(text).fontWeight : null,
        color: text ? window.getComputedStyle(text).color : null
      },
      closeBtn: closeBtn ? {
        right: window.innerWidth - closeBtn.getBoundingClientRect().right,
        top: closeBtn.getBoundingClientRect().top
      } : null
    };
  });

  const sec1Local = await localPage.evaluate(() => {
    const el = document.querySelector('.gta-bar');
    const text = document.querySelector('.gta-content__text');
    const closeBtn = document.querySelector('.gta-content__close-btn');
    return {
      bar: {
        height: el ? el.getBoundingClientRect().height : null,
        bg: el ? window.getComputedStyle(el).backgroundColor : null,
        display: el ? window.getComputedStyle(el).display : null,
        padding: el ? window.getComputedStyle(el).padding : null
      },
      text: {
        content: text ? text.innerText.trim() : null,
        fontSize: text ? window.getComputedStyle(text).fontSize : null,
        fontWeight: text ? window.getComputedStyle(text).fontWeight : null,
        color: text ? window.getComputedStyle(text).color : null
      },
      closeBtn: closeBtn ? {
        right: window.innerWidth - closeBtn.getBoundingClientRect().right,
        top: closeBtn.getBoundingClientRect().top
      } : null
    };
  });

  // Measure Section 2: Announcement Bar
  const sec2Live = await livePage.evaluate(() => {
    const section = document.querySelector('.announcement-bar-section');
    const utilityBar = document.querySelector('.utility-bar');
    const prev = document.querySelector('.slider-button--prev');
    const next = document.querySelector('.slider-button--next');
    const msg = document.querySelector('.announcement-bar__message');
    return {
      section: {
        height: section ? section.getBoundingClientRect().height : null,
        bg: utilityBar ? window.getComputedStyle(utilityBar).backgroundColor : null,
        borderBottom: utilityBar ? window.getComputedStyle(utilityBar).borderBottom : null
      },
      prevBtn: prev ? {
        x: prev.getBoundingClientRect().x,
        y: prev.getBoundingClientRect().y,
        width: prev.getBoundingClientRect().width,
        height: prev.getBoundingClientRect().height
      } : null,
      nextBtn: next ? {
        x: next.getBoundingClientRect().x,
        y: next.getBoundingClientRect().y,
        width: next.getBoundingClientRect().width,
        height: next.getBoundingClientRect().height
      } : null,
      btnSpanDistance: (prev && next) ? next.getBoundingClientRect().left - prev.getBoundingClientRect().right : null,
      text: msg ? {
        fontSize: window.getComputedStyle(msg).fontSize,
        fontWeight: window.getComputedStyle(msg).fontWeight,
        letterSpacing: window.getComputedStyle(msg).letterSpacing,
        color: window.getComputedStyle(msg).color,
        content: msg.innerText.trim()
      } : null
    };
  });

  const sec2Local = await localPage.evaluate(() => {
    const section = document.querySelector('.announcement-bar-section');
    const utilityBar = document.querySelector('.utility-bar');
    const prev = document.querySelector('.slider-button--prev');
    const next = document.querySelector('.slider-button--next');
    const msg = document.querySelector('.announcement-bar__message');
    return {
      section: {
        height: section ? section.getBoundingClientRect().height : null,
        bg: utilityBar ? window.getComputedStyle(utilityBar).backgroundColor : null,
        borderBottom: utilityBar ? window.getComputedStyle(utilityBar).borderBottom : null
      },
      prevBtn: prev ? {
        x: prev.getBoundingClientRect().x,
        y: prev.getBoundingClientRect().y,
        width: prev.getBoundingClientRect().width,
        height: prev.getBoundingClientRect().height
      } : null,
      nextBtn: next ? {
        x: next.getBoundingClientRect().x,
        y: next.getBoundingClientRect().y,
        width: next.getBoundingClientRect().width,
        height: next.getBoundingClientRect().height
      } : null,
      btnSpanDistance: (prev && next) ? next.getBoundingClientRect().left - prev.getBoundingClientRect().right : null,
      text: msg ? {
        fontSize: window.getComputedStyle(msg).fontSize,
        fontWeight: window.getComputedStyle(msg).fontWeight,
        letterSpacing: window.getComputedStyle(msg).letterSpacing,
        color: window.getComputedStyle(msg).color,
        content: msg.innerText.trim()
      } : null
    };
  });

  console.log('=== SECTION 1 (COUNTDOWN BAR) LIVE VS LOCAL ===');
  console.log('LIVE:', JSON.stringify(sec1Live, null, 2));
  console.log('LOCAL:', JSON.stringify(sec1Local, null, 2));

  console.log('=== SECTION 2 (ANNOUNCEMENT BAR) LIVE VS LOCAL ===');
  console.log('LIVE:', JSON.stringify(sec2Live, null, 2));
  console.log('LOCAL:', JSON.stringify(sec2Local, null, 2));

  // Screenshots
  const liveSec1 = await livePage.$('.gta-bar');
  if (liveSec1) await liveSec1.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/sec1_live_audit.png' });

  const localSec1 = await localPage.$('.gta-bar');
  if (localSec1) await localSec1.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/sec1_local_audit.png' });

  const liveSec2 = await livePage.$('.announcement-bar-section');
  if (liveSec2) await liveSec2.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/sec2_live_audit.png' });

  const localSec2 = await localPage.$('.announcement-bar-section');
  if (localSec2) await localSec2.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/sec2_local_audit.png' });

  await browser.close();
})();
