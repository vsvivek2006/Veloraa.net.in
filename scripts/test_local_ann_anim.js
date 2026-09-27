const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await localPage.waitForTimeout(1000);

  console.log('--- TESTING ANNOUNCEMENT BAR NEXT CLICK ---');
  const nextBtn = await localPage.$('.slider-button--next');
  if (nextBtn) {
    await nextBtn.click();
    await localPage.waitForTimeout(100);

    const duringAnim = await localPage.evaluate(() => {
      const slides = Array.from(document.querySelectorAll('.announcement-bar .slideshow__slide'));
      return slides.map(s => ({
        classes: s.className,
        text: s.innerText.trim(),
        msgTransform: window.getComputedStyle(s.querySelector('.announcement-bar__message')).transform,
        msgOpacity: window.getComputedStyle(s.querySelector('.announcement-bar__message')).opacity
      }));
    });
    console.log('DURING ANIMATION:', JSON.stringify(duringAnim, null, 2));

    await localPage.waitForTimeout(500);
    const afterAnim = await localPage.evaluate(() => {
      const slides = Array.from(document.querySelectorAll('.announcement-bar .slideshow__slide'));
      return slides.map(s => ({
        classes: s.className,
        text: s.innerText.trim()
      }));
    });
    console.log('AFTER ANIMATION:', JSON.stringify(afterAnim, null, 2));
  }

  await browser.close();
})();
