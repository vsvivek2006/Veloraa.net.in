const fs = require('fs');
const html = fs.readFileSync('scripts/live_vstar_modal.html', 'utf8');
const parts = html.split('class="grid-review');
console.log('parts.length:', parts.length);

const reviews = [];
for (let i = 1; i < parts.length; i++) {
  const p = parts[i];
  const authorMatch = p.match(/class="author-name">\s*([^<]+)/);
  const textMatch = p.match(/class="reviews-text">([^<]+)/);
  const imgMatch = p.match(/src="([^"]+)"/);
  const prodMatch = p.match(/class="product-name">([^<]+)/);
  const prodImgMatch = p.match(/background-image:url\(([^)]+)\)/);

  console.log(`Item ${i}: author=${authorMatch ? authorMatch[1].trim() : 'NO_AUTH'}, text=${textMatch ? textMatch[1].trim().slice(0, 30) : 'NO_TEXT'}`);

  if (authorMatch) {
    reviews.push({
      id: i,
      author: authorMatch[1].trim(),
      verified: true,
      rating: 5,
      comment: textMatch ? textMatch[1].trim() : '',
      image: imgMatch ? imgMatch[1].replace(/&amp;/g, '&') : '',
      productTitle: prodMatch ? prodMatch[1].trim() : 'Ultimate Combo | VPods Pro 2 (2nd Gen) ANC + MagSafe...',
      productImage: prodImgMatch ? prodImgMatch[1].replace(/&amp;/g, '&') : 'https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_4_2026_at_01_35_25_AM.png?v=1783109171&width=360'
    });
  }
}

fs.writeFileSync('src/data/modalReviews.json', JSON.stringify(reviews, null, 2));
console.log('Saved', reviews.length, 'reviews to src/data/modalReviews.json');
