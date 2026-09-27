const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await livePage.waitForTimeout(2000);

  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await localPage.waitForTimeout(2000);

  const getHeroMetrics = (page) => page.evaluate(() => {
    // First banner
    const banner = document.querySelectorAll('.banner')[0];
    const img = banner ? banner.querySelector('img') : null;
    return {
      bannerRect: banner ? banner.getBoundingClientRect() : null,
      imgRect: img ? img.getBoundingClientRect() : null,
      imgSrc: img ? img.src : null,
      imgNaturalWidth: img ? img.naturalWidth : null,
      imgNaturalHeight: img ? img.naturalHeight : null,
      objectFit: img ? window.getComputedStyle(img).objectFit : null
    };
  });

  const sec4Live = await getHeroMetrics(livePage);
  const sec4Local = await getHeroMetrics(localPage);

  console.log('=== SECTION 4 (HERO BANNER) LIVE VS LOCAL ===');
  console.log('LIVE:', JSON.stringify(sec4Live, null, 2));
  console.log('LOCAL:', JSON.stringify(sec4Local, null, 2));

  // Screenshots of Hero
  const liveHero = await livePage.$('.banner');
  if (liveHero) await liveHero.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/sec4_live_audit.png' });

  const localHero = await localPage.$('.banner');
  if (localHero) await localHero.screenshot({ path: 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/sec4_local_audit.png' });

  await browser.close();
})();
