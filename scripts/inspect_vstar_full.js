const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);

  const vstarDetails = await page.evaluate(() => {
    const el = document.getElementById('vstar-tab');
    if (!el) return null;
    const computed = window.getComputedStyle(el);
    return {
      outerHTML: el.outerHTML,
      rect: el.getBoundingClientRect(),
      allRules: Array.from(document.styleSheets).flatMap(s => {
        try {
          return Array.from(s.cssRules).filter(r => r.selectorText && r.selectorText.includes('vstar-tab')).map(r => r.cssText);
        } catch (e) {
          return [];
        }
      }),
      styles: {
        position: computed.position,
        top: computed.top,
        right: computed.right,
        bottom: computed.bottom,
        left: computed.left,
        transform: computed.transform,
        transformOrigin: computed.transformOrigin,
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        fontSize: computed.fontSize,
        lineHeight: computed.lineHeight,
        padding: computed.padding,
        borderRadius: computed.borderRadius,
        boxShadow: computed.boxShadow,
        cursor: computed.cursor,
        zIndex: computed.zIndex,
        fontWeight: computed.fontWeight,
        width: computed.width,
        height: computed.height,
        display: computed.display
      }
    };
  });
  console.log('=== VSTAR DETAILS ===');
  console.log(JSON.stringify(vstarDetails, null, 2));

  // Screenshot of vstar tab on live
  const el = await page.$('#vstar-tab');
  if (el) {
    await el.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/vstar_live.png' });
  }

  // Also check animations on the live page
  const animations = await page.evaluate(() => {
    const scrollTriggers = Array.from(document.querySelectorAll('.scroll-trigger')).map(s => ({
      class: s.className,
      tag: s.tagName,
      id: s.id
    }));
    return {
      scrollTriggersCount: scrollTriggers.length,
      sample: scrollTriggers.slice(0, 10)
    };
  });
  console.log('=== SCROLL TRIGGERS ===');
  console.log(JSON.stringify(animations, null, 2));

  await browser.close();
})();
