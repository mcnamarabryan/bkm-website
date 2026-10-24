import { useState } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { site } from '../data/site';
import { useReveal } from '../hooks/useMotion';

const pillars = [
  { label: 'Plan', body: 'Consulting that starts with your business, not a product menu.' },
  { label: 'Implement', body: 'Applications built to your exact requirements.' },
  { label: 'Support', body: 'Ongoing maintenance for new and legacy systems alike.' },
];

export function Hero() {
  const ref = useReveal<HTMLElement>();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-28">
      <div className="shell relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Copy */}
          <div>
            <div className="reveal flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/80 px-3.5 py-1.5 text-[12px] text-steel shadow-soft backdrop-blur">
                <MapPin className="h-3.5 w-3.5 text-brand" />
                {site.location}
                <span className="h-1 w-1 rounded-full bg-steel-faint" />
                <span className="text-steel-mute">Coast to coast</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-tint px-3.5 py-1.5 text-[12px] font-medium text-brand-deep">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-brand" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                </span>
                Stable · Secure · Growth
              </span>
            </div>

            <h1
              className="reveal mt-7 text-balance font-display text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.03em] text-ink sm:text-[4rem] lg:text-[4.6rem]"
              style={{ transitionDelay: '60ms' }}
            >
              <span className="text-gradient">Accelerate</span> growth.
            </h1>

            <p
              className="reveal mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-steel sm:text-[1.15rem]"
              style={{ transitionDelay: '140ms' }}
            >
              We build custom solutions that fit your exact requirements. By listening to our
              clients, we deliver real value and drive innovation — supporting both cutting-edge
              technologies and legacy systems with ongoing maintenance and support.
            </p>

            <div
              className="reveal mt-9 flex flex-wrap items-center gap-3"
              style={{ transitionDelay: '220ms' }}
            >
              <button onClick={() => go('contact')} className="btn-primary group">
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <button onClick={() => go('draftshield')} className="btn-ghost group">
                See DraftShield
                <span className="ml-1 font-mono text-[11px] text-brand-deep/70 transition-colors group-hover:text-brand-deep">
                  new
                </span>
              </button>
            </div>

            <dl
              className="reveal mt-14 grid gap-x-6 gap-y-6 border-t border-hairline pt-8 sm:grid-cols-3"
              style={{ transitionDelay: '300ms' }}
            >
              {pillars.map((p) => (
                <div key={p.label}>
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-deep">
                    {p.label}
                  </dt>
                  <dd className="mt-2 text-[13px] leading-snug text-steel-soft">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Visual */}
          <div className="reveal relative" style={{ transitionDelay: '180ms' }}>
            <SystemConsole />
          </div>
        </div>
      </div>
    </section>
  );
}

const pipeline = [
  { label: 'Legacy System', meta: 'maintained', accent: '#0F766E' },
  { label: 'Integration', meta: 'APIs + queues', accent: '#22245F' },
  { label: 'Data / ETL', meta: 'processed', accent: '#2FA24C' },
  { label: 'Custom App', meta: 'deployed', accent: '#4CC46A' },
];

function SystemConsole() {
  const [active, setActive] = useState(0);

  return (
    <div className="group relative">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(47,162,76,0.16),transparent_70%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-hairline bg-white p-1 shadow-lift">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-steel-faint" />
            <span className="h-2 w-2 rounded-full bg-steel-faint" />
            <span className="h-2 w-2 rounded-full bg-steel-faint" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel-mute">
            bkm / solutions
          </span>
          <span className="font-mono text-[10px] text-brand-deep">stable</span>
        </div>

        <div className="rounded-[1.4rem] bg-canvas p-5 sm:p-6">
          <div className="relative">
            <div className="absolute left-[18px] top-3 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-jade/40 via-navy/25 to-brand/50 sm:left-[19px]" />
            <ul className="space-y-2.5">
              {pipeline.map((n, i) => {
                const isActive = i === active;
                return (
                  <li
                    key={n.label}
                    className="relative flex items-center gap-3.5"
                    onMouseEnter={() => setActive(i)}
                  >
                    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-hairline bg-white">
                      {isActive && (
                        <span
                          className="absolute inset-0 animate-pulseRing rounded-full"
                          style={{ boxShadow: `0 0 0 1.5px ${n.accent}66` }}
                        />
                      )}
                      <span
                        className="h-2 w-2 rounded-full transition-all duration-500"
                        style={{
                          background: n.accent,
                          boxShadow: isActive ? `0 0 12px ${n.accent}99` : 'none',
                          transform: isActive ? 'scale(1.25)' : 'scale(1)',
                        }}
                      />
                    </span>
                    <span
                      className={`flex flex-1 items-center justify-between rounded-xl border px-3.5 py-2.5 transition-all duration-500 ${
                        isActive
                          ? 'border-navy/20 bg-white shadow-soft'
                          : 'border-hairline/70 bg-white/60'
                      }`}
                    >
                      <span className="text-[13.5px] font-medium text-ink">{n.label}</span>
                      <span className="font-mono text-[10.5px] text-steel-mute">{n.meta}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-5 space-y-1 rounded-xl border border-hairline bg-white p-3.5 font-mono text-[11px] leading-relaxed">
            <p className="flex items-center gap-2 text-brand-deep">
              <span className="text-steel-faint">›</span> custom applications
            </p>
            <p className="flex items-center gap-2 text-steel-soft">
              <span className="text-steel-faint">›</span> system integration &amp; ETL
            </p>
            <p className="flex items-center gap-2 text-steel-soft">
              <span className="text-steel-faint">›</span> maintenance &amp; support
            </p>
            <p className="flex items-center gap-2 text-jade">
              <span className="text-steel-faint">›</span> AI-accelerated delivery
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 hidden items-center gap-2.5 rounded-2xl border border-hairline bg-white px-4 py-3 shadow-lift sm:flex">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-tint text-brand-deep">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="leading-tight">
          <p className="text-[12.5px] font-medium text-ink">Fully offline option</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-steel-mute">
            draftshield
          </p>
        </div>
      </div>
    </div>
  );
}
