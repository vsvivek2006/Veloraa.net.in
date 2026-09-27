const { chromium } = require("playwright");
const path = require("path");

const ARTIFACTS_DIR = "C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d";

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto("https://www.veloraa.co.in/", { waitUntil: "domcontentloaded" });
  await livePage.evaluate(() => window.scrollTo(0, 1800));
  await livePage.waitForTimeout(2000);

  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await localPage.evaluate(() => window.scrollTo(0, 1800));
  await localPage.waitForTimeout(2000);

  const getSec78Specs = async (page) => {
    return await page.evaluate(() => {
      const viewAll = document.querySelector(".collection__view-all a, a[href*='frontpage']");
      const secBanners = Array.from(document.querySelectorAll(".banner"));
      const secBanner = secBanners.length > 1 ? secBanners[1] : document.querySelectorAll("main img")[document.querySelectorAll("main img").length - 1];

      return {
        viewAll: viewAll ? {
          text: viewAll.innerText.trim(),
          href: viewAll.getAttribute("href"),
          bg: window.getComputedStyle(viewAll).backgroundColor,
          color: window.getComputedStyle(viewAll).color,
          fontSize: window.getComputedStyle(viewAll).fontSize,
          padding: window.getComputedStyle(viewAll).padding,
          minWidth: window.getComputedStyle(viewAll).minWidth,
        } : null,
        secondaryBanner: secBanner ? {
          rect: secBanner.getBoundingClientRect(),
          imgSrc: secBanner.tagName === "IMG" ? secBanner.src : secBanner.querySelector("img")?.src,
        } : null,
      };
    });
  };

  const live78 = await getSec78Specs(livePage);
  const local78 = await getSec78Specs(localPage);

  console.log("=== SECTION 7 & 8: VIEW ALL & SECONDARY BANNER AUDIT ===");
  console.log("LIVE:", JSON.stringify(live78, null, 2));
  console.log("LOCAL:", JSON.stringify(local78, null, 2));

  await browser.close();
})();
