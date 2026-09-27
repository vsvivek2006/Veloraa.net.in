const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ARTIFACTS_DIR = "C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d";

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto("https://www.veloraa.co.in/", { waitUntil: "domcontentloaded" });
  await livePage.waitForTimeout(3000);

  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await localPage.waitForTimeout(2000);

  // Helper to get element computed styles & bounding box
  const getMetrics = async (page, selector) => {
    return await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);
      return {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        padding: cs.padding,
        margin: cs.margin,
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        letterSpacing: cs.letterSpacing,
        lineHeight: cs.lineHeight,
        display: cs.display,
        justifyContent: cs.justifyContent,
        alignItems: cs.alignItems,
      };
    }, selector);
  };

  // ==========================================
  // SECTION 1: Top Countdown Bar
  // ==========================================
  const sel1 = ".gta-widget.gta-bar";
  const metrics1_live = await getMetrics(livePage, sel1);
  const metrics1_local = await getMetrics(localPage, sel1);

  const el1_live = await livePage.$(sel1);
  if (el1_live) await el1_live.screenshot({ path: path.join(ARTIFACTS_DIR, "sec1_countdown_live.png") });

  const el1_local = await localPage.$(sel1);
  if (el1_local) await el1_local.screenshot({ path: path.join(ARTIFACTS_DIR, "sec1_countdown_local.png") });

  // Detail metrics for children of Section 1
  const sec1_child_live = await livePage.evaluate(() => {
    const text = document.querySelector(".gta-content__text");
    const timer = document.querySelector(".gta-content__timer");
    return {
      text: text ? {
        content: text.innerText,
        fontSize: window.getComputedStyle(text).fontSize,
        fontWeight: window.getComputedStyle(text).fontWeight,
        color: window.getComputedStyle(text).color,
        lineHeight: window.getComputedStyle(text).lineHeight,
      } : null,
      timerWidth: timer ? window.getComputedStyle(timer).width : null,
    };
  });

  const sec1_child_local = await localPage.evaluate(() => {
    const text = document.querySelector(".gta-content__text");
    const timer = document.querySelector(".gta-content__timer");
    return {
      text: text ? {
        content: text.innerText,
        fontSize: window.getComputedStyle(text).fontSize,
        fontWeight: window.getComputedStyle(text).fontWeight,
        color: window.getComputedStyle(text).color,
        lineHeight: window.getComputedStyle(text).lineHeight,
      } : null,
      timerWidth: timer ? window.getComputedStyle(timer).width : null,
    };
  });

  // ==========================================
  // SECTION 2: Announcement Bar
  // ==========================================
  const sel2_live = ".announcement-bar-section, .utility-bar, [id*='announcement-bar']";
  const sel2_local = ".announcement-bar-section, .utility-bar, [id*='announcement-bar']";
  const metrics2_live = await getMetrics(livePage, sel2_live);
  const metrics2_local = await getMetrics(localPage, sel2_local);

  const el2_live = await livePage.$(sel2_live);
  if (el2_live) await el2_live.screenshot({ path: path.join(ARTIFACTS_DIR, "sec2_announcement_live.png") });

  const el2_local = await localPage.$(sel2_local);
  if (el2_local) await el2_local.screenshot({ path: path.join(ARTIFACTS_DIR, "sec2_announcement_local.png") });

  const sec2_details_live = await livePage.evaluate(() => {
    const msg = document.querySelector(".announcement-bar__message span");
    const bar = document.querySelector(".announcement-bar");
    const prevBtn = document.querySelector(".slider-button--prev");
    const nextBtn = document.querySelector(".slider-button--next");
    return {
      text: msg ? msg.innerText : null,
      fontSize: msg ? window.getComputedStyle(msg).fontSize : null,
      fontWeight: msg ? window.getComputedStyle(msg).fontWeight : null,
      color: msg ? window.getComputedStyle(msg).color : null,
      letterSpacing: msg ? window.getComputedStyle(msg).letterSpacing : null,
      height: bar ? bar.getBoundingClientRect().height : null,
      buttonsExist: !!(prevBtn && nextBtn),
    };
  });

  const sec2_details_local = await localPage.evaluate(() => {
    const msg = document.querySelector(".announcement-bar__message span");
    const bar = document.querySelector(".announcement-bar");
    const prevBtn = document.querySelector(".slider-button--prev");
    const nextBtn = document.querySelector(".slider-button--next");
    return {
      text: msg ? msg.innerText : null,
      fontSize: msg ? window.getComputedStyle(msg).fontSize : null,
      fontWeight: msg ? window.getComputedStyle(msg).fontWeight : null,
      color: msg ? window.getComputedStyle(msg).color : null,
      letterSpacing: msg ? window.getComputedStyle(msg).letterSpacing : null,
      height: bar ? bar.getBoundingClientRect().height : null,
      buttonsExist: !!(prevBtn && nextBtn),
    };
  });

  const report = {
    section1: {
      metrics_live: metrics1_live,
      metrics_local: metrics1_local,
      child_live: sec1_child_live,
      child_local: sec1_child_local,
    },
    section2: {
      metrics_live: metrics2_live,
      metrics_local: metrics2_local,
      details_live: sec2_details_live,
      details_local: sec2_details_local,
    }
  };

  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})();
