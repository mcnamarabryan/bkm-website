/**
 * Verifies that every `var(--token)` used by the theme stylesheets is actually
 * declared somewhere in those stylesheets. Catches styles that silently
 * collapse because they reference a token that was renamed or never ported.
 *
 * Usage: node scripts/verify-css-tokens.mjs
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = 'wp-theme/bkm-technology-solutions';

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const cssFiles = walk(ROOT).filter((f) => f.endsWith('.css'));

const declared = new Map(); // token -> file
const usedTokens = new Map(); // token -> Set(files)

for (const file of cssFiles) {
  const rel = relative(ROOT, file).split(sep).join('/');
  const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

  for (const m of css.matchAll(/(--[a-zA-Z0-9_-]+)\s*:/g)) {
    declared.set(m[1], rel);
  }

  for (const m of css.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)/g)) {
    if (!usedTokens.has(m[1])) usedTokens.set(m[1], new Set());
    usedTokens.get(m[1]).add(rel);
  }
}

const missing = [...usedTokens.entries()].filter(([tok]) => !declared.has(tok));

console.log(`Declared tokens: ${declared.size}`);
console.log(`Referenced tokens: ${usedTokens.size}`);
console.log('');

if (missing.length === 0) {
  console.log('PASS — every var(--token) is declared');
  process.exit(0);
}

for (const [tok, files] of missing) {
  console.log(`MISS  ${tok}  referenced in ${[...files].join(', ')}`);
}
console.log('');
console.log(`FAILED — ${missing.length} undefined token(s)`);
process.exit(1);
