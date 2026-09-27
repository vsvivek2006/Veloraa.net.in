const fs = require('fs');
const sec9 = fs.readFileSync('d:/valorex/scripts/sec9_live.html', 'utf8');

const styleMatch = sec9.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  console.log('FAQ Style:', styleMatch[1].slice(0, 1500));
}

// Find all questions
const qRegex = /class="veloraa-faq-question"[^>]*>([\s\S]*?)<\/button>/g;
let qm;
const questions = [];
while ((qm = qRegex.exec(sec9)) !== null) {
  const span = qm[1].match(/<span>(.*?)<\/span>/);
  if (span) questions.push(span[1]);
}
console.log('Total FAQ questions:', questions.length);
questions.forEach((q, idx) => console.log(`${idx + 1}. ${q}`));
