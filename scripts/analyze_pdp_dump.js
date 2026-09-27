const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/pdp_sections_dump_part2.json', 'utf8'));

console.log('--- S7 Trustoo reviews info ---');
const s7 = data.s7Html;
const countGrid = (s7.match(/grid-review/g) || []).length;
console.log('grid-review occurrences:', countGrid);

console.log('--- S8 You May Also Like ---');
const s8 = data.s8Html;
const countProducts = (s8.match(/card-wrapper/g) || s8.match(/grid__item/g) || []).length;
console.log('S8 items count:', countProducts);

console.log('--- S9 FAQ Section ---');
const s9 = data.s9Html;
const countFaqs = (s9.match(/veloraa-faq-item/g) || s9.match(/faq-question/g) || s9.match(/summary/g) || []).length;
console.log('S9 FAQs count:', countFaqs);
