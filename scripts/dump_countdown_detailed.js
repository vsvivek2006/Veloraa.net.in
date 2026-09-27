const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const el = document.querySelector('.gta-widget') || document.querySelector('[class*="GSC-BAR"]');
    if (!el) return 'None';
    
    function getStyles(node) {
      if (!node || node.nodeType !== 1) return null;
      const cs = window.getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return {
        tag: node.tagName,
        className: node.className,
        rect: { width: rect.width, height: rect.height, top: rect.top },
        height: cs.height,
        padding: cs.padding,
        margin: cs.margin,
        display: cs.display,
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        transform: cs.transform,
        styleAttr: node.getAttribute('style')
      };
    }

    const elements = [el, ...Array.from(el.querySelectorAll('*'))];
    return elements.map(e => getStyles(e)).filter(Boolean);
  });

  console.log(JSON.stringify(data.slice(0, 15), null, 2));
  await browser.close();
})();
