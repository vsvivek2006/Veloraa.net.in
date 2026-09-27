const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('https://www.veloraa.co.in/products/5-in-1-bundle', { waitUntil: 'networkidle', timeout: 35000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const sec = document.querySelector('#shopify-section-template--26661922308414__custom_liquid_cgrL4w');
    if (!sec) return 'Section not found';
    
    // Find any keyframes or style tags inside or related
    const styles = Array.from(sec.querySelectorAll('style')).map(s => s.innerHTML);
    const classes = Array.from(new Set(Array.from(sec.querySelectorAll('*')).map(el => el.className).filter(Boolean)));
    const headings = Array.from(sec.querySelectorAll('h1, h2, h3, h4, h5')).map(h => h.textContent.trim());
    const images = Array.from(sec.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.getBoundingClientRect().width,
      height: img.getBoundingClientRect().height
    }));

    return {
      secHeight: sec.getBoundingClientRect().height,
      headings,
      imagesCount: images.length,
      sampleImages: images.slice(0, 5),
      stylesCount: styles.length,
      classes: classes.slice(0, 30),
      rawHtmlSnippet: sec.innerHTML.slice(0, 1000)
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
