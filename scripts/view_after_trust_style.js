const fs = require('fs');
const html = fs.readFileSync('sec1_live.html', 'utf8');
const idx = html.indexOf('</style>', html.indexOf('veloraa-trust-section'));
console.log(html.slice(idx, idx + 4000));
