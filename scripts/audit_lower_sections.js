const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  
  const livePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await livePage.goto('https://www.veloraa.co.in/', { waitUntil: 'domcontentloaded' });
  await livePage.waitForTimeout(3000);

  const localPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await localPage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await localPage.waitForTimeout(2000);

  // Section 5: Products Grid
  const getProductsMetrics = (page) => page.evaluate(() => {
    const heading = document.querySelector('.title-wrapper-with-link .title, .collection__title .title');
    const grid = document.querySelector('.product-grid');
    const cards = Array.from(document.querySelectorAll('.card-wrapper'));
    const firstCard = cards[0];
    const firstImg = firstCard ? firstCard.querySelector('.media img') : null;
    const saleBadge = firstCard ? firstCard.querySelector('.badge') : null;
    const priceRegular = firstCard ? firstCard.querySelector('.price-item--regular') : null;
    const priceSale = firstCard ? firstCard.querySelector('.price-item--sale') : null;

    return {
      heading: heading ? {
        text: heading.innerText.trim(),
        fontSize: window.getComputedStyle(heading).fontSize,
        fontWeight: window.getComputedStyle(heading).fontWeight,
        color: window.getComputedStyle(heading).color
      } : null,
      cardsCount: cards.length,
      cardWidth: firstCard ? firstCard.getBoundingClientRect().width : null,
      imageCountPerCard: firstCard ? firstCard.querySelectorAll('.media img').length : 0,
      badgeText: saleBadge ? saleBadge.innerText.trim() : null,
      regularPrice: priceRegular ? priceRegular.innerText.trim() : null,
      salePrice: priceSale ? priceSale.innerText.trim() : null
    };
  });

  const sec5Live = await getProductsMetrics(livePage);
  const sec5Local = await getProductsMetrics(localPage);

  // Section 6: Secondary Banner
  const getSec6Metrics = (page) => page.evaluate(() => {
    const banners = Array.from(document.querySelectorAll('.banner'));
    const banner = banners[1] || banners[banners.length - 1];
    const img = banner ? banner.querySelector('img') : null;
    return {
      bannerRect: banner ? banner.getBoundingClientRect() : null,
      imgRect: img ? img.getBoundingClientRect() : null,
      imgSrc: img ? img.src : null
    };
  });

  const sec6Live = await getSec6Metrics(livePage);
  const sec6Local = await getSec6Metrics(localPage);

  // Section 7: Footer
  const getFooterMetrics = (page) => page.evaluate(() => {
    const footer = document.querySelector('footer.footer');
    const input = footer ? footer.querySelector('.field__input') : null;
    const label = footer ? footer.querySelector('.field__label') : null;
    const submitBtn = footer ? footer.querySelector('.newsletter-form__button') : null;
    const links = footer ? Array.from(footer.querySelectorAll('.list-menu__item--link')).map(l => l.innerText.trim()) : [];
    const copyright = footer ? footer.querySelector('.footer__copyright')?.innerText?.trim() : null;

    return {
      footerRect: footer ? footer.getBoundingClientRect() : null,
      footerBg: footer ? window.getComputedStyle(footer).backgroundColor : null,
      inputBorderShadow: input ? window.getComputedStyle(input.parentElement, '::after').boxShadow : null,
      labelText: label ? label.innerText.trim() : null,
      submitBtnExists: !!submitBtn,
      linksCount: links.length,
      links: links,
      copyright: copyright
    };
  });

  const sec7Live = await getFooterMetrics(livePage);
  const sec7Local = await getFooterMetrics(localPage);

  console.log('=== SECTION 5 (PRODUCTS GRID) ===');
  console.log('LIVE:', JSON.stringify(sec5Live, null, 2));
  console.log('LOCAL:', JSON.stringify(sec5Local, null, 2));

  console.log('=== SECTION 6 (SECONDARY BANNER) ===');
  console.log('LIVE:', JSON.stringify(sec6Live, null, 2));
  console.log('LOCAL:', JSON.stringify(sec6Local, null, 2));

  console.log('=== SECTION 7 (FOOTER) ===');
  console.log('LIVE:', JSON.stringify(sec7Live, null, 2));
  console.log('LOCAL:', JSON.stringify(sec7Local, null, 2));

  await browser.close();
})();
