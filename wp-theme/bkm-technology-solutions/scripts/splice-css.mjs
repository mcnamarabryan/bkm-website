import fs from 'node:fs';

const main = 'wp-theme/bkm-technology-solutions/assets/css/main.css';
const rest = 'wp-theme/bkm-technology-solutions/assets/css/_remainder.css';

const a = fs.readFileSync(main, 'utf8').replace(/\s+$/, '');
const b = fs.readFileSync(rest, 'utf8');

const merged = `${a}\n${b}`;
fs.writeFileSync(main, merged);

// Brace balance check, ignoring strings and comments.
let depth = 0;
let minDepth = 0;
let inComment = false;
let inString = null;

for (let i = 0; i < merged.length; i += 1) {
  const c = merged[i];
  const n = merged[i + 1];

  if (inComment) {
    if (c === '*' && n === '/') {
      inComment = false;
      i += 1;
    }
    continue;
  }
  if (inString) {
    if (c === '\\') {
      i += 1;
    } else if (c === inString) {
      inString = null;
    }
    continue;
  }
  if (c === '/' && n === '*') {
    inComment = true;
    i += 1;
    continue;
  }
  if (c === '"' || c === "'") {
    inString = c;
    continue;
  }
  if (c === '{') depth += 1;
  if (c === '}') {
    depth -= 1;
    if (depth < minDepth) minDepth = depth;
  }
}

fs.unlinkSync(rest);

const lines = merged.split('\n').length;
console.log(`spliced ok — ${lines} lines, ${Math.round(merged.length / 1024)} KB`);
console.log(`final brace depth: ${depth} (0 = balanced), min depth: ${minDepth}`);
if (depth !== 0) {
  console.error('UNBALANCED BRACES');
  process.exit(1);
}
