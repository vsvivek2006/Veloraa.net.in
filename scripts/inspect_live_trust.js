const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const trustEl = await page.$('.veloraa-trust-section');
  if (trustEl) {
    await trustEl.screenshot({ path: 'scripts/live_trust_section_screenshot.png' });
  }

  const computed = await page.evaluate(() => {
    const s = document.querySelector('.veloraa-trust-section');
    if (!s) return null;
    const cards = Array.from(s.querySelectorAll('.veloraa-trust-card')).map(c => {
      const rect = c.getBoundingClientRect();
      const style = window.getComputedStyle(c);
      const textEl = c.querySelector('.veloraa-trust-text');
      const textStyle = textEl ? window.getComputedStyle(textEl) : null;
      return {
        width: rect.width,
        height: rect.height,
        display: style.display,
        flexDirection: style.flexDirection,
        writingMode: textStyle ? textStyle.writingMode : null,
        whiteSpace: textStyle ? textStyle.whiteSpace : null
      };
    });
    const sStyle = window.getComputedStyle(s);
    return {
      sectionWidth: s.getBoundingClientRect().width,
      sectionDisplay: sStyle.display,
      sectionGridTemplate: sStyle.gridTemplateColumns,
      cards
    };
  });

  console.log('Live Trust Section details:', JSON.stringify(computed, null, 2));

  await browser.close();
})();
