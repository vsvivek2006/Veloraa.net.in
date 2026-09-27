const fs = require('fs');
const html = fs.readFileSync('sec1_live.html', 'utf8');
const idx = html.indexOf('ARGhBR1RPUUdNelJRY__gsc_countdown_timer_countdown_aUfXDF');
const afterTimer = html.indexOf('</div>', idx + 1000);
console.log(html.slice(afterTimer, afterTimer + 3000));
