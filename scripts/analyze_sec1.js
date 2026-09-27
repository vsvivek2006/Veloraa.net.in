const fs = require('fs');
const sec1 = fs.readFileSync('d:/valorex/sec1_live.html', 'utf8');

const cheerio = require('cheerio');
const $ = cheerio.load(sec1);

console.log('Main section classes:', $('section').attr('class'));
console.log('Media gallery classes:', $('media-gallery').attr('class'));
console.log('Product info container:', $('.product__info-container').attr('class'));

$('.product__info-container > *').each((i, el) => {
  const tag = el.tagName;
  const cls = $(el).attr('class') || '';
  const id = $(el).attr('id') || '';
  const textSnippet = $(el).text().replace(/\s+/g, ' ').trim().slice(0, 80);
  console.log(`[${i}] <${tag} class='${cls}' id='${id}'>: ${textSnippet}`);
});
