const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await livePage.waitForTimeout(2000);

  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await localPage.waitForTimeout(2000);

  // Measure Section 3: Header / Navbar
  const getHeaderMetrics = (page) => page.evaluate(() => {
    const headerWrapper = document.querySelector('.header-wrapper');
    const header = document.querySelector('header.header');
    const logo = document.querySelector('.header__heading-logo');
    const menuItems = Array.from(document.querySelectorAll('.list-menu--inline .list-menu__item'));
    const icons = Array.from(document.querySelectorAll('.header__icons a, .header__icons button'));

    return {
      wrapper: {
        rect: headerWrapper ? headerWrapper.getBoundingClientRect() : null,
        position: headerWrapper ? window.getComputedStyle(headerWrapper).position : null,
        bg: headerWrapper ? window.getComputedStyle(headerWrapper).backgroundColor : null
      },
      header: {
        rect: header ? header.getBoundingClientRect() : null,
        padding: header ? window.getComputedStyle(header).padding : null,
        display: header ? window.getComputedStyle(header).display : null,
        gridTemplateColumns: header ? window.getComputedStyle(header).gridTemplateColumns : null
      },
      logo: logo ? {
        rect: logo.getBoundingClientRect(),
        width: window.getComputedStyle(logo).width,
        height: window.getComputedStyle(logo).height
      } : null,
      menuLinksCount: menuItems.length,
      menuLinksSample: menuItems.slice(0, 3).map(m => ({
        text: m.innerText.trim(),
        fontSize: window.getComputedStyle(m).fontSize,
        fontWeight: window.getComputedStyle(m).fontWeight,
        color: window.getComputedStyle(m).color,
        letterSpacing: window.getComputedStyle(m).letterSpacing,
        padding: window.getComputedStyle(m).padding
      })),
      iconsCount: icons.length
    };
  });

  const sec3Live = await getHeaderMetrics(livePage);
  const sec3Local = await getHeaderMetrics(localPage);

  console.log('=== SECTION 3 (HEADER) LIVE VS LOCAL ===');
  console.log('LIVE:', JSON.stringify(sec3Live, null, 2));
  console.log('LOCAL:', JSON.stringify(sec3Local, null, 2));

  // Screenshots of header
  const liveH = await livePage.$('.header-wrapper');
  if (liveH) await liveH.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/sec3_live_audit.png' });

  const localH = await localPage.$('.header-wrapper');
  if (localH) await localH.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/sec3_local_audit.png' });

  await browser.close();
})();
