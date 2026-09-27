const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const info = await page.evaluate(() => {
    // Find countdown bar container
    const all = Array.from(document.querySelectorAll('*')).filter(el => el.textContent && el.textContent.includes('Anniversary'));
    let bar = null;
    for (const el of all) {
      if (el.className && typeof el.className === 'string' && el.className.includes('gta-widget')) {
        bar = el;
        break;
      }
    }
    if (!bar) {
      const widget = document.querySelector('.gta-widget') || document.querySelector('[class*="GSC-BAR"]');
      if (widget) bar = widget;
    }
    if (!bar && all.length) {
      bar = all[0].closest('.gta-widget') || all[0].closest('div[style*="background"]');
    }
    if (!bar) return { error: 'Not found' };

    const rect = bar.getBoundingClientRect();
    const computed = window.getComputedStyle(bar);

    // Labels
    const labels = Array.from(bar.querySelectorAll('*')).filter(el => /Days|Hours|Minutes|Seconds/i.test(el.textContent) && el.children.length === 0);
    const labelStyles = labels.length ? window.getComputedStyle(labels[0]) : null;

    // Numbers
    const numbers = Array.from(bar.querySelectorAll('*')).filter(el => /^\d{2}$/.test(el.textContent.trim()) && el.children.length === 0);
    const numStyles = numbers.length ? window.getComputedStyle(numbers[0]) : null;

    // Bar texts
    const barTexts = Array.from(bar.querySelectorAll('*')).filter(el => el.textContent && el.textContent.includes('Sale is Live') && el.children.length === 0);
    const textStyles = barTexts.length ? window.getComputedStyle(barTexts[0]) : null;

    // Container / wrap
    const wrap = bar.querySelector('.gta-content__wrap') || bar.firstElementChild;
    const wrapStyles = wrap ? window.getComputedStyle(wrap) : null;

    return {
      barHeight: rect.height,
      barPadding: computed.padding,
      wrapPadding: wrapStyles ? wrapStyles.padding : null,
      wrapHeight: wrap ? wrap.getBoundingClientRect().height : null,
      labelText: labels.map(l => l.textContent.trim()),
      labelFont: labelStyles ? {
        fontSize: labelStyles.fontSize,
        fontFamily: labelStyles.fontFamily,
        textTransform: labelStyles.textTransform,
        lineHeight: labelStyles.lineHeight,
        color: labelStyles.color,
        fontWeight: labelStyles.fontWeight,
        margin: labelStyles.margin,
        padding: labelStyles.padding
      } : null,
      numberFont: numStyles ? {
        fontSize: numStyles.fontSize,
        fontFamily: numStyles.fontFamily,
        lineHeight: numStyles.lineHeight,
        fontWeight: numStyles.fontWeight
      } : null,
      textFont: textStyles ? {
        fontSize: textStyles.fontSize,
        lineHeight: textStyles.lineHeight,
        fontWeight: textStyles.fontWeight
      } : null
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
