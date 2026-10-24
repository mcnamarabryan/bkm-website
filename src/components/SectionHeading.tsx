import type { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  italic,
  description,
  align = 'left',
  children,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  description?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}) {
  return (
    <div
      className={`reveal flex flex-col gap-5 ${
        align === 'center' ? 'items-center text-center' : 'items-start'
      }`}
    >
      <span className="eyebrow">
        <span className="h-px w-8 bg-gradient-to-r from-brand to-transparent" />
        {eyebrow}
      </span>
      <h2 className="max-w-3xl text-balance font-display text-[2.35rem] font-semibold leading-[1.05] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.4rem]">
        {title}{' '}
        {italic && (
          <em className="font-serif italic font-normal text-gradient">{italic}</em>
        )}
      </h2>
      {description && (
        <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-steel">{description}</p>
      )}
      {children}
    </div>
  );
}
