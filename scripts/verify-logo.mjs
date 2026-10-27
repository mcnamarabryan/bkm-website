// Verifies the served Logo module contains the full wordmark.
const res = await fetch('http://localhost:5173/src/components/Logo.tsx');
const text = await res.text();

const ok = res.ok && text.includes('Technology Solutions');
console.log(ok
  ? 'OK — served Logo.tsx shows the full "BKM Technology Solutions" wordmark'
  : 'PROBLEM — the wordmark still omits "Solutions"');
process.exit(ok ? 0 : 1);
