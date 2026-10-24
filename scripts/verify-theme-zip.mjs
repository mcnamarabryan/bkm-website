/**
 * Validates the built WordPress theme zip without any external binaries.
 *
 * Checks the archive at three levels:
 *  1. Container — EOCD, central directory, local headers, CRCs, sizes.
 *  2. WordPress contract — single root folder, style.css header, required files.
 *  3. PHP sanity — required files exist, function calls have definitions,
 *     template parts resolve to real files.
 *
 * Usage: node scripts/verify-theme-zip.mjs
 */

import { inflateRawSync } from 'node:zlib';
import { readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ZIP = resolve('wp-theme/bkm-technology-solutions.zip');
const THEME = 'bkm-technology-solutions';

let failures = 0;
let warnings = 0;

const fail = (msg) => {
  failures += 1;
  console.log(`FAIL  ${msg}`);
};
const warn = (msg) => {
  warnings += 1;
  console.log(`WARN  ${msg}`);
};
const ok = (msg) => console.log(`ok    ${msg}`);

/* ------------------------------------------------------------- CRC32 */
const TABLE = (() => {
  const t = new Int32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  return t;
})();

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i += 1) crc = TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ -1) >>> 0;
}

/* --------------------------------------------------- read the archive */
const buf = readFileSync(ZIP);
const size = statSync(ZIP).size;

console.log(`Archive: ${ZIP}`);
console.log(`Size:    ${(size / 1024).toFixed(1)} KB (${size} bytes)\n`);

if (size < 1000) {
  fail(`archive is only ${size} bytes — placeholder, not a real zip`);
  process.exit(1);
}

// Locate End Of Central Directory record (search backwards, comment may follow).
let eocd = -1;
for (let i = buf.length - 22; i >= Math.max(0, buf.length - 22 - 65535); i -= 1) {
  if (buf.readUInt32LE(i) === 0x06054b50) {
    eocd = i;
    break;
  }
}
if (eocd === -1) {
  fail('no End Of Central Directory record — file is not a valid zip');
  process.exit(1);
}
ok('EOCD record found');

const entryCount = buf.readUInt16LE(eocd + 10);
const centralSize = buf.readUInt32LE(eocd + 12);
const centralOffset = buf.readUInt32LE(eocd + 16);

if (centralOffset + centralSize > buf.length) {
  fail('central directory points past end of file');
} else {
  ok(`central directory intact at offset ${centralOffset}, ${entryCount} entries`);
}

/* ------------------------------------------- walk the central directory */
const entries = [];
let pos = centralOffset;

for (let i = 0; i < entryCount; i += 1) {
  if (buf.readUInt32LE(pos) !== 0x02014b50) {
    fail(`central header #${i + 1} bad signature at ${pos}`);
    break;
  }

  const method = buf.readUInt16LE(pos + 10);
  const crc = buf.readUInt32LE(pos + 16);
  const compSize = buf.readUInt32LE(pos + 20);
  const rawSize = buf.readUInt32LE(pos + 24);
  const nameLen = buf.readUInt16LE(pos + 28);
  const extraLen = buf.readUInt16LE(pos + 30);
  const commentLen = buf.readUInt16LE(pos + 32);
  const localOffset = buf.readUInt32LE(pos + 42);
  const name = buf.toString('utf8', pos + 46, pos + 46 + nameLen);

  entries.push({ name, method, crc, compSize, rawSize, localOffset });
  pos += 46 + nameLen + extraLen + commentLen;
}

if (entries.length !== entryCount) {
  fail(`read ${entries.length} of ${entryCount} declared entries`);
} else {
  ok(`all ${entryCount} central directory entries parsed`);
}

/* -------------------------- decompress each entry and verify integrity */
const files = new Map();
let totalRaw = 0;

for (const e of entries) {
  const lo = e.localOffset;
  if (buf.readUInt32LE(lo) !== 0x04034b50) {
    fail(`${e.name}: bad local header signature`);
    continue;
  }

  const nameLen = buf.readUInt16LE(lo + 26);
  const extraLen = buf.readUInt16LE(lo + 28);
  const dataStart = lo + 30 + nameLen + extraLen;
  const data = buf.subarray(dataStart, dataStart + e.compSize);

  let raw;
  try {
    raw = e.method === 0 ? Buffer.from(data) : inflateRawSync(data);
  } catch (err) {
    fail(`${e.name}: cannot decompress (${err.message})`);
    continue;
  }

  if (raw.length !== e.rawSize) {
    fail(`${e.name}: size mismatch (${raw.length} actual vs ${e.rawSize} declared)`);
    continue;
  }
  if (crc32(raw) !== e.crc) {
    fail(`${e.name}: CRC mismatch — file corrupt`);
    continue;
  }

  totalRaw += raw.length;
  files.set(e.name, raw);
}

if (failures === 0) {
  ok(`every entry decompressed and passed CRC (${(totalRaw / 1024).toFixed(1)} KB raw)`);
}

/* --------------------------------------------- WordPress archive shape */
console.log('\n— WordPress archive layout —');

const roots = new Set();
for (const name of files.keys()) {
  roots.add(name.split('/')[0]);
  if (name.includes('\\')) fail(`${name}: uses backslashes instead of forward slashes`);
  if (name.startsWith('/')) fail(`${name}: absolute path in archive`);
  if (name.includes('..')) fail(`${name}: path traversal`);
  if (/\.(DS_Store|gitignore)$/.test(name)) warn(`${name}: junk file shipped`);
}

