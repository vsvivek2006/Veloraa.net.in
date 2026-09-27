const { chromium } = require("playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("https://www.veloraa.co.in", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3000);

  const html = await page.evaluate(() => {
    const bar = document.querySelector(".gta-bar");
    return bar ? bar.innerHTML.substring(0, 3000) : "not found";
  });
  console.log(html);
  await browser.close();
}
run().catch(e => { console.error(e.message); process.exit(1); });
