import { about } from '../data/site';
import { useReveal } from '../hooks/useMotion';
import { SectionHeading } from './SectionHeading';

export function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="About BKM"
              title="Planning, building,"
              italic="and standing behind it."
              description={about.intro}
            />

            <p
              className="reveal mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-steel-soft"
              style={{ transitionDelay: '160ms' }}
            >
              {about.close}
            </p>

            <div
              className="reveal mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-hairline bg-white px-5 py-4 shadow-soft"
              style={{ transitionDelay: '220ms' }}
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-steel-mute">
                Tagline
              </span>
              <span className="h-4 w-px bg-hairline" />
              <span className="font-display text-lg font-medium text-navy">
                Stable · Secure · Growth
              </span>
            </div>
          </div>

          <ol className="relative">
            {about.pillars.map((item, i) => (
              <li
                key={item.title}
                className="reveal group relative"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-5 pb-8 sm:gap-7">
                  <div className="relative shrink-0">
                    <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-hairline bg-white font-mono text-[13px] text-steel-soft shadow-soft transition-all duration-500 group-hover:border-brand/50 group-hover:text-brand-deep">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="absolute inset-0 rounded-2xl bg-brand/0 blur-md transition-all duration-500 group-hover:bg-brand/20" />
                  </div>

                  <div className="flex-1 pt-1.5">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-[1.7rem] font-semibold leading-none text-ink">
                        {item.title}
                      </h3>
                      <span className="h-px flex-1 bg-gradient-to-r from-hairline to-transparent" />
                    </div>
                    <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-steel">
                      {item.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
