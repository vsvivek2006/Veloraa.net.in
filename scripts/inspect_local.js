const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const results = {};

    const gta = document.querySelector(".gta-bar, .gta-widget");
    if (gta) {
      const r = gta.getBoundingClientRect();
      const s = getComputedStyle(gta);
      results.countdown = { h: r.height, padding: s.padding, bg: s.backgroundColor };
    }

    const hamburger = document.querySelector(".mobile-drawer-btn");
    results.hamburger_exists = !!hamburger;
    if (hamburger) {
      const s = getComputedStyle(hamburger);
      results.hamburger_display = s.display;
    }

    const header = document.querySelector("header");
    if (header) {
      const r = header.getBoundingClientRect();
      const s = getComputedStyle(header);
      results.header = { h: r.height, padding: s.padding, display: s.display };
    }

    const nav = document.querySelector(".header__inline-menu");
    if (nav) {
      const r = nav.getBoundingClientRect();
      results.nav = { h: r.height, display: getComputedStyle(nav).display };
    }

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
      // check img inside
      const img = card.querySelector("img");
      if (img) {
        const ir = img.getBoundingClientRect();
        results.card_img = { h: ir.height, w: ir.width, src: img.src.substring(0,80) };
      }
    }

    return results;
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
