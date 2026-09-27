const fs = require('fs');
const sec1 = fs.readFileSync('d:/valorex/sec1_live.html', 'utf8');

const mediaMatch = sec1.match(/<media-gallery[^>]*>([\s\S]*?)<\/media-gallery>/);
if (mediaMatch) {
  console.log('Media gallery match length:', mediaMatch[0].length);
  const re = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  let match;
  let count = 0;
  while ((match = re.exec(mediaMatch[0])) !== null) {
    console.log(count++, match[1]);
  }
}

// Also check thumbnail list structure in media-gallery
const thumbMatch = sec1.match(/<ul id="Slider-Thumbnails-[^"]*"[^>]*>([\s\S]*?)<\/ul>/);
if (thumbMatch) {
  console.log('Thumbnail slider found, length:', thumbMatch[0].length);
}
