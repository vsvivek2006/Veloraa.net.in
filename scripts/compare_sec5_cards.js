const { chromium } = require("playwright");
const path = require("path");

const ARTIFACTS_DIR = "C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d";

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto("https://www.veloraa.co.in/", { waitUntil: "domcontentloaded" });
  await livePage.evaluate(() => window.scrollTo(0, 1000));
  await livePage.waitForTimeout(2000);

  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await localPage.evaluate(() => window.scrollTo(0, 1000));
  await localPage.waitForTimeout(2000);

  const getGridSpecs = async (page) => {
    return await page.evaluate(() => {
      const heading = document.querySelector("h2.title, h2");
      const grid = document.querySelector("#product-grid, ul.grid");
      const cards = Array.from(document.querySelectorAll("li.grid__item, .card-wrapper")).map((c, i) => {
        const titleEl = c.querySelector(".card__heading a, .card__heading");
        const struckEl = c.querySelector(".price-item--regular");
        const saleEl = c.querySelector(".price-item--sale, .price__regular .price-item--regular");
        const badgeEl = c.querySelector(".card__badge .badge");
        const img = c.querySelector(".card__media img");
        return {
          index: i + 1,
          title: titleEl ? titleEl.innerText.trim() : null,
          titleFont: titleEl ? window.getComputedStyle(titleEl).fontSize : null,
          titleWeight: titleEl ? window.getComputedStyle(titleEl).fontWeight : null,
          struckPrice: struckEl ? struckEl.innerText.trim() : null,
          struckSize: struckEl ? window.getComputedStyle(struckEl).fontSize : null,
          salePrice: saleEl ? saleEl.innerText.trim() : null,
          saleSize: saleEl ? window.getComputedStyle(saleEl).fontSize : null,
          saleWeight: saleEl ? window.getComputedStyle(saleEl).fontWeight : null,
          badge: badgeEl ? badgeEl.innerText.trim() : null,
          imgSrc: img ? img.src.split("?")[0] : null,
          cardWidth: c.getBoundingClientRect().width,
          cardHeight: c.getBoundingClientRect().height,
        };
      });

      return {
        headingText: heading ? heading.innerText.trim() : null,
        headingFont: heading ? window.getComputedStyle(heading).fontSize : null,
        headingWeight: heading ? window.getComputedStyle(heading).fontWeight : null,
        headingColor: heading ? window.getComputedStyle(heading).color : null,
        gridPadding: grid ? window.getComputedStyle(grid).padding : null,
        totalCards: cards.length,
        cards: cards.slice(0, 8),
      };
    });
  };

  const liveGrid = await getGridSpecs(livePage);
  const localGrid = await getGridSpecs(localPage);

  const el5_live = await livePage.$(".collection, #product-grid, .page-width:has(#product-grid)");
  if (el5_live) await el5_live.screenshot({ path: path.join(ARTIFACTS_DIR, "sec5_grid_live.png") });

  const el5_local = await localPage.$(".collection, #product-grid, .page-width:has(#product-grid)");
  if (el5_local) await el5_local.screenshot({ path: path.join(ARTIFACTS_DIR, "sec5_grid_local.png") });

  console.log("=== SECTION 5 & 6: FEATURED PRODUCTS & CARDS AUDIT ===");
  console.log("LIVE:", JSON.stringify(liveGrid, null, 2));
  console.log("LOCAL:", JSON.stringify(localGrid, null, 2));

  await browser.close();
})();
