const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    isMobile: true,
    hasTouch: true,
  });

  const routes = [
    { name: 'home', path: '/' },
    { name: 'pdp', path: '/products/5-in-1-bundle' },
    { name: 'collection', path: '/collections/frontpage' },
    { name: 'contact', path: '/pages/contact-us' },
    { name: 'policy', path: '/policies/refund-policy' }
  ];

  for (const r of routes) {
    console.log(`Checking ${r.name} on mobile...`);
    
    // 1. Live page
    const pLive = await mobileContext.newPage();
    const liveUrl = 'https://www.veloraa.co.in' + r.path;
    await pLive.goto(liveUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await pLive.waitForTimeout(2000);
    await pLive.screenshot({ path: `mobile_live_${r.name}.png`, fullPage: false });
    
    // 2. Local page
    const pLocal = await mobileContext.newPage();
    const localUrl = 'http://localhost:3000' + r.path;
    await pLocal.goto(localUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await pLocal.waitForTimeout(2000);
    await pLocal.screenshot({ path: `mobile_local_${r.name}.png`, fullPage: false });

    // Copy to brain artifacts
    fs.copyFileSync(`mobile_live_${r.name}.png`, `C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/mobile_live_${r.name}.png`);
    fs.copyFileSync(`mobile_local_${r.name}.png`, `C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/mobile_local_${r.name}.png`);

    await pLive.close();
    await pLocal.close();
  }

  // Also specifically inspect PDP sections on mobile (trust badges, influencer section, etc.)
  const pLocalPdp = await mobileContext.newPage();
  await pLocalPdp.goto('http://localhost:3000/products/5-in-1-bundle', { waitUntil: 'domcontentloaded' });
  await pLocalPdp.waitForTimeout(2000);

  // Trust section screenshot on mobile
  const trustSection = await pLocalPdp.locator('.veloraa-trust-section').first();
  if (await trustSection.count() > 0) {
    await trustSection.screenshot({ path: 'mobile_local_trust_section.png' });
    fs.copyFileSync('mobile_local_trust_section.png', 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/mobile_local_trust_section.png');
    const box = await trustSection.boundingBox();
    console.log('Mobile local trust section bounding box:', box);
  }

  // Influencer section screenshot on mobile
  const influencerSection = await pLocalPdp.locator('.veloraa-video-section').first();
  if (await influencerSection.count() > 0) {
    await influencerSection.screenshot({ path: 'mobile_local_influencer_section.png' });
    fs.copyFileSync('mobile_local_influencer_section.png', 'C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/mobile_local_influencer_section.png');
  }

  await pLocalPdp.close();
  await browser.close();
  console.log('Mobile checks finished successfully!');
})();
