const fs = require('fs');
const sec1 = fs.readFileSync('d:/valorex/sec1_live.html', 'utf8');

const sMatch = sec1.match(/<ul id="Slider-Gallery-[^"]*"[^>]*>([\s\S]*?)<\/ul>/);
if (sMatch) {
  console.log('Slider-Gallery length:', sMatch[0].length);
  const items = [...sMatch[0].matchAll(/<li[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/li>/g)];
  console.log('Total items in Slider-Gallery:', items.length);
  items.slice(0, 3).forEach((it, idx) => {
    console.log(`\n--- Item ${idx} class: ${it[1]} ---`);
    console.log(it[2].slice(0, 300));
  });
}
