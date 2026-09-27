const fs = require('fs');

const html = fs.readFileSync('scripts/live_collection_frontpage.html', 'utf8');

const regex = /<h3 class="card__heading[^"]*"[^>]*>\s*<a href="\/products\/([^"?]+)[^"]*"[^>]*>([\s\S]*?)<\/a>/g;
let match;
const products = [];
while ((match = regex.exec(html)) !== null) {
  const handle = match[1];
  const title = match[2].trim().replace(/\s+/g, ' ');
  
  // Find review count and rating after this heading
  const chunk = html.slice(match.index, match.index + 2000);
  const reviewMatch = chunk.match(/data-review-num="(\d+)"[^>]*rating="([^"]+)"/);
  const reviews = reviewMatch ? reviewMatch[1] : null;
  const rating = reviewMatch ? reviewMatch[2] : null;

  products.push({ handle, title, reviews, rating });
}

console.log('Collection frontpage products:', JSON.stringify(products, null, 2));
