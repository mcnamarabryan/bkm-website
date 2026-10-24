/**
 * Builds an upload-ready WordPress theme zip.
 *
 * EasyWP (and WordPress itself) expects a single .zip whose root contains the
 * theme folder — not the theme's files directly. This script walks the theme
 * directory and writes a valid DEFLATE zip using only Node's standard library,
 * because no `zip` binary exists in this environment.
 *
 * Usage: node scripts/build-zip.mjs
 */

import { deflateRawSync } from 'node:zlib';
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { join, relative, sep, posix, basename, resolve } from 'node:path';

// This script lives at <theme>/scripts/build-zip.mjs, so the theme directory is
// the script's parent, and the zip is written alongside the theme folder.
const THEME_DIR = resolve(new URL('..', import.meta.url).pathname);
const THEME_NAME = basename(THEME_DIR);
const ROOT = resolve(THEME_DIR, '..');
const OUT_DIR = ROOT;
const OUT_FILE = join(OUT_DIR, `${THEME_NAME}.zip`);

/** Files and folders that must never ship in a distributed theme. */
const EXCLUDE_DIRS = new Set(['node_modules', '.git', 'scripts', '.vscode', '.idea']);
const EXCLUDE_FILES = new Set(['.DS_Store', 'Thumbs.db', '.gitignore']);

/* ---------------------------------------------------------------- CRC32 */
const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }
  return table;
})();

function crc32(buffer) {
  let crc = -1;
  for (let i = 0; i < buffer.length; i += 1) {
    crc = CRC_TABLE[(crc ^ buffer[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ -1) >>> 0;
}

/* ------------------------------------------------------- collect files */
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stats = statSync(full);

    if (stats.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry)) continue;
      walk(full, out);
    } else if (!EXCLUDE_FILES.has(entry)) {
      out.push({ full, stats });
    }
  }
  return out;
}

/* ------------------------------------------------------- DOS timestamp */
function dosDateTime(date) {
  const time =
    (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dateBits =
    ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time, date: dateBits };
}

/* --------------------------------------------------------------- build */
const files = walk(THEME_DIR);
const localParts = [];
const centralParts = [];
let offset = 0;

for (const { full, stats } of files) {
  // Archive paths always use forward slashes, and include the wrapper folder.
  const rel = relative(ROOT, full).split(sep).join(posix.sep);
  const nameBuffer = Buffer.from(rel, 'utf8');

  const raw = readFileSync(full);
  const compressed = deflateRawSync(raw, { level: 9 });
  const crc = crc32(raw);
  const { time, date } = dosDateTime(stats.mtime);

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4); // version needed
  local.writeUInt16LE(0x0800, 6); // UTF-8 filename flag
  local.writeUInt16LE(8, 8); // DEFLATE
  local.writeUInt16LE(time, 10);
  local.writeUInt16LE(date, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(compressed.length, 18);
  local.writeUInt32LE(raw.length, 22);
  local.writeUInt16LE(nameBuffer.length, 26);
  local.writeUInt16LE(0, 28); // no extra field

  localParts.push(local, nameBuffer, compressed);

  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE(20, 4); // version made by
  central.writeUInt16LE(20, 6); // version needed
  central.writeUInt16LE(0x0800, 8);
  central.writeUInt16LE(8, 10);
  central.writeUInt16LE(time, 12);
  central.writeUInt16LE(date, 14);
  central.writeUInt32LE(crc, 16);
  central.writeUInt32LE(compressed.length, 20);
  central.writeUInt32LE(raw.length, 24);
  central.writeUInt16LE(nameBuffer.length, 28);
  central.writeUInt16LE(0, 30); // extra len
  central.writeUInt16LE(0, 32); // comment len
  central.writeUInt16LE(0, 34); // disk
  central.writeUInt16LE(0, 36); // internal attrs
  central.writeUInt32LE(0o644 << 16, 38); // external attrs (unix perms)
  central.writeUInt32LE(offset, 42);

  centralParts.push(central, nameBuffer);

  offset += local.length + nameBuffer.length + compressed.length;
}

const centralBuffer = Buffer.concat(centralParts);
const eocd = Buffer.alloc(22);
eocd.writeUInt32LE(0x06054b50, 0);
eocd.writeUInt16LE(0, 4);
eocd.writeUInt16LE(0, 6);
eocd.writeUInt16LE(files.length, 8);
eocd.writeUInt16LE(files.length, 10);
eocd.writeUInt32LE(centralBuffer.length, 12);
eocd.writeUInt32LE(offset, 16);
eocd.writeUInt16LE(0, 20);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, Buffer.concat([...localParts, centralBuffer, eocd]));

console.log(`Wrote ${OUT_FILE}`);
console.log(`${files.length} files, ${(statSync(OUT_FILE).size / 1024).toFixed(1)} KB`);
console.log(`Archive root: ${THEME_NAME}/`);
