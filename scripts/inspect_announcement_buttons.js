const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await livePage.waitForTimeout(2000);

  const liveAnn = await livePage.evaluate(() => {
    const section = document.querySelector('.announcement-bar-section');
    const utilityBar = document.querySelector('.utility-bar');
    const slider = document.querySelector('.announcement-bar-slider');
    const prevBtn = document.querySelector('.slider-button--prev');
    const nextBtn = document.querySelector('.slider-button--next');
    const textEl = document.querySelector('.announcement-bar__message');

    return {
      utilityBar: {
        bg: window.getComputedStyle(utilityBar).backgroundColor,
        padding: window.getComputedStyle(utilityBar).padding,
        borderBottom: window.getComputedStyle(utilityBar).borderBottom,
        rect: utilityBar.getBoundingClientRect()
      },
      slider: {
        rect: slider.getBoundingClientRect(),
        display: window.getComputedStyle(slider).display,
        justifyContent: window.getComputedStyle(slider).justifyContent,
        alignItems: window.getComputedStyle(slider).alignItems,
        maxWidth: window.getComputedStyle(slider).maxWidth
      },
      prevBtn: {
        rect: prevBtn.getBoundingClientRect(),
        width: window.getComputedStyle(prevBtn).width,
        height: window.getComputedStyle(prevBtn).height,
        color: window.getComputedStyle(prevBtn).color
      },
      nextBtn: {
        rect: nextBtn.getBoundingClientRect(),
        width: window.getComputedStyle(nextBtn).width,
        height: window.getComputedStyle(nextBtn).height
      },
      text: {
        fontSize: window.getComputedStyle(textEl).fontSize,
        fontWeight: window.getComputedStyle(textEl).fontWeight,
        letterSpacing: window.getComputedStyle(textEl).letterSpacing,
        color: window.getComputedStyle(textEl).color,
        textAlign: window.getComputedStyle(textEl).textAlign
      },
      btnDistance: nextBtn.getBoundingClientRect().left - prevBtn.getBoundingClientRect().right
    };
  });

  console.log('=== LIVE ANNOUNCEMENT BAR DETAILS ===');
  console.log(JSON.stringify(liveAnn, null, 2));

  // Take screenshot of live announcement bar
  const liveSec = await livePage.$('.announcement-bar-section');
  if (liveSec) {
    await liveSec.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/announcement_live_exact.png' });
  }

  // Now check local
  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await localPage.waitForTimeout(2000);

  const localAnn = await localPage.evaluate(() => {
    const utilityBar = document.querySelector('.utility-bar');
    const slider = document.querySelector('.announcement-bar-slider');
    const prevBtn = document.querySelector('.slider-button--prev');
    const nextBtn = document.querySelector('.slider-button--next');

    return {
      slider: slider ? {
        rect: slider.getBoundingClientRect(),
        maxWidth: window.getComputedStyle(slider).maxWidth
      } : null,
      prevBtn: prevBtn ? prevBtn.getBoundingClientRect() : null,
      nextBtn: nextBtn ? nextBtn.getBoundingClientRect() : null,
      btnDistance: (prevBtn && nextBtn) ? nextBtn.getBoundingClientRect().left - prevBtn.getBoundingClientRect().right : null
    };
  });
  console.log('=== LOCAL ANNOUNCEMENT BAR DETAILS ===');
  console.log(JSON.stringify(localAnn, null, 2));

  await browser.close();
})();
