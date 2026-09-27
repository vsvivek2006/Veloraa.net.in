const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("https://www.veloraa.co.in/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  // 1. Inspect TopCountdownBar exact HTML & computed CSS
  const countdownDetails = await page.evaluate(() => {
    const bar = document.querySelector(".gta-widget.gta-bar");
    if (!bar) return null;
    const text = bar.querySelector(".gta-content__text");
    const timerWrapper = bar.querySelector(".gta-timer__wrapper");
    const units = Array.from(bar.querySelectorAll(".gta-timer__unit")).map(u => ({
      valText: u.querySelector(".gta-timer__unit-value")?.innerText,
      valSize: window.getComputedStyle(u.querySelector(".gta-timer__unit-value")).fontSize,
      valWeight: window.getComputedStyle(u.querySelector(".gta-timer__unit-value")).fontWeight,
      valColor: window.getComputedStyle(u.querySelector(".gta-timer__unit-value")).color,
      lblText: u.querySelector(".gta-timer__unit-label")?.innerText,
      lblSize: window.getComputedStyle(u.querySelector(".gta-timer__unit-label")).fontSize,
      lblWeight: window.getComputedStyle(u.querySelector(".gta-timer__unit-label")).fontWeight,
      lblColor: window.getComputedStyle(u.querySelector(".gta-timer__unit-label")).color,
    }));
    const seps = Array.from(bar.querySelectorAll(".gta-timer__separator")).map(s => ({
      text: s.innerText,
      size: window.getComputedStyle(s).fontSize,
      color: window.getComputedStyle(s).color,
      font: window.getComputedStyle(s).fontFamily
    }));
    return {
      barHeight: bar.getBoundingClientRect().height,
      barBg: window.getComputedStyle(bar.querySelector(".gta-content__container") || bar).backgroundColor,
      textStyle: text ? {
        text: text.innerText,
        fontFamily: window.getComputedStyle(text).fontFamily,
        fontSize: window.getComputedStyle(text).fontSize,
        fontWeight: window.getComputedStyle(text).fontWeight,
        color: window.getComputedStyle(text).color,
        letterSpacing: window.getComputedStyle(text).letterSpacing,
      } : null,
      units,
      seps,
      rawHtml: bar.outerHTML.slice(0, 4000)
    };
  });

  // 2. Check Header sticky behavior on scroll
  const scrollTestLive = await page.evaluate(async () => {
    const header = document.querySelector("header") || document.querySelector(".header-wrapper");
    const initialPos = header ? window.getComputedStyle(header).position : null;
    const initialTop = header ? header.getBoundingClientRect().top : null;

    // Scroll down 600px
    window.scrollTo(0, 600);
    await new Promise(r => setTimeout(r, 500));

    const scrolledPos = header ? window.getComputedStyle(header).position : null;
    const scrolledTop = header ? header.getBoundingClientRect().top : null;
    const isVisibleInViewport = header ? (header.getBoundingClientRect().bottom > 0 && header.getBoundingClientRect().top < window.innerHeight) : false;

    // Scroll back to top
    window.scrollTo(0, 0);

    return {
      initialPos,
      initialTop,
      scrolledPos,
      scrolledTop,
      isVisibleInViewport
    };
  });

  // 3. Inspect Animations and Transitions
  const animations = await page.evaluate(() => {
    // Check scroll-trigger elements
    const scrollTriggers = Array.from(document.querySelectorAll("[class*='animate'], [class*='scroll-trigger']")).map(el => ({
      tag: el.tagName,
      className: el.className,
      animationName: window.getComputedStyle(el).animationName,
      transition: window.getComputedStyle(el).transition,
    })).slice(0, 15);

    // Check card hover transitions
    const card = document.querySelector(".card-wrapper");
    const cardImage = document.querySelector(".card__media img");
    return {
      scrollTriggers,
      cardWrapperTransition: card ? window.getComputedStyle(card).transition : null,
      cardImageTransition: cardImage ? window.getComputedStyle(cardImage).transition : null,
      cardImageTransform: cardImage ? window.getComputedStyle(cardImage).transform : null
    };
  });

  console.log("=== 1. COUNTDOWN DETAILS ===");
  console.log(JSON.stringify(countdownDetails, null, 2).slice(0, 2000));

  console.log("\n=== 2. HEADER SCROLL TEST (LIVE) ===");
  console.log(JSON.stringify(scrollTestLive, null, 2));

  console.log("\n=== 3. ANIMATIONS ===");
  console.log(JSON.stringify(animations, null, 2));

  await browser.close();
})();
