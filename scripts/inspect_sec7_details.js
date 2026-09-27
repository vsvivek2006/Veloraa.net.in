const fs = require('fs');
const sec7 = fs.readFileSync('d:/valorex/scripts/sec7_live.html', 'utf8');

const reviewsMatch = sec7.match(/class="[^"]*review-item[^"]*"/g) || [];
console.log('Total review-item in live sec7:', reviewsMatch.length);

const items = sec7.match(/class="[^"]*comment-item[^"]*"/g) || [];
console.log('Total comment-item in live sec7:', items.length);

const re = /<div class="user-name">([^<]+)<\/div>/g;
let m;
const authors = [];
while ((m = re.exec(sec7)) !== null) {
  authors.push(m[1].trim());
}
console.log('Authors in live sec7:', authors.length, authors.slice(0, 10));