if (roots.size !== 1) {
  fail(`archive contains ${roots.size} root folders (${[...roots].join(', ')}) — WordPress needs exactly one`);
} else {
  ok(`single root folder: ${[...roots][0]}/`);
}

if (!roots.has(THEME)) {
  fail(`root folder is not "${THEME}"`);
}

/* style.css must carry the theme header WordPress reads on activation */
const styleEntry = `${THEME}/style.css`;
const styleBuf = files.get(styleEntry);

if (!styleBuf) {
  fail('missing style.css — WordPress will not recognise this as a theme');
} else {
  const css = styleBuf.toString('utf8');
  const headerEnd = css.indexOf('*/');
  const header = headerEnd > 0 ? css.slice(0, headerEnd) : css;

  if (!/Theme Name:\s*\S/.test(header)) fail('style.css has no "Theme Name" header');
  else ok('style.css header present (Theme Name found)');

  if (!/Version:\s*\S/.test(header)) warn('style.css has no Version header');
}

/* Required theme files */
const required = [
  'style.css',
  'index.php',
  'functions.php',
];
for (const f of required) {
  if (!files.has(`${THEME}/${f}`)) fail(`missing required file: ${f}`);
}
if (!failures) ok('required files present (style.css, index.php, functions.php)');

/* Node build scripts must not ship */
for (const name of files.keys()) {
  if (name.startsWith(`${THEME}/scripts/`)) warn(`${name}: build script shipped in archive`);
  if (name.startsWith(`${THEME}/node_modules/`)) fail(`${name}: node_modules in archive`);
}

/* --------------------------------------------- PHP cross-references */
console.log('\n— PHP cross-reference —');

const phpFiles = [...files.entries()].filter(([n]) => n.endsWith('.php'));
const allPhp = phpFiles.map(([n, b]) => ({ name: n, src: b.toString('utf8') }));
ok(`${phpFiles.length} PHP files in archive`);

// Defined functions.
const defined = new Set();
for (const { src } of allPhp) {
  for (const m of src.matchAll(/function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g)) defined.add(m[1]);
}

// Calls to the theme's own namespace (bkm_*) that are never defined anywhere.
const called = new Set();
for (const { src } of allPhp) {
  for (const m of src.matchAll(/\b(bkm_[a-zA-Z0-9_]+)\s*\(/g)) {
    // Skip the definition site itself.
    called.add(m[1]);
  }
}
for (const fn of called) {
  if (!defined.has(fn)) fail(`calls ${fn}() but it is never defined — fatal error on load`);
}
if (![...called].some((fn) => !defined.has(fn))) {
  ok(`all ${called.size} theme function calls resolve to definitions`);
}

// get_template_part( 'template-parts/section', 'hero' ) => template-parts/section-hero.php
const missingParts = [];
for (const { name, src } of allPhp) {
  for (const m of src.matchAll(/get_template_part\s*\(\s*'([^']+)'\s*(?:,\s*'([^']*)'\s*)?\)/g)) {
    const base = m[2] === undefined ? m[1] : `${m[1]}-${m[2]}`;
    const target = `${THEME}/${base}.php`;
    if (!files.has(target)) missingParts.push(`${name} → ${base}.php`);
  }
}
if (missingParts.length) {
  for (const p of missingParts) fail(`template part not found: ${p}`);
} else {
  ok('every get_template_part() resolves to a real file');
}

// get_template_directory() . '/inc/x.php'
//
// Only literal *file* paths are resolvable at build time. A literal followed by
// another `.` is a prefix of a runtime path (e.g. `'/' . ltrim($x)`), and a
// literal with no file extension is a directory reference (translations,
// uploads) that WordPress tolerates when absent — neither is a broken include.
const missingReq = [];
const optionalDirs = [];

for (const { name, src } of allPhp) {
  for (const m of src.matchAll(/get_template_directory\(\)\s*\.\s*'([^']*)'(\s*\.)?/g)) {
    const literal = m[1];
    const continuesExpression = Boolean(m[2]);
    const looksLikeFile = /\.[a-zA-Z0-9]+$/.test(literal);

    if (continuesExpression || literal === '') continue; // partial/runtime path

    const target = `${THEME}${literal}`;

    if (!looksLikeFile) {
      // Directory reference — note it only if the archive ships nothing there.
      const hasContents = [...files.keys()].some((f) => f.startsWith(`${target}/`));
      if (!hasContents) optionalDirs.push(`${name} → ${literal}`);
      continue;
    }

    if (!files.has(target)) missingReq.push(`${name} → ${literal}`);
  }
}

if (missingReq.length) {
  for (const r of missingReq) fail(`required include missing: ${r}`);
} else {
  ok('every required include exists in the archive');
}

for (const d of optionalDirs) {
  warn(`optional directory absent (safe): ${d}`);
}

// Enqueued assets must exist.
const assetMisses = [];
for (const { src } of allPhp) {
  for (const m of src.matchAll(/get_template_directory_uri\(\)\s*\.\s*'([^']+)'/g)) {
    const target = `${THEME}${m[1]}`;
    if (!files.has(target)) assetMisses.push(m[1]);
  }
}
if (assetMisses.length) {
  for (const a of assetMisses) fail(`enqueued asset missing: ${a}`);
} else {
  ok('every enqueued CSS/JS asset exists in the archive');
}

/* ------------------------------------------------------------- result */
console.log('');
if (failures === 0) {
  console.log(`PASS — archive is valid and upload-ready${warnings ? ` (${warnings} warnings)` : ''}`);
  process.exit(0);
} else {
  console.log(`FAILED — ${failures} problem(s) must be fixed before upload`);
  process.exit(1);
}
