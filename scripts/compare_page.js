const { chromium } = require("playwright");
const path = require("path");

const ARTIFACTS_DIR = "C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d";

async function comparePage(name, liveUrl, localUrl) {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();

  console.log(`[1/2] Capturing Live: ${liveUrl}...`);
  try {
    await page.goto(liveUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(4000);
    // Smooth scroll down and back up to trigger lazy-loaded images
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 100);
      });
    });
    await page.waitForTimeout(2000);
    const livePath = path.join(ARTIFACTS_DIR, `${name}_live.png`);
    await page.screenshot({ path: livePath, fullPage: true });
    console.log(`Saved ${livePath}`);
  } catch (e) {
    console.error(`Live capture error: ${e.message}`);
  }

  console.log(`[2/2] Capturing Local: ${localUrl}...`);
  try {
    await page.goto(localUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2000);
    // Smooth scroll down and back up to trigger any lazy-loading
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 100);
      });
    });
    await page.waitForTimeout(1000);
    const localPath = path.join(ARTIFACTS_DIR, `${name}_local.png`);
    await page.screenshot({ path: localPath, fullPage: true });
    console.log(`Saved ${localPath}`);
  } catch (e) {
    console.error(`Local capture error: ${e.message}`);
  }

  await browser.close();
  console.log("Comparison complete!");
}

const args = process.argv.slice(2);
const pageName = args[0] || "home";
const live = args[1] || "https://www.veloraa.co.in/";
const local = args[2] || "http://localhost:3000/";

comparePage(pageName, live, local);
