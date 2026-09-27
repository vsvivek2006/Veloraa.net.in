const fs = require('fs');
const html = fs.readFileSync('scripts/live_vstar_modal.html', 'utf8');

const reviews = [];
const parts = html.split('class="grid-review');

for (let i = 1; i < parts.length; i++) {
  const p = parts[i];
  
  const authorMatch = p.match(/class="author-name">\s*([^<]+)/);
  const textMatch = p.match(/class="reviews-text">([^<]+)/);
  const imgMatch = p.match(/<img[^>]+src="([^">]+)"/);
  const productMatch = p.match(/class="product-name">([^<]+)/);
  const productImgMatch = p.match(/background-image:url\(([^)]+)\)/);

  if (authorMatch && textMatch) {
    reviews.push({
      id: i,
      author: authorMatch[1].trim(),
      verified: true,
      rating: 5,
      comment: textMatch[1].trim(),
      image: imgMatch ? imgMatch[1].replace(/&amp;/g, '&') : '',
      productTitle: productMatch ? productMatch[1].trim() : 'Ultimate Combo | VPods Pro 2 (2nd Gen) ANC + MagSafe 10000mAh Powerbank',
      productImage: productImgMatch ? productImgMatch[1].replace(/&amp;/g, '&') : 'https://cdn.shopify.com/s/files/1/0884/6606/3678/files/ChatGPT_Image_Jul_4_2026_at_01_35_25_AM.png?v=1783109171&width=360'
    });
  }
}

console.log('Successfully extracted', reviews.length, 'reviews:');
console.log(JSON.stringify(reviews.slice(0, 4), null, 2));

fs.writeFileSync('src/data/modalReviews.json', JSON.stringify(reviews, null, 2));
