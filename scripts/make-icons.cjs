/* Recria os ícones locais usando o mesmo símbolo de folha da navegação. */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    for (const [size, name] of [[180, 'apple-touch-icon.png'], [192, 'icon-192.png'], [512, 'icon-512.png']]) {
      const data = await page.evaluate(size => {
        const canvas = document.createElement('canvas'); canvas.width = canvas.height = size;
        const context = canvas.getContext('2d');
        const gradient = context.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#ad83ef'); gradient.addColorStop(.55, '#7850c8'); gradient.addColorStop(1, '#5835a2');
        context.fillStyle = gradient; context.fillRect(0, 0, size, size);
        const scale = size * .66 / 24;
        context.translate((size - 24 * scale) / 2, (size - 24 * scale) / 2); context.scale(scale, scale);
        context.fillStyle = '#ffffff';
        context.fill(new Path2D('m12 1 2.1 4.4 1.8-1-.5 5.1 3.2-2.1.4 2.3 3-.5-1.2 3 1.5 1.1-7 5 .6 2.1-3.2-.4V23h-1.4v-3l-3.2.4.6-2.1-7-5 1.5-1.1-1.2-3 3 .5.4-2.3 3.2 2.1-.5-5.1 1.8 1L12 1Z'));
        return canvas.toDataURL('image/png').split(',')[1];
      }, size);
      fs.writeFileSync(path.join(__dirname, '../site/icons', name), Buffer.from(data, 'base64'));
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
