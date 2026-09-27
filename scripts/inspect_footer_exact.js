const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("https://www.veloraa.co.in/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  const footerData = await page.evaluate(() => {
    const footer = document.querySelector("footer");
    if (!footer) return null;

    const getStyles = (el) => {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        className: el.className,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        color: cs.color,
        letterSpacing: cs.letterSpacing,
        lineHeight: cs.lineHeight,
        margin: cs.margin,
        padding: cs.padding,
        backgroundColor: cs.backgroundColor,
        textAlign: cs.textAlign,
        display: cs.display,
        justifyContent: cs.justifyContent,
        alignItems: cs.alignItems,
        gap: cs.gap,
        borderTop: cs.borderTop,
      };
    };

    const footerStyles = getStyles(footer);
    const contentTop = getStyles(footer.querySelector(".footer__content-top"));
    const menuUl = getStyles(footer.querySelector(".footer-block__details-content"));
    const menuLi = getStyles(footer.querySelector(".footer-block__details-content li"));
    const menuLink = getStyles(footer.querySelector(".footer-block__details-content a"));
    
    const newsletterBlock = getStyles(footer.querySelector(".footer-block--newsletter"));
    const newsletterHeading = getStyles(footer.querySelector(".footer-block__heading"));
    const newsletterForm = getStyles(footer.querySelector(".newsletter-form"));
    const fieldInput = getStyles(footer.querySelector(".field__input"));
    const fieldButton = getStyles(footer.querySelector(".field__button"));

    const contentBottom = getStyles(footer.querySelector(".footer__content-bottom"));
    const bottomWrapper = getStyles(footer.querySelector(".footer__content-bottom-wrapper"));
    const copyright = getStyles(footer.querySelector(".footer__copyright"));
    const copyrightLink = getStyles(footer.querySelector(".footer__copyright a"));
    const policiesUl = getStyles(footer.querySelector(".policies"));
    const policiesLi = getStyles(footer.querySelector(".policies li"));
    const policiesLink = getStyles(footer.querySelector(".policies a"));

    return {
      footerStyles,
      contentTop,
      menuUl,
      menuLi,
      menuLink,
      newsletterBlock,
      newsletterHeading,
      newsletterForm,
      fieldInput,
      fieldButton,
      contentBottom,
      bottomWrapper,
      copyright,
      copyrightLink,
      policiesUl,
      policiesLi,
      policiesLink,
    };
  });

  console.log(JSON.stringify(footerData, null, 2));
  await browser.close();
})();
