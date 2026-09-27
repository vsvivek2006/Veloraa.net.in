const fs = require('fs');

const policies = [
  'refund-policy',
  'privacy-policy',
  'terms-of-service',
  'shipping-policy',
  'contact-information'
];

const titles = {
  'refund-policy': 'Refund policy',
  'privacy-policy': 'Privacy policy',
  'terms-of-service': 'Terms of service',
  'shipping-policy': 'Shipping policy',
  'contact-information': 'Contact information'
};

const voids = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

const policyData = {};

for (const p of policies) {
  let content = fs.readFileSync('scripts/policy_' + p + '_body.html', 'utf8');

  // Strip leading outer wrapper tags
  content = content.replace(/^(\s*<div[^>]*>\s*)+/i, '');

  // Repeatedly remove any dangling tags until fully valid
  while (true) {
    const stack = [];
    const regex = /<\/?([a-z0-9]+)[^>]*>/gi;
    let match;
    let danglingPos = -1;
    let danglingEnd = -1;
    while ((match = regex.exec(content)) !== null) {
      const full = match[0];
      const tag = match[1].toLowerCase();
      if (voids.has(tag)) continue;
      if (full.startsWith('</')) {
        const last = stack.pop();
        if (last !== tag) {
          danglingPos = match.index;
          danglingEnd = match.index + full.length;
          break;
        }
      } else if (!full.endsWith('/>')) {
        stack.push(tag);
      }
    }
    if (danglingPos !== -1) {
      content = content.slice(0, danglingPos) + content.slice(danglingEnd);
    } else {
      break;
    }
  }

  content = content.trim();

  policyData[p] = {
    title: titles[p],
    html: content
  };
}

const fileContent = `// src/data/policies.ts
// Exact policy content matching Veloraa live site

export interface PolicyData {
  title: string;
  html: string;
}

export const POLICIES: Record<string, PolicyData> = ${JSON.stringify(policyData, null, 2)};
`;

fs.writeFileSync('src/data/policies.ts', fileContent, 'utf8');
console.log('Successfully written clean src/data/policies.ts');
