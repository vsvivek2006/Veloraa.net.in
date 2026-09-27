const fs = require('fs');

let content = fs.readFileSync('src/data/policies.ts', 'utf8');

content = content.replace(/html:\s*`([\s\S]*?)`/g, (match, raw) => {
  let s = raw.replace(/^(\s*<div[^>]*>\s*)+/i, '');
  s = s.replace(/(\s*<\/div>\s*)+$/i, '');
  return 'html: `' + s.trim() + '`';
});

fs.writeFileSync('src/data/policies.ts', content, 'utf8');
console.log('src/data/policies.ts cleaned successfully!');
