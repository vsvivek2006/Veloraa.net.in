const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/pdp_sections_dump_part2.json', 'utf8'));

const s9 = data.s9Html;
const items = s9.split('<div class="veloraa-faq-item">').slice(1);

const parsed = items.map((item, idx) => {
  const qMatch = item.match(/<button[^>]*>[\s\S]*?<span>([\s\S]*?)<\/span>/i);
  const q = qMatch ? qMatch[1].trim() : '';

  const aMatch = item.match(/<div class="veloraa-faq-answer">([\s\S]*?)<\/div>\s*<\/div>/i);
  const a = aMatch ? aMatch[1].trim() : '';

  return { id: idx + 1, q, a };
});

fs.writeFileSync('src/data/live_pdp_faqs.json', JSON.stringify(parsed, null, 2));
console.log('Saved', parsed.length, 'exact FAQs to src/data/live_pdp_faqs.json');
parsed.forEach(p => console.log(`${p.id}. ${p.q}`));
