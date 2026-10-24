import { Background } from './components/Background';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { DraftShield } from './components/DraftShield';
import { About } from './components/About';
import { Stack } from './components/Stack';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <Background />
      <Nav />

      <main id="main" className="relative">
        <Hero />
        <Services />
        <div className="shell">
          <div className="hairline" />
        </div>
        <DraftShield />
        <About />
        <Stack />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
