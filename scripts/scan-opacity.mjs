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
const re = new RegExp(`(?:${propNames})-(?:${colorNames})/(\\d{1,3})\\b`, 'g');

const files = walk('src').filter((f) => /\.(tsx|ts|css)$/.test(f));
const bad = {};

for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(line))) {
      if (!valid.has(Number(m[1]))) (bad[file] ??= []).push(`${i + 1}: ${m[0]}`);
    }
  });
}

const total = Object.values(bad).reduce((n, arr) => n + arr.length, 0);
console.log(`invalid opacity utilities: ${total}\n`);
for (const [file, hits] of Object.entries(bad)) {
  console.log(file);
  hits.forEach((h) => console.log('  ' + h));
}
