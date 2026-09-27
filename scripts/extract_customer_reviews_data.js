const fs = require('fs');

const html = fs.readFileSync('scripts/live_customer_reviews.html', 'utf8');
const imgRegex = /src="([^"]+)"/g;
const images = [];
let m;
while ((m = imgRegex.exec(html)) !== null) {
  images.push(m[1].replace(/&amp;/g, '&'));
}

const uniqueImages = [...new Set(images)];
console.log('Unique customer review images:', uniqueImages.length);
console.log(JSON.stringify(uniqueImages, null, 2));

fs.writeFileSync('src/data/customerReviewImages.json', JSON.stringify(uniqueImages, null, 2));
