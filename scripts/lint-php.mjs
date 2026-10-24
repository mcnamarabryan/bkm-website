/**
 * Structural PHP linter — no PHP binary required.
 *
 * We cannot run `php -l` in this environment, so this script tokenises each
 * PHP file closely enough to catch the mistakes that actually break WordPress
 * themes on activation:
 *
 *  - missing `<?php` tag (file body leaks into the page as text)
 *  - unbalanced braces / brackets / parentheses
 *  - unterminated single or double quoted strings
 *  - unterminated block or line comments
 *  - stray closing tag followed by whitespace (breaks headers, sends output early)
 *
 * Usage: node scripts/lint-php.mjs
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = 'wp-theme/bkm-technology-solutions';

let files = 0;
let problems = 0;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith('.php')) out.push(full);
  }
  return out;
}

/**
 * Walks a PHP source character by character, tracking whether we are inside a
 * string, comment, or plain code, and reporting structural problems.
 */
function lint(file, src) {
  const issues = [];
  const lines = src.split('\n');

  const lineAt = (index) => src.slice(0, index).split('\n').length;

  // Every real PHP file must open with a PHP tag (BOM tolerated).
  const head = src.replace(/^\uFEFF/, '').trimStart();
  if (!head.startsWith('<?php')) {
    issues.push({ line: 1, msg: 'does not start with <?php — contents would render as text' });
  }

  const stack = [];
  const closing = { '}': '{', ')': '(', ']': '[' };

  let i = 0;
  let state = 'code'; // code | single | double | lineComment | blockComment

  while (i < src.length) {
    const ch = src[i];
    const next = src[i + 1];

    if (state === 'code') {
      // Comments
      if (ch === '/' && next === '/') { state = 'lineComment'; i += 2; continue; }
      if (ch === '#') { state = 'lineComment'; i += 1; continue; }
      if (ch === '/' && next === '*') { state = 'blockComment'; i += 2; continue; }

      // Strings
      if (ch === "'") { state = 'single'; i += 1; continue; }
      if (ch === '"') { state = 'double'; i += 1; continue; }

      if (ch === '{' || ch === '(' || ch === '[') {
        stack.push({ ch, at: i });
        i += 1;
        continue;
      }

      if (ch === '}' || ch === ')' || ch === ']') {
        const top = stack.pop();
        if (!top) {
          issues.push({ line: lineAt(i), msg: `unexpected closing '${ch}' with nothing open` });
        } else if (top.ch !== closing[ch]) {
          issues.push({
            line: lineAt(i),
            msg: `'${ch}' closes '${top.ch}' opened on line ${lineAt(top.at)}`,
          });
        }
        i += 1;
        continue;
      }

      i += 1;
      continue;
    }

    if (state === 'lineComment') {
      if (ch === '\n') state = 'code';
      i += 1;
      continue;
    }

    if (state === 'blockComment') {
      if (ch === '*' && next === '/') { state = 'code'; i += 2; continue; }
      i += 1;
      continue;
    }

    if (state === 'single') {
      if (ch === '\\') { i += 2; continue; }
      if (ch === "'") state = 'code';
      i += 1;
      continue;
    }

    if (state === 'double') {
      if (ch === '\\') { i += 2; continue; }
      if (ch === '"') state = 'code';
      i += 1;
      continue;
    }
  }

  const endLine = lines.length;

  if (state === 'single' || state === 'double') {
    issues.push({ line: endLine, msg: `unterminated ${state}-quoted string` });
  }
  if (state === 'blockComment') {
    issues.push({ line: endLine, msg: 'unterminated /* block comment */' });
  }
  for (const open of stack) {
    issues.push({
      line: lineAt(open.at),
      msg: `unclosed '${open.ch}'`,
    });
  }

  return issues;
}

const phpFiles = walk(ROOT);

for (const file of phpFiles) {
  files += 1;
  const rel = relative(ROOT, file).split(sep).join('/');
  const src = readFileSync(file, 'utf8');
  const issues = lint(file, src);

  if (issues.length) {
    problems += issues.length;
    for (const issue of issues) {
      console.log(`FAIL  ${rel}:${issue.line}  ${issue.msg}`);
    }
  }
}

console.log('');
console.log(`Scanned ${files} PHP files, ${problems} structural problem(s).`);
console.log(problems === 0 ? 'PASS — every PHP file is structurally sound' : 'FAILED');
process.exit(problems === 0 ? 0 : 1);
