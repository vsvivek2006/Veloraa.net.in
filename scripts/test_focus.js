const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const input = await page.$("#NewsletterForm--footer");
  await input.fill("test@example.com");
  await page.waitForTimeout(500);

  const el = await page.$(".footer-block__newsletter");
  if (el) {
    await el.screenshot({ path: "C:/Users/kk701/.gemini/antigravity-ide/brain/c1d7e04a-f6a7-4338-84b9-7dfe1bf5fb1d/newsletter_local_focused.png" });
  }

  console.log("Captured focused newsletter input!");
  await browser.close();
})();
