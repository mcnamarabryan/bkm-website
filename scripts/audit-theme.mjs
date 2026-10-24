import fs from 'node:fs';
import path from 'node:path';

const PATTERNS = [
  { name: 'white-alpha text', re: /text-white\/(?!\[0?\.)/ },
  { name: 'plain text-white', re: /className="[^"]*\btext-white\b(?!\/)/ },
  { name: 'bg-surface', re: /bg-surface/ },
  { name: 'violet token', re: /\bviolet\b/ },
  { name: 'sky token', re: /\bsky\b/ },
  { name: 'rose token', re: /\brose-/ },
];

const hits = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(tsx?|css)$/.test(entry)) continue;

    const lines = fs.readFileSync(full, 'utf8').split('\n');
    lines.forEach((line, i) => {
      for (const p of PATTERNS) {
        if (p.re.test(line)) {
          hits.push(`${full}:${i + 1} [${p.name}] ${line.trim().slice(0, 100)}`);
        }
      }
    });
  }
}

walk('src');

if (hits.length === 0) {
  console.log('CLEAN: no stale dark-theme or undefined color tokens in src/');
} else {
  console.log(`FOUND ${hits.length} issue(s):`);
  console.log(hits.join('\n'));
}
