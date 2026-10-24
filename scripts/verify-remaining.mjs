const targets = [
  '/src/main.tsx',
  '/src/components/Hero.tsx',
  '/src/components/Stack.tsx',
  '/src/components/Background.tsx',
  '/src/components/SectionHeading.tsx',
  '/src/data/site.ts',
  '/src/hooks/useMotion.ts',
];

const base = 'http://localhost:5173';
let failed = 0;

for (const t of targets) {
  try {
    const res = await fetch(base + t);
    const body = await res.text();
    const bad =
      res.status >= 400 ||
      /Transform failed|Pre-transform error|Internal server error|Failed to resolve/.test(body);

    if (bad) {
      failed++;
      console.log(`FAIL ${res.status} ${t}`);
      console.log('   ' + body.slice(0, 240).replace(/\s+/g, ' '));
    } else {
      console.log(`ok   ${res.status} ${t}  (${body.length} bytes)`);
    }
  } catch (err) {
    failed++;
    console.log(`FAIL fetch ${t}: ${err.message}`);
  }
}

console.log(failed === 0 ? '\nALL REMAINING MODULES OK' : `\n${failed} FAILURES`);
process.exit(failed === 0 ? 0 : 1);
