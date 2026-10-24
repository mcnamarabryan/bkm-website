/**
 * Theme CSS coverage check.
 *
 * Extracts every class name used in the PHP templates and verifies that each
 * one has a rule in either assets/css/main.css or assets/css/templates.css.
 * This is what catches "theme activates but renders unstyled".
 *
 * Usage: node scripts/verify-theme-css.mjs
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

const all = walk(ROOT);
const phpFiles = all.filter((f) => f.endsWith('.php'));
const cssFiles = all.filter((f) => f.endsWith('.css'));

/* ---------------------------------------------------- classes in templates */
const used = new Map(); // class -> Set(files)

for (const file of phpFiles) {
  const raw = readFileSync(file, 'utf8');
  const rel = relative(ROOT, file).split(sep).join('/');

  // Replace PHP blocks with a placeholder BEFORE scanning. Classes are often
  // emitted like class="a <?php echo $x; ?> b", and leaving the code in place
  // makes the extractor treat `?>`, `);` and `esc_attr(` as class names.
  const src = raw.replace(/<\?php[\s\S]*?\?>/g, 'PHP').replace(/<\?=[\s\S]*?\?>/g, 'PHP');

  // class="a b c" — also matches class='...'
  for (const m of src.matchAll(/class=(["'])([^"']*)\1/g)) {
    for (const cls of m[2].split(/\s+/)) {
      const clean = cls.trim();
      if (!clean) continue;
      if (clean === 'PHP') continue;
      // Real CSS class names only — no PHP-ish punctuation leaking through.
      if (!/^-?[A-Za-z_][A-Za-z0-9_-]*$/.test(clean)) continue;
      if (!used.has(clean)) used.set(clean, new Set());
      used.get(clean).add(rel);
    }
  }
}

/* ------------------------------------------------ rules defined in the CSS */
const defined = new Set();

for (const file of cssFiles) {
  const css = readFileSync(file, 'utf8');

  // Strip comments so commented-out selectors do not count.
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');

  for (const m of stripped.matchAll(/\.(-?[A-Za-z_][A-Za-z0-9_-]*)/g)) {
    defined.add(m[1]);
  }
}

/* ------------------------------------------------------------------ report */
const missing = [];
for (const [cls, files] of used) {
  if (!defined.has(cls)) missing.push({ cls, files: [...files] });
}

console.log(`Templates use ${used.size} distinct class names.`);
console.log(`Stylesheets define ${defined.size} distinct classes.`);
console.log('');

if (missing.length === 0) {
  console.log('PASS — every template class has a matching CSS rule');
  process.exit(0);
}

// Group by class so the report stays readable.
missing.sort((a, b) => a.cls.localeCompare(b.cls));
for (const m of missing) {
  console.log(`MISS  .${m.cls}  (${m.files.join(', ')})`);
}
console.log('');
console.log(`FAILED — ${missing.length} class(es) have no styling`);
process.exit(1);
