import { useState } from 'react';
import { ArrowRight, Check, Mail, MapPin, Route } from 'lucide-react';
import { contactCopy, interestOptions, site } from '../data/site';
import { useReveal } from '../hooks/useMotion';

type Status = 'idle' | 'sending' | 'done';

export function Contact() {
  const ref = useReveal<HTMLElement>();
  const [status, setStatus] = useState<Status>('idle');
  const [picked, setPicked] = useState<string[]>([interestOptions[0]]);
  const [form, setForm] = useState({ name: '', email: '', company: '', detail: '' });

  const toggle = (item: string) =>
    setPicked((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item],
    );

  const ready = form.name.trim().length > 1 && /\S+@\S+\.\S+/.test(form.email);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    setStatus('sending');
    window.setTimeout(() => setStatus('done'), 900);
  };

  return (
    <section id="contact" ref={ref} className="relative scroll-mt-24 pb-8 pt-24 sm:pt-32">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-hairline bg-white p-6 shadow-lift sm:rounded-[2.5rem] sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand/15 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-jade/10 blur-[120px]" />

          <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Left */}
            <div className="reveal">
              <span className="eyebrow">
                <span className="h-px w-8 bg-gradient-to-r from-brand to-transparent" />
                {contactCopy.eyebrow}
              </span>
              <h2 className="mt-5 font-display text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.02em] text-ink sm:text-[2.75rem] lg:text-[3.1rem]">
                Discover <em className="font-serif italic text-gradient">tailored solutions</em> for
                your business transformation.
              </h2>
              <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-steel">
                {contactCopy.body}
              </p>

              <ul className="mt-9 space-y-3">
                <ContactRow icon={Mail} label={site.email} href={`mailto:${site.email}`} />
                <ContactRow icon={MapPin} label={site.location} />
                <ContactRow icon={Route} label={site.reach} />
              </ul>

              <div className="mt-9 flex items-center gap-3 rounded-2xl border border-hairline bg-canvas px-4 py-3.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-brand" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                <p className="text-[13px] text-steel-soft">
                  Replies within <span className="font-medium text-ink">one business day</span>
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="reveal" style={{ transitionDelay: '120ms' }}>
              {status === 'done' ? (
                <div className="flex h-full min-h-[26rem] flex-col items-center justify-center rounded-3xl border border-brand/25 bg-brand-tint p-8 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-white">
                    <Check className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-3xl font-semibold text-ink">
                    Message received.
                  </h3>
                  <p className="mt-2 max-w-xs text-[14.5px] leading-relaxed text-steel">
                    Thanks, {form.name.split(' ')[0] || 'there'} — we'll be in touch within one
                    business day with next steps.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-medium text-brand-deep underline decoration-brand/40 underline-offset-4 transition hover:text-ink"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  className="rounded-3xl border border-hairline bg-canvas/60 p-5 sm:p-7"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      placeholder="Alex Rivera"
                      required
                    />
                    <Field
                      label="Work email"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      placeholder="alex@company.com"
                      type="email"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <Field
                      label="Company"
                      value={form.company}
                      onChange={(v) => setForm({ ...form, company: v })}
                      placeholder="Company name"
                    />
                  </div>

                  <fieldset className="mt-6">
                    <legend className="label">What do you need?</legend>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((item) => {
                        const on = picked.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggle(item)}
                            aria-pressed={on}
                            className={`rounded-full border px-3.5 py-1.5 text-[12.5px] transition-all duration-300 ${
                              on
                                ? 'border-brand/45 bg-brand-tint font-medium text-brand-deep'
                                : 'border-hairline bg-white text-steel-soft hover:border-brand/30 hover:text-ink'
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-6">
                    <label htmlFor="detail" className="label">
                      Tell us about your project
                    </label>
                    <textarea
                      id="detail"
                      rows={4}
                      value={form.detail}
                      onChange={(e) => setForm({ ...form, detail: e.target.value })}
                      placeholder="What are you trying to build, replace, or fix?"
                      className="field resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!ready || status === 'sending'}
                    className="btn-primary group mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-[11.5px] text-steel-mute">
                    We use your details only to respond to your inquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
}: {
  icon: typeof MapPin;
  label: string;
  href?: string;
}) {
  const inner = (
    <div className="group flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-xl border border-hairline bg-canvas text-steel-soft transition-colors group-hover:border-brand/35 group-hover:text-brand-deep">
        <Icon className="h-4 w-4" strokeWidth={1.7} />
      </span>
      <span className="text-[14px] text-steel-soft transition-colors group-hover:text-ink">
        {label}
      </span>
    </div>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="block">
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {required && <span className="ml-1 text-brand-deep">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="field"
      />
    </div>
  );
}
