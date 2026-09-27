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

  const sel3 = "header.header";

  const getHeaderSpecs = async (page) => {
    return await page.evaluate(() => {
      const header = document.querySelector("header.header");
      const wrapper = document.querySelector(".header-wrapper");
      const logo = document.querySelector(".header__heading-logo, .header__heading img");
      const links = Array.from(document.querySelectorAll(".header__inline-menu a, .header__menu-item")).map(a => ({
        text: a.innerText.trim(),
        href: a.getAttribute("href"),
        fontSize: window.getComputedStyle(a).fontSize,
        fontWeight: window.getComputedStyle(a).fontWeight,
        color: window.getComputedStyle(a).color,
        letterSpacing: window.getComputedStyle(a).letterSpacing,
      }));
      const icons = Array.from(document.querySelectorAll(".header__icons a, .header__icon")).map(i => ({
        tag: i.tagName,
        ariaLabel: i.getAttribute("aria-label"),
        width: i.getBoundingClientRect().width,
        height: i.getBoundingClientRect().height,
      }));
      return {
        headerRect: header ? header.getBoundingClientRect() : null,
        headerPadding: header ? window.getComputedStyle(header).padding : null,
        wrapperBg: wrapper ? window.getComputedStyle(wrapper).backgroundColor : null,
        logoRect: logo ? logo.getBoundingClientRect() : null,
        logoSrc: logo ? logo.src : null,
        linksCount: links.length,
        linksSample: links.slice(0, 5),
        icons,
      };
    });
  };

  const liveHeader = await getHeaderSpecs(livePage);
  const localHeader = await getHeaderSpecs(localPage);

  const el3_live = await livePage.$("header.header, .header-wrapper");
  if (el3_live) await el3_live.screenshot({ path: path.join(ARTIFACTS_DIR, "sec3_header_live.png") });

  const el3_local = await localPage.$("header.header, .header-wrapper");
  if (el3_local) await el3_local.screenshot({ path: path.join(ARTIFACTS_DIR, "sec3_header_local.png") });

  console.log("=== SECTION 3: HEADER AUDIT ===");
  console.log("LIVE:", JSON.stringify(liveHeader, null, 2));
  console.log("LOCAL:", JSON.stringify(localHeader, null, 2));

  await browser.close();
})();
