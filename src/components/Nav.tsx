import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navItems, site } from '../data/site';
import { Logo } from './Logo';
import { useActiveSection, useScrollY } from '../hooks/useMotion';

const ids = navItems.map((n) => n.id);

export function Nav() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const y = useScrollY();
  const active = useActiveSection([...ids]);
  const scrolled = y > 24;

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-hairline bg-white/85 backdrop-blur-xl shadow-soft'
            : 'bg-transparent'
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label={`${site.name} — home`}
          >
            <Logo size={34} variant="compact" uid="nav" />
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`nav-link ${active === item.id ? 'text-ink' : ''}`}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
                {active === item.id && (
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-brand" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go('contact')}
              className="hidden rounded-full border border-navy/15 bg-navy text-white px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-navy-deep hover:shadow-soft sm:inline-flex"
            >
              Start a project
              <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white text-ink md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="h-px w-full bg-hairline/70">
          <div
            className="h-px bg-gradient-to-r from-brand-deep via-brand to-jade transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-x-4 top-[5.25rem] overflow-hidden rounded-3xl border border-hairline bg-white p-3 shadow-lift transition-all duration-300 ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[15px] text-steel transition hover:bg-canvas hover:text-ink"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {item.label}
              <ArrowUpRight className="h-4 w-4 text-steel-faint" />
            </button>
          ))}
          <button
            onClick={() => go('contact')}
            className="mt-2 w-full rounded-2xl bg-brand px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-deep"
          >
            Start a project
          </button>
        </div>
      </div>
    </>
  );
}
