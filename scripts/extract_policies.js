const fs = require('fs');

const policies = [
  'refund-policy',
  'privacy-policy',
  'terms-of-service',
  'shipping-policy',
  'contact-information'
];

const extracted = {};

for (const p of policies) {
  const file = 'scripts/live_policy_' + p + '.html';
  if (fs.existsSync(file)) {
    const html = fs.readFileSync(file, 'utf8');
    const titleMatch = html.match(/<h1>(.*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1].trim() : p;
    
    // Find shopify-policy__body
    const bodyStart = html.indexOf('<div class="shopify-policy__body">');
    let bodyHtml = '';
    if (bodyStart !== -1) {
      bodyHtml = html.slice(bodyStart + '<div class="shopify-policy__body">'.length);
      const bodyEnd = bodyHtml.lastIndexOf('</div>');
      if (bodyEnd !== -1) {
        bodyHtml = bodyHtml.slice(0, bodyEnd);
      }
    }

    extracted[p] = {
      title,
      htmlLength: bodyHtml.length,
      preview: bodyHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 150)
    };
    fs.writeFileSync('scripts/policy_' + p + '_body.html', bodyHtml);
  }
}

console.log(JSON.stringify(extracted, null, 2));
