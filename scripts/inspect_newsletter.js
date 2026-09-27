const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto("https://www.veloraa.co.in/", { waitUntil: "domcontentloaded" });
  await livePage.waitForTimeout(3000);

  const liveData = await livePage.evaluate(() => {
    const form = document.querySelector(".footer-block__newsletter") || document.querySelector(".footer__newsletter");
    const input = document.querySelector(".footer__newsletter input") || document.querySelector(".newsletter-form input");
    const label = document.querySelector(".footer__newsletter label") || document.querySelector(".newsletter-form label");
    const btn = document.querySelector(".footer__newsletter button") || document.querySelector(".newsletter-form button");
    const field = document.querySelector(".field") || document.querySelector(".newsletter-form__field-wrapper");

    const getComp = (el) => {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        html: el.outerHTML,
        width: cs.width,
        height: cs.height,
        boxSizing: cs.boxSizing,
        margin: cs.margin,
        padding: cs.padding,
        border: cs.border,
        borderRadius: cs.borderRadius,
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        position: cs.position,
        top: cs.top,
        left: cs.left,
        right: cs.right,
        bottom: cs.bottom,
        display: cs.display,
        outline: cs.outline,
        boxShadow: cs.boxShadow,
      };
    };

    return {
      formOuter: form ? form.outerHTML : null,
      field: getComp(field),
      input: getComp(input),
      label: getComp(label),
      btn: getComp(btn)
    };
  });

  // Capture screenshot of live newsletter form
  const liveFormEl = await livePage.$(".footer__newsletter, .footer-block__newsletter");
  if (liveFormEl) {
    await liveFormEl.screenshot({ path: "C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/newsletter_live.png" });
  }

  // Now capture local newsletter form
  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await localPage.waitForTimeout(2000);

  const localFormEl = await localPage.$(".footer__newsletter, .footer-block__newsletter");
  if (localFormEl) {
    await localFormEl.screenshot({ path: "C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/newsletter_local.png" });
  }

  console.log("=== LIVE NEWSLETTER SPECS ===");
  console.log(JSON.stringify(liveData, null, 2));

  await browser.close();
})();
