const fs = require('fs');

const sec8 = fs.readFileSync('d:/valorex/scripts/sec8_live.html', 'utf8');
const titles8 = [];
const re8 = /<h3 class="card__heading[^"]*">([\s\S]*?)<\/h3>/g;
let m8;
while ((m8 = re8.exec(sec8)) !== null) {
  const text = m8[1].replace(/<[^>]+>/g, '').trim();
  titles8.push(text);
}
console.log('Section 8 (You may also like) items:', titles8);

const sec9 = fs.readFileSync('d:/valorex/scripts/sec9_live.html', 'utf8');
console.log('Section 9 (FAQ) length:', sec9.length);
console.log(sec9.slice(0, 1500));
