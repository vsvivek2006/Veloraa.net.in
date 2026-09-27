const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  // 1. Live
  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto("https://www.veloraa.co.in/", { waitUntil: "domcontentloaded" });
  await livePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await livePage.waitForTimeout(2000);
  const liveEl = await livePage.$(".footer-block__newsletter");
  if (liveEl) {
    await liveEl.screenshot({ path: "C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/newsletter_live_scrolled.png" });
  }

  // 2. Local
  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await localPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await localPage.waitForTimeout(2000);
  const localEl = await localPage.$(".footer-block__newsletter");
  if (localEl) {
    await localEl.screenshot({ path: "C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/newsletter_local_scrolled.png" });
  }

  console.log("Captured both live and local newsletter forms!");
  await browser.close();
})();
