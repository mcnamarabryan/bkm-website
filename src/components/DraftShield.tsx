import {
  Cpu,
  FileText,
  HardDrive,
  Lock,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { draftshield } from '../data/site';
import { useReveal } from '../hooks/useMotion';

const icons = {
  lock: Lock,
  file: FileText,
  search: Search,
  shield: ShieldCheck,
  cpu: Cpu,
  trend: TrendingUp,
} as const;

export function DraftShield() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="draftshield" ref={ref} className="relative scroll-mt-24 py-24 sm:py-32">
      {/* Product-tinted backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[36rem] w-[62rem] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(47,162,76,0.10),transparent_70%)] blur-2xl" />
      </div>

      <div className="shell relative">
        {/* Header */}
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-tint px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-brand-deep">
            <Sparkles className="h-3 w-3" />
            {draftshield.eyebrow}
          </span>

          <h2 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.02em] text-ink sm:text-[3.4rem]">
            {draftshield.name}
          </h2>

          <p className="mt-3 font-serif text-2xl italic text-gradient sm:text-[1.75rem]">
            {draftshield.title}
          </p>

          <p className="mt-6 text-[1.0625rem] leading-relaxed text-steel">
            {draftshield.intro}
          </p>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-steel-mute">
            {draftshield.lead}
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {draftshield.features.map((f, i) => {
            const Icon = icons[f.icon as keyof typeof icons] ?? ShieldCheck;
            return (
              <article
                key={f.title}
                className="reveal card-surface group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:border-brand/35 hover:shadow-lift sm:p-7"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand/[0.10] blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <span className="relative grid h-11 w-11 place-items-center rounded-2xl border border-brand/20 bg-brand-tint text-brand-deep transition-transform duration-500 group-hover:scale-105">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </span>

                <h3 className="relative mt-6 font-display text-2xl font-semibold text-ink">{f.title}</h3>
                <p className="relative mt-2.5 text-[14px] leading-relaxed text-steel">{f.body}</p>
              </article>
            );
          })}
        </div>

        {/* Audience + hardware */}
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <article
            className="reveal relative overflow-hidden rounded-3xl p-7 shadow-lift sm:p-9"
            style={{ background: 'linear-gradient(165deg, #2C2F73 0%, #1B1D52 100%)' }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_0%,rgba(47,162,76,0.28),transparent_70%)]" />
            <div className="relative">
              <h3 className="font-display text-[2rem] font-semibold leading-tight text-white">
                {draftshield.audience.title}
              </h3>
              <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-white/70">
                {draftshield.audience.body}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Built with
                </span>
                {draftshield.audience.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white/90"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="reveal card-surface rounded-3xl p-7 sm:p-9" style={{ transitionDelay: '90ms' }}>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-hairline bg-canvas text-brand-deep">
                <HardDrive className="h-4 w-4" strokeWidth={1.7} />
              </span>
              <h3 className="font-display text-[1.6rem] font-semibold leading-none text-ink">
                {draftshield.hardware.title}
              </h3>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-steel">
              {draftshield.hardware.body}
            </p>
            <ul className="mt-5 space-y-2.5">
              {draftshield.hardware.specs.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-[13px] text-steel-soft">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70" />
                  {s}
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* CTA */}
        <div className="reveal mt-5 flex flex-col items-start justify-between gap-6 rounded-3xl border border-brand/25 bg-brand-tint px-7 py-8 sm:flex-row sm:items-center sm:px-9">
          <div className="max-w-xl">
            <h3 className="font-display text-[1.9rem] font-semibold leading-tight text-ink">
              {draftshield.cta.title}
            </h3>
            <p className="mt-2.5 text-[14px] leading-relaxed text-steel">
              {draftshield.cta.body}
            </p>
          </div>
          <button
            disabled
            className="inline-flex shrink-0 cursor-not-allowed items-center gap-2 rounded-full border border-hairline bg-white px-6 py-3.5 text-sm font-semibold text-steel-mute"
            aria-label={`${draftshield.cta.label} — not yet available`}
          >
            <Lock className="h-4 w-4" />
            {draftshield.cta.label}
          </button>
        </div>

        {/* Disclaimer */}
        <p className="reveal mx-auto mt-10 max-w-3xl text-center text-[12px] leading-relaxed text-steel-mute">
          <span className="font-semibold text-steel-soft">Disclaimer:</span>{' '}
          {draftshield.disclaimer}
        </p>
      </div>
    </section>
  );
}
