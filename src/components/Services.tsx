import { useRef } from 'react';
import { Boxes, Cpu, Database, Layers, Sparkles, Wrench } from 'lucide-react';
import { services, type Accent, type Service } from '../data/site';
import { useReveal } from '../hooks/useMotion';
import { SectionHeading } from './SectionHeading';

const icons: Record<string, typeof Boxes> = {
  'custom-apps': Layers,
  integration: Boxes,
  maintenance: Cpu,
  etl: Database,
  productivity: Sparkles,
  'problem-solving': Wrench,
};

/**
 * Accent tokens for the light theme. Every value resolves to a defined
 * Tailwind color (brand / navy / jade) or a literal rgba — nothing undefined.
 */
const accents: Record<
  Accent,
  { chip: string; text: string; hoverBorder: string; glow: string; dot: string }
> = {
  brand: {
    chip: 'border-brand/20 bg-brand-tint',
    text: 'text-brand-deep',
    hoverBorder: 'group-hover:border-brand/45',
    glow: 'rgba(47,162,76,0.16)',
    dot: '#2FA24C',
  },
  navy: {
    chip: 'border-navy/15 bg-navy-soft',
    text: 'text-navy',
    hoverBorder: 'group-hover:border-navy/30',
    glow: 'rgba(34,36,95,0.12)',
    dot: '#22245F',
  },
  jade: {
    chip: 'border-jade/20 bg-jade-tint',
    text: 'text-jade-deep',
    hoverBorder: 'group-hover:border-jade/35',
    glow: 'rgba(15,118,110,0.14)',
    dot: '#0F766E',
  },
};

export function Services() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="services" ref={ref} className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Tailored Solutions for Business Transformation"
          title="What we build,"
          italic="and how it holds up."
          description="Custom solutions that fit your exact requirements. By listening to our clients, we deliver real value and drive innovation — supporting both cutting-edge technologies and legacy systems."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = icons[service.id] ?? Boxes;
  const accent = accents[service.accent];
  const isFeature = Boolean(service.feature);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <article
      className={`reveal group relative overflow-hidden rounded-3xl ${service.span}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div
        ref={cardRef}
        onPointerMove={onMove}
        className={`card-surface relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:shadow-lift sm:p-7 ${accent.hoverBorder}`}
      >
        {/* pointer spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(340px circle at var(--mx,50%) var(--my,50%), ${accent.glow}, transparent 70%)`,
          }}
        />

        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between">
            <span
              className={`grid h-11 w-11 place-items-center rounded-2xl border transition-transform duration-500 group-hover:scale-105 ${accent.chip} ${accent.text}`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <span className="font-mono text-[11px] tracking-[0.2em] text-steel-faint">
              {service.index}
            </span>
          </div>

          <h3
            className={`mt-6 font-display font-semibold tracking-[-0.015em] text-ink ${
              isFeature ? 'text-3xl sm:text-[2.4rem]' : 'text-2xl'
            }`}
          >
            {service.title}
          </h3>

          <p
            className={`mt-3 leading-relaxed text-steel ${
              isFeature ? 'max-w-xl text-[15.5px]' : 'text-[14.5px]'
            }`}
          >
            {service.summary}
          </p>

          <ul
            className={`mt-auto grid gap-x-6 gap-y-2.5 pt-6 ${
              isFeature ? 'sm:grid-cols-2 sm:pt-8' : ''
            }`}
          >
            {service.points.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[13px] text-steel-soft">
                <span
                  className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: accent.dot, opacity: 0.75 }}
                />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
