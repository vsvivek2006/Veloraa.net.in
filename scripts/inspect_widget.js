const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("https://www.veloraa.co.in/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  const reviewBtn = await page.evaluate(() => {
    const el = document.querySelector(".jdgm-medallion, [class*='medallion'], [class*='jdgm']");
    if (el) return { found: true, html: el.outerHTML, css: window.getComputedStyle(el).cssText };
    const elements = Array.from(document.querySelectorAll("div, button, a, span"));
    const match = elements.find(e => e.innerText && e.innerText.includes("★Reviews"));
    if (match) return { found: true, html: match.outerHTML };
    return { found: false };
  });

  console.log("Review Tab:", reviewBtn);
  await browser.close();
})();
