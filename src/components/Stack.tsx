import { capabilities } from '../data/site';
import { useReveal } from '../hooks/useMotion';
import { SectionHeading } from './SectionHeading';

const marqueeItems = [
  'C#',
  'PHP',
  'Laravel',
  'Python',
  'JavaScript',
  'React',
  'Node.js',
  '.NET',
  'Azure',
  'Linux',
  'Docker',
  'Claude',
  'Grok',
  'RAG',
  'ETL',
  'APIs',
];

export function Stack() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="stack" ref={ref} className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Tools we use"
              title="Problem-solving"
              italic="and implementation."
              description="We solve complex problems and implement robust applications using PHP, Laravel, C#, and Python. Our solutions are efficient, effective, and tailored to your business requirements."
            />
          </div>

          <div className="reveal divide-y divide-hairline border-y border-hairline">
            {capabilities.map((group, i) => (
              <div
                key={group.group}
                className="group flex flex-col gap-3 py-6 transition-colors sm:flex-row sm:items-start sm:gap-8"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex w-40 shrink-0 items-center gap-3">
                  <span className="font-mono text-[10.5px] text-steel-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-[14px] font-semibold text-ink">{group.group}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-hairline bg-white px-3 py-1.5 text-[12.5px] text-steel shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-tint hover:text-brand-deep"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="reveal relative mt-16 overflow-hidden py-4 mask-fade-x">
        <div className="flex w-max animate-marquee items-center gap-10">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10">
              <span className="font-display text-2xl font-medium text-steel-faint transition-colors hover:text-navy">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand/40" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
