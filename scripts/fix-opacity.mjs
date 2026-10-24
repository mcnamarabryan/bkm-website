import fs from 'node:fs';
import path from 'node:path';

const valid = new Set([0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75, 80, 90, 95, 100]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );
}

const colorNames = 'white|black|ink|base|surface|panel|line|violet|sky|rose|muted|emerald-\\d00';
const propNames = 'text|bg|border|from|via|to|ring|divide|shadow|placeholder|decoration|outline|fill|stroke';
const re = new RegExp(`((?:${propNames})-(?:${colorNames}))/(\\d{1,3})\\b`, 'g');

const files = walk('src').filter((f) => /\.(tsx|ts|css)$/.test(f));
let changed = 0;

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  let count = 0;
  const out = src.replace(re, (match, prefix, value) => {
    const num = Number(value);
    if (valid.has(num)) return match;
    count++;
    const frac = (num / 100).toFixed(2).replace(/0$/, '');
    return `${prefix}/[${frac}]`;
  });
  if (count) {
    fs.writeFileSync(file, out);
    changed += count;
    console.log(`${file}: ${count} fixed`);
  }
}

console.log(`\ntotal fixed: ${changed}`);
