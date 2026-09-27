const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("https://www.veloraa.co.in", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    // Get ALL CSS rules containing "ratio" from all stylesheets
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.cssText && rule.cssText.includes("ratio")) {
            rules.push(rule.cssText.substring(0, 300));
          }
        }
      } catch(e) {}
    }

    // Also get card inner computed styles
    const cardInner = document.querySelector(".card__inner");
    const cardMedia = document.querySelector(".card__media");
    const mediaEl = document.querySelector(".card__inner .media");
    
    return {
      ratio_rules: rules.slice(0, 20),
      card_inner: cardInner ? {
        cs: getComputedStyle(cardInner).cssText?.substring(0,200),
        h: cardInner.getBoundingClientRect().height,
        paddingBottom: getComputedStyle(cardInner).paddingBottom,
        position: getComputedStyle(cardInner).position,
      } : null,
      card_media: cardMedia ? {
        h: cardMedia.getBoundingClientRect().height,
        position: getComputedStyle(cardMedia).position,
        top: getComputedStyle(cardMedia).top,
      } : null,
      media_el: mediaEl ? {
        h: mediaEl.getBoundingClientRect().height,
        position: getComputedStyle(mediaEl).position,
      } : null,
    };
  });

  console.log("RATIO RULES:");
  data.ratio_rules.forEach(r => console.log(r));
  console.log("\nCARD INNER:", JSON.stringify(data.card_inner));
  console.log("CARD MEDIA:", JSON.stringify(data.card_media));
  console.log("MEDIA EL:", JSON.stringify(data.media_el));
  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
