const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto("https://www.veloraa.co.in/", { waitUntil: "domcontentloaded" });
  await livePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await livePage.waitForTimeout(2000);

  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await localPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await localPage.waitForTimeout(2000);

  const getFooterFullSpecs = async (page) => {
    return await page.evaluate(() => {
      const footer = document.querySelector("footer");
      const quickLinks = Array.from(document.querySelectorAll(".footer-block__details-content a")).map(a => a.innerText.trim());
      const heading = document.querySelector(".footer-block__heading");
      const input = document.querySelector(".field__input");
      const label = document.querySelector(".field__label");
      const copyright = document.querySelector(".footer__copyright");
      const vstar = document.querySelector("#vstar-tab");

      return {
        footerBg: footer ? window.getComputedStyle(footer).backgroundColor : null,
        footerPad: footer ? window.getComputedStyle(footer).padding : null,
        quickLinks,
        newsletterHeading: heading ? heading.innerText.trim() : null,
        inputVisible: !!input,
        labelVisible: label ? label.innerText.trim() : null,
        copyrightText: copyright ? copyright.innerText.replace(/\s+/g, " ").trim() : null,
        vstarTab: vstar ? {
          text: vstar.innerText.trim(),
          bg: window.getComputedStyle(vstar).backgroundColor,
          color: window.getComputedStyle(vstar).color,
          position: window.getComputedStyle(vstar).position,
          right: window.getComputedStyle(vstar).right,
        } : null,
      };
    });
  };

  const liveFooter = await getFooterFullSpecs(livePage);
  const localFooter = await getFooterFullSpecs(localPage);

  console.log("=== SECTION 9 & 10: FOOTER & FLOATING WIDGETS AUDIT ===");
  console.log("LIVE:", JSON.stringify(liveFooter, null, 2));
  console.log("LOCAL:", JSON.stringify(localFooter, null, 2));

  await browser.close();
})();
