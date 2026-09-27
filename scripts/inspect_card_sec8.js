const fs = require('fs');
const sec8 = fs.readFileSync('d:/valorex/scripts/sec8_live.html', 'utf8');

const cardMatch = sec8.match(/<li id="Slide-[^"]*"[^>]*>([\s\S]*?)<\/li>/);
if (cardMatch) {
  console.log('Card snippet:');
  console.log(cardMatch[0].slice(0, 1200));
}
