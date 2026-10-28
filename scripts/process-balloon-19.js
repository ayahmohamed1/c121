const sharp = require('sharp');
const fs = require('fs');

async function process19() {
  const inputPath = 'C:/Users/AYAH ELMAGHRABY/.gemini/antigravity-ide/brain/8d89fe39-c2e6-4e3e-899c-e8ff42069c89/balloon_19_1793228912406.jpg';
  
  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;
  const totalPixels = width * height;
  console.log(`Dimensions: ${width}x${height}, channels: ${channels}`);

  const isOutside = new Uint8Array(totalPixels);
  // Fast queue using Int32Array
  const q = new Int32Array(totalPixels * 2);
  let head = 0;
  let tail = 0;

  function pushQ(x, y) {
    q[tail++] = x;
    q[tail++] = y;
  }

  // Seed all border pixels:
  for (let x = 0; x < width; x++) {
    pushQ(x, 0);
    pushQ(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushQ(0, y);
    pushQ(width - 1, y);
  }

  while (head < tail) {
    const x = q[head++];
    const y = q[head++];
    const idx = y * width + x;
    if (isOutside[idx]) continue;

    const s = idx * channels;
    const r = data[s], g = data[s + 1], b = data[s + 2];

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const isNeutral = (max - min) < 22;

    if ((r > 240 && g > 240 && b > 240) || (isNeutral && r > 190 && g > 190 && b > 190 && y > height * 0.85)) {
      isOutside[idx] = 1;
      if (x > 0 && !isOutside[idx - 1]) pushQ(x - 1, y);
      if (x < width - 1 && !isOutside[idx + 1]) pushQ(x + 1, y);
      if (y > 0 && !isOutside[idx - width]) pushQ(x, y - 1);
      if (y < height - 1 && !isOutside[idx + width]) pushQ(x, y + 1);
    }
  }

  // Flood fill the hole of '9':
  for (let y = Math.floor(height * 0.55); y < Math.floor(height * 0.75); y += 5) {
    for (let x = Math.floor(width * 0.65); x < Math.floor(width * 0.85); x += 5) {
      const idx = y * width + x;
      if (isOutside[idx]) continue;
      const s = idx * channels;
      const r = data[s], g = data[s + 1], b = data[s + 2];
      if (r > 245 && g > 245 && b > 245) {
        console.log(`Found hole seed at (${x}, ${y}) with RGB (${r},${g},${b})`);
        pushQ(x, y);
        while (head < tail) {
          const hx = q[head++];
          const hy = q[head++];
          const hIdx = hy * width + hx;
          if (isOutside[hIdx]) continue;
          const hs = hIdx * channels;
          const hr = data[hs], hg = data[hs + 1], hb = data[hs + 2];
          if (hr > 235 && hg > 235 && hb > 235) {
            isOutside[hIdx] = 1;
            if (hx > 0 && !isOutside[hIdx - 1]) pushQ(hx - 1, hy);
            if (hx < width - 1 && !isOutside[hIdx + 1]) pushQ(hx + 1, hy);
            if (hy > 0 && !isOutside[hIdx - width]) pushQ(hx, hy - 1);
            if (hy < height - 1 && !isOutside[hIdx + width]) pushQ(hx, hy + 1);
          }
        }
      }
    }
  }

  // Backup existing ballon.png to ballon20.png if not exists:
  if (!fs.existsSync('public/images/ballon20.png') && fs.existsSync('public/images/ballon.png')) {
    fs.copyFileSync('public/images/ballon.png', 'public/images/ballon20.png');
    console.log('Backed up ballon.png to ballon20.png');
  }

  // Create RGBA buffer:
  const out = Buffer.alloc(totalPixels * 4);
  for (let i = 0; i < totalPixels; i++) {
    const s = i * channels;
    const d = i * 4;
    if (isOutside[i]) {
      out[d] = 0;
      out[d + 1] = 0;
      out[d + 2] = 0;
      out[d + 3] = 0;
    } else {
      out[d] = data[s];
      out[d + 1] = data[s + 1];
      out[d + 2] = data[s + 2];
      out[d + 3] = 255;
    }
  }

  // Edge antialiasing:
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const d = idx * 4;
      if (out[d + 3] === 255) {
        const hasOutNeighbor = isOutside[idx - 1] || isOutside[idx + 1] || isOutside[idx - width] || isOutside[idx + width];
        if (hasOutNeighbor) {
          const r = out[d], g = out[d + 1], b = out[d + 2];
          if (r > 215 && g > 215 && b > 215) {
            out[d + 3] = 160;
          }
        }
      }
    }
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .trim()
    .png()
    .toFile('public/images/ballon19.png');

  await sharp(out, { raw: { width, height, channels: 4 } })
    .trim()
    .png()
    .toFile('public/images/ballon.png');

  console.log('Successfully saved public/images/ballon19.png and public/images/ballon.png');
}

process19().catch(console.error);
