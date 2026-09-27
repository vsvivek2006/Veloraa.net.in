const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUT = path.join(__dirname, "screenshots");

async function run() {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(3000);

  // Screenshot top
  await page.screenshot({ path: path.join(OUT, "VERIFY_local_top.png") });

  // Screenshot products
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(OUT, "VERIFY_local_products.png") });

  // Metrics
  const m = await page.evaluate(() => ({
    countdown_h: document.querySelector(".gta-bar")?.getBoundingClientRect().height,
    header_h: document.querySelector("header")?.getBoundingClientRect().height,
    hamburger_display: document.querySelector(".mobile-drawer-btn") ? getComputedStyle(document.querySelector(".mobile-drawer-btn")).display : null,
    card_h: document.querySelector(".card-wrapper")?.getBoundingClientRect().height,
    card_media_h: document.querySelector(".card__media")?.getBoundingClientRect().height,
  }));

  console.log("\n=== VERIFY AFTER FIXES ===");
  console.log("COUNTDOWN  height:", m.countdown_h, " (LIVE: 64)");
  console.log("HEADER     height:", m.header_h,   " (LIVE: 183)");
  console.log("HAMBURGER  display:", m.hamburger_display, " (LIVE: none)");
  console.log("CARD       height:", m.card_h,     " (LIVE: 402)");
  console.log("CARD MEDIA height:", m.card_media_h, " (LIVE: 269)");

  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
