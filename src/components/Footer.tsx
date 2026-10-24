import { useEffect, useState } from 'react';
import { ArrowUp, Mail, X } from 'lucide-react';
import { navItems, privacy, site } from '../data/site';
import { LogoMark } from './Logo';

export function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="relative mt-20 border-t border-hairline bg-white/60 pb-10 pt-14">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <LogoMark size={38} plated glow uid="footer" />
              <div className="leading-tight">
                <p className="text-[15px] font-semibold text-ink">{site.name}</p>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-steel-mute">
                  {site.tagline}
                </p>
              </div>
            </div>
            <p className="mt-5 text-[13.5px] leading-relaxed text-steel">
              Planning, implementing, and supporting advanced information technologies — from expert
              consulting to tailored development and ongoing support.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel-mute">
                Navigate
              </p>
              <ul className="mt-4 space-y-2.5">
                {navItems.map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => go(n.id)}
                      className="text-[13.5px] text-steel transition-colors hover:text-brand-deep"
                    >
                      {n.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel-mute">
                Contact
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-1.5 text-[13.5px] text-steel transition-colors hover:text-brand-deep"
                  >
                    <Mail className="h-3 w-3" />
                    {site.email}
                  </a>
                </li>
                <li className="text-[13.5px] text-steel">{site.location}</li>
                <li className="text-[13.5px] text-steel-mute">{site.reach}</li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel-mute">
                Solutions
              </p>
              <ul className="mt-4 space-y-2.5">
                {['Custom Applications', 'System Integration', 'Data Processing & ETL'].map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => go('services')}
                      className="text-left text-[13.5px] text-steel transition-colors hover:text-brand-deep"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 hairline" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-[11px] text-steel-mute">
            © {new Date().getFullYear()} {site.legal}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowPrivacy(true)}
              className="font-mono text-[11px] text-steel-mute transition-colors hover:text-ink"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] text-steel transition-colors hover:text-ink"
              aria-label="Back to top"
            >
              Top
              <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {showPrivacy && <PrivacyDialog onClose={() => setShowPrivacy(false)} />}
    </footer>
  );
}

function PrivacyDialog({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Privacy Policy"
    >
      <div className="absolute inset-0 bg-ink/45 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-hairline bg-white p-6 shadow-lift sm:p-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-steel-mute">
              {site.legal}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">{privacy.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-hairline bg-canvas text-steel transition-colors hover:text-ink"
            aria-label="Close privacy policy"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-4 text-[14.5px] leading-relaxed text-steel">{privacy.intro}</p>

        <dl className="mt-7 divide-y divide-hairline border-y border-hairline">
          {privacy.sections.map((s) => (
            <div key={s.label} className="grid gap-2 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-brand-deep">
                {s.label}
              </dt>
              <dd className="text-[13.5px] leading-relaxed text-steel-soft">{s.body}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-[13px] text-steel">
          Questions? Email{' '}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-brand-deep underline decoration-brand/40 underline-offset-4 transition hover:text-ink"
          >
            {site.email}
          </a>
        </p>
      </div>
    </div>
  );
}
