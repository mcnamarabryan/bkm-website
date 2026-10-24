const targets = [
  '/',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/src/hooks/useMotion.ts',
  '/src/data/site.ts',
  '/src/components/Background.tsx',
  '/src/components/Nav.tsx',
  '/src/components/Hero.tsx',
  '/src/components/SectionHeading.tsx',
  '/src/components/Services.tsx',
  '/src/components/Approach.tsx',
  '/src/components/Work.tsx',
  '/src/components/Testimonials.tsx',
  '/src/components/Stack.tsx',
  '/src/components/Contact.tsx',
  '/src/components/Footer.tsx',
];

const base = process.env.BASE ?? 'http://localhost:5173';
let failed = 0;

for (const t of targets) {
  try {
    const res = await fetch(base + t);
    const body = await res.text();
    const hasError =
      body.includes('Internal server error') ||
      body.includes('Pre-transform error') ||
      body.includes('does not exist') ||
      body.includes('Failed to resolve');
    if (!res.ok || hasError) {
      failed++;
      console.log(`FAIL ${res.status} ${t}`);
      const idx = body.search(/Internal server error|Pre-transform error|Failed to resolve/);
      if (idx > -1) console.log('   ' + body.slice(idx, idx + 220).replace(/\s+/g, ' '));
    } else {
      console.log(`ok   ${res.status} ${t}  (${body.length} bytes)`);
    }
  } catch (err) {
    failed++;
    console.log(`FAIL fetch ${t}: ${err.message}`);
  }
}

console.log(failed === 0 ? '\nALL MODULES OK' : `\n${failed} FAILURES`);
process.exit(failed === 0 ? 0 : 1);
