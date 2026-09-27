const { chromium } = require("playwright");
const path = require("path");

const ARTIFACTS_DIR = "C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d";

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto("https://www.veloraa.co.in/", { waitUntil: "domcontentloaded" });
  await livePage.waitForTimeout(2000);

  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await localPage.waitForTimeout(2000);

  const getHeroSpecs = async (page) => {
    return await page.evaluate(() => {
      const banner = document.querySelector(".banner") || document.querySelector("#Banner-template--sections--hero") || document.querySelector("main .relative img").closest("div");
      const img = banner ? banner.querySelector("img") : null;
      return {
        bannerRect: banner ? banner.getBoundingClientRect() : null,
        imgSrc: img ? img.src : null,
        imgNaturalWidth: img ? img.naturalWidth : null,
        imgNaturalHeight: img ? img.naturalHeight : null,
        imgWidth: img ? img.getBoundingClientRect().width : null,
        imgHeight: img ? img.getBoundingClientRect().height : null,
        objectFit: img ? window.getComputedStyle(img).objectFit : null,
      };
    });
  };

  const liveHero = await getHeroSpecs(livePage);
  const localHero = await getHeroSpecs(localPage);

  const el4_live = await livePage.$(".banner, #Banner-template--sections--hero, main > div:first-child");
  if (el4_live) await el4_live.screenshot({ path: path.join(ARTIFACTS_DIR, "sec4_hero_live.png") });

  const el4_local = await localPage.$(".banner, #Banner-template--sections--hero, main > div:first-child");
  if (el4_local) await el4_local.screenshot({ path: path.join(ARTIFACTS_DIR, "sec4_hero_local.png") });

  console.log("=== SECTION 4: HERO AUDIT ===");
  console.log("LIVE:", JSON.stringify(liveHero, null, 2));
  console.log("LOCAL:", JSON.stringify(localHero, null, 2));

  await browser.close();
})();
