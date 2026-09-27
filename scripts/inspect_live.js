const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("https://www.veloraa.co.in", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const results = {};

    // 1. Countdown bar exact styles
    const gta = document.querySelector(".gta-bar, .GSC-BAR-SPbbFrxoIbbs");
    if (gta) {
      const r = gta.getBoundingClientRect();
      const s = getComputedStyle(gta);
      results.countdown = { h: r.height, padding: s.padding, bg: s.backgroundColor };
      
      // timer numbers
      const timerNums = gta.querySelectorAll("foreignObject .gta-timer__unit-number, [class*='timer'] span");
      if (timerNums.length > 0) {
        const sn = getComputedStyle(timerNums[0]);
        results.timer_number = { fontSize: sn.fontSize, fontWeight: sn.fontWeight, color: sn.color };
      }
    }

    // 2. Hamburger button - is it visible at 1440px?
    const hamburger = document.querySelector("header-drawer, .mobile-drawer-btn, [class*='header-drawer']");
    results.hamburger_exists = !!hamburger;
    if (hamburger) {
      const s = getComputedStyle(hamburger);
      results.hamburger_display = s.display;
    }

    // 3. Exact header structure
    const header = document.querySelector("header");
    if (header) {
      const r = header.getBoundingClientRect();
      const s = getComputedStyle(header);
      results.header = { h: r.height, padding: s.padding, display: s.display };
    }

    // 4. Nav rows - how many rows?
    const nav = document.querySelector(".header__inline-menu");
    if (nav) {
      const r = nav.getBoundingClientRect();
      results.nav = { h: r.height, display: getComputedStyle(nav).display };
    }

    // 5. Product card exact
    const card = document.querySelector(".card-wrapper");
    if (card) {
      const r = card.getBoundingClientRect();
      results.card = { h: r.height, w: r.width };
      const media = card.querySelector(".card__media, .media");
      if (media) {
        const mr = media.getBoundingClientRect();
        const ms = getComputedStyle(media);
        results.card_media = { h: mr.height, paddingBottom: ms.paddingBottom, aspectRatio: ms.aspectRatio };
      }
    }

    return results;
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
