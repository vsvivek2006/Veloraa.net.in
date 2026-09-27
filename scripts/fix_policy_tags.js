const fs = require('fs');

let content = fs.readFileSync('src/data/policies.ts', 'utf8');

const { POLICIES } = require('./src/data/policies.ts');

function fixHtml(rawHtml) {
  let html = rawHtml;
  // While html ends with </div> (ignoring whitespace), check if it's dangling
  const voids = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
  
  while (true) {
    const stack = [];
    const regex = /<\/?([a-z0-9]+)[^>]*>/gi;
    let match;
    let hasDanglingClose = false;
    while ((match = regex.exec(html)) !== null) {
      const full = match[0];
      const tag = match[1].toLowerCase();
      if (voids.has(tag)) continue;
      if (full.startsWith('</')) {
        const last = stack.pop();
        if (last !== tag) {
          hasDanglingClose = true;
          break;
        }
      } else if (!full.endsWith('/>')) {
        stack.push(tag);
      }
    }
    
    if (hasDanglingClose) {
      // Find the last closing tag and remove it
      const lastCloseIndex = html.lastIndexOf('</');
      if (lastCloseIndex !== -1) {
        const closeEnd = html.indexOf('>', lastCloseIndex);
        if (closeEnd !== -1) {
          html = html.slice(0, lastCloseIndex) + html.slice(closeEnd + 1);
          continue;
        }
      }
    }
    break;
  }
  return html.trim();
}

for (const [key, pol] of Object.entries(POLICIES)) {
  const cleaned = fixHtml(pol.html);
  // Replace in content
  // We can locate pol.html in content
  content = content.replace(pol.html, cleaned);
}

fs.writeFileSync('src/data/policies.ts', content, 'utf8');
console.log('Finished fixing policy tags!');
