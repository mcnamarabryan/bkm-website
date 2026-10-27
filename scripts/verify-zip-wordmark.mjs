// Verifies the zipped theme's brand lockup actually contains "Technology Solutions".
import { inflateRawSync } from 'node:zlib';
import { readFileSync } from 'node:fs';

const ZIP = 'wp-theme/bkm-technology-solutions.zip';
const buf = readFileSync(ZIP);

// Locate the EOCD record.
let eocd = -1;
for (let i = buf.length - 22; i >= Math.max(0, buf.length - 22 - 65535); i -= 1) {
  if (buf.readUInt32LE(i) === 0x06054b50) {
    eocd = i;
    break;
  }
}
const entryCount = buf.readUInt16LE(eocd + 10);
const centralOffset = buf.readUInt32LE(eocd + 16);

const entries = new Map();
let pos = centralOffset;
for (let i = 0; i < entryCount; i += 1) {
  const method = buf.readUInt16LE(pos + 10);
  const compSize = buf.readUInt32LE(pos + 20);
  const rawSize = buf.readUInt32LE(pos + 24);
  const nameLen = buf.readUInt16LE(pos + 28);
  const extraLen = buf.readUInt16LE(pos + 30);
  const commentLen = buf.readUInt16LE(pos + 32);
  const localOffset = buf.readUInt32LE(pos + 42);
  const name = buf.toString('utf8', pos + 46, pos + 46 + nameLen);
  entries.set(name, { method, compSize, rawSize, localOffset });
  pos += 46 + nameLen + extraLen + commentLen;
}

const TARGET = 'bkm-technology-solutions/inc/template-tags.php';
const TARGET_CSS = 'bkm-technology-solutions/assets/css/main.css';

function readEntry(name) {
  const e = entries.get(name);
  if (!e) return null;
  const lo = e.localOffset;
  const nLen = buf.readUInt16LE(lo + 26);
  const xLen = buf.readUInt16LE(lo + 28);
  const data = buf.subarray(lo + 30 + nLen + xLen, lo + 30 + nLen + xLen + e.compSize);
  return e.method === 0 ? Buffer.from(data) : inflateRawSync(data);
}

const php = readEntry(TARGET)?.toString('utf8') ?? '';
const css = readEntry(TARGET_CSS)?.toString('utf8') ?? '';

const phpOk = php.includes("'Technology Solutions'");
const cssOk = css.includes('white-space: nowrap');

console.log(TARGET, '->', phpOk ? 'OK: contains "Technology Solutions"' : 'MISSING — stale zip');
console.log(TARGET_CSS, '->', cssOk ? 'OK: contains white-space: nowrap' : 'MISSING — stale zip');

if (!phpOk || !cssOk) process.exit(1);
