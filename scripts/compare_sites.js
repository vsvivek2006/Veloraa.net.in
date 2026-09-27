const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const OUT_DIR = path.join(__dirname, "screenshots");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const LIVE = "https://www.veloraa.co.in";
const LOCAL = "http://localhost:3000";

async function run() {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  // ── LIVE ──────────────────────────────────────────────────────
  console.log("Opening LIVE site...");
  const live = await ctx.newPage();
  await live.goto(LIVE, { waitUntil: "domcontentloaded", timeout: 60000 });
  await live.waitForTimeout(4000); // let JS render

  await live.screenshot({ path: path.join(OUT_DIR, "LIVE_01_top.png") });
  console.log("  LIVE_01_top done");

  await live.evaluate(() => window.scrollTo(0, 700));
  await live.waitForTimeout(1000);
  await live.screenshot({ path: path.join(OUT_DIR, "LIVE_02_products.png") });
  console.log("  LIVE_02_products done");

  await live.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await live.waitForTimeout(1000);
  await live.screenshot({ path: path.join(OUT_DIR, "LIVE_03_footer.png") });
  console.log("  LIVE_03_footer done");

  await live.evaluate(() => window.scrollTo(0, 0));
  await live.waitForTimeout(500);
  await live.screenshot({ path: path.join(OUT_DIR, "LIVE_FULL.png"), fullPage: true });
  console.log("  LIVE_FULL done");

  // ── LOCAL ─────────────────────────────────────────────────────
  console.log("Opening LOCAL site...");
  const local = await ctx.newPage();
  await local.goto(LOCAL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await local.waitForTimeout(3000);

  await local.screenshot({ path: path.join(OUT_DIR, "LOCAL_01_top.png") });
  console.log("  LOCAL_01_top done");

  await local.evaluate(() => window.scrollTo(0, 700));
  await local.waitForTimeout(1000);
  await local.screenshot({ path: path.join(OUT_DIR, "LOCAL_02_products.png") });
  console.log("  LOCAL_02_products done");

  await local.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await local.waitForTimeout(1000);
  await local.screenshot({ path: path.join(OUT_DIR, "LOCAL_03_footer.png") });
  console.log("  LOCAL_03_footer done");

  await local.evaluate(() => window.scrollTo(0, 0));
  await local.waitForTimeout(500);
  await local.screenshot({ path: path.join(OUT_DIR, "LOCAL_FULL.png"), fullPage: true });
  console.log("  LOCAL_FULL done");

  // ── METRICS ───────────────────────────────────────────────────
  console.log("\nExtracting LIVE metrics...");
  const lm = await live.evaluate(() => {
    const g = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { h: Math.round(r.height), fs: s.fontSize, color: s.color, bg: s.backgroundColor, fw: s.fontWeight };
    };
    return {
      html_fontSize: getComputedStyle(document.documentElement).fontSize,
      body_fontSize: getComputedStyle(document.body).fontSize,
      countdown:     g(".gta-bar, .GSC-BAR-SPbbFrxoIbbs"),
      announcement:  g(".announcement-bar-section"),
      header:        g("header"),
      nav_link:      g(".header__menu-item"),
      hero_img:      (() => { const i = document.querySelector(".banner img, .slideshow img"); return i ? { src: i.src.substring(0,80) } : null; })(),
      product_card:  g(".card-wrapper"),
      product_title: g(".card__heading"),
      price:         g(".price-item--sale, .price-item--regular"),
      footer_h2:     g(".footer-block__heading"),
      footer_link:   g(".footer .link, .footer a"),
      footer_input:  g(".footer .field__input"),
    };
  });

  console.log("Extracting LOCAL metrics...");
  const loc = await local.evaluate(() => {
    const g = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { h: Math.round(r.height), fs: s.fontSize, color: s.color, bg: s.backgroundColor, fw: s.fontWeight };
    };
    return {
      html_fontSize: getComputedStyle(document.documentElement).fontSize,
      body_fontSize: getComputedStyle(document.body).fontSize,
      countdown:     g(".gta-bar, .gta-widget"),
      announcement:  g(".announcement-bar-section"),
      header:        g("header"),
      nav_link:      g(".header__menu-item"),
      hero_img:      (() => { const i = document.querySelector(".banner img"); return i ? { src: i.src.substring(0,80) } : null; })(),
      product_card:  g(".card-wrapper"),
      product_title: g(".card__heading"),
      price:         g(".price-item--sale, .price-item--regular"),
      footer_h2:     g(".footer-block__heading"),
      footer_link:   g(".footer .link, .footer a"),
      footer_input:  g(".footer .field__input"),
    };
  });

  // ── REPORT ────────────────────────────────────────────────────
  console.log("\n========== COMPARISON REPORT ==========");
  console.log("Key                  | LIVE                  | LOCAL                 | STATUS");
  console.log("---------------------|----------------------|----------------------|--------");

  const allKeys = Object.keys(lm);
  const diffs = [];
  for (const k of allKeys) {
    const lv = JSON.stringify(lm[k]);
    const lc = JSON.stringify(loc[k]);
    const match = lv === lc ? "OK" : "DIFF";
    if (match === "DIFF") diffs.push(k);
    const lv2 = lv.length > 21 ? lv.substring(0,21)+"..." : lv.padEnd(22);
    const lc2 = lc.length > 21 ? lc.substring(0,21)+"..." : lc.padEnd(22);
    console.log(`${k.padEnd(20)} | ${lv2} | ${lc2} | ${match}`);
  }

  console.log("\n====== DIFFERENCES DETAIL ======");
  for (const k of diffs) {
    console.log(`\n[${k}]`);
    console.log("  LIVE :", JSON.stringify(lm[k]));
    console.log("  LOCAL:", JSON.stringify(loc[k]));
  }

  fs.writeFileSync(path.join(OUT_DIR, "metrics.json"), JSON.stringify({ live: lm, local: loc, diffs }, null, 2));
  console.log("\nScreenshots saved in:", OUT_DIR);
  await browser.close();
}

run().catch(e => { console.error(e.message); process.exit(1); });
