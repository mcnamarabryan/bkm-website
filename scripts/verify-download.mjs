/**
 * Confirms the preview server serves the WordPress theme zip at /bkm-theme.zip:
 * correct status, correct content type, correct byte length, and a real zip
 * signature (PK\x03\x04) so the download is genuinely usable.
 *
 * Usage: node scripts/verify-download.mjs
 */

const URL = 'http://localhost:5173/bkm-theme.zip';

const res = await fetch(URL);
const buf = Buffer.from(await res.arrayBuffer());

const type = res.headers.get('content-type') ?? '';
const disp = res.headers.get('content-disposition') ?? '';

let failures = 0;
const check = (cond, label, detail = '') => {
  if (cond) {
    console.log(`ok    ${label}${detail ? `  (${detail})` : ''}`);
  } else {
    failures += 1;
    console.log(`FAIL  ${label}${detail ? `  (${detail})` : ''}`);
  }
};

check(res.status === 200, 'HTTP 200', `got ${res.status}`);
check(/zip/.test(type), 'content-type is zip', type || 'none');
check(/bkm-technology-solutions\.zip/.test(disp), 'filename in disposition', disp || 'none');
check(buf.length > 10000, 'payload is not a stub', `${buf.length} bytes`);

// Local file header signature.
const sig = buf.readUInt32LE(0);
check(sig === 0x04034b50, 'starts with PK\\x03\\x04', `0x${sig.toString(16)}`);

// End of central directory present at the tail.
let eocd = -1;
for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i -= 1) {
  if (buf.readUInt32LE(i) === 0x06054b50) {
    eocd = i;
    break;
  }
}
check(eocd !== -1, 'ends with EOCD record');
if (eocd !== -1) {
  const entries = buf.readUInt16LE(eocd + 10);
  check(entries > 20, 'archive contains the theme files', `${entries} entries`);
}

console.log('');
console.log(failures === 0 ? 'PASS — zip is downloadable and valid' : `FAILED — ${failures} problem(s)`);
process.exit(failures === 0 ? 0 : 1);
