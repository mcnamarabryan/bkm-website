/**
 * Verifies the Vite dev server serves the page and transforms each module
 * without a compile error. Vite returns 500 + an error body on bad modules.
 */
const BASE = 'http://localhost:5173';

const modules = [
  '/src/App.tsx',
  '/src/components/DraftShield.tsx',
  '/src/components/About.tsx',
  '/src/components/Services.tsx',
  '/src/components/Contact.tsx',
  '/src/components/Logo.tsx',
  '/src/components/Nav.tsx',
  '/src/components/Footer.tsx',
  '/src/index.css',
];

const fail = [];

async function check(path) {
  const res = await fetch(BASE + path);
  const body = await res.text();

  // Vite surfaces compile failures as a 500, or as a text/plain error payload.
  const isError =
    res.status >= 400 ||
    /Transform failed|Pre-transform error|Internal server error/i.test(body) ||
    !/text\/(javascript|css)/.test(res.headers.get('content-type') ?? '');

  const label = isError ? 'FAIL' : 'ok  ';
  console.log(`${label} ${res.status} ${path}`);
  if (isError) fail.push({ path, status: res.status, snippet: body.slice(0, 300) });
}

const html = await (await fetch(BASE + '/')).text();
const hasRoot = html.includes('id="root"');
console.log(`${hasRoot ? 'ok  ' : 'FAIL'} 200 / (root element ${hasRoot ? 'present' : 'MISSING'})`);
if (!hasRoot) fail.push({ path: '/', status: 200, snippet: html.slice(0, 300) });

for (const m of modules) await check(m);

if (fail.length) {
  console.log('\n--- failures ---');
  for (const f of fail) console.log(`\n${f.path} (${f.status})\n${f.snippet}`);
  process.exit(1);
}

console.log('\nAll modules served cleanly.');
