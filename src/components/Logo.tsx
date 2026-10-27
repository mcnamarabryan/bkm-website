/**
 * BKM Technology Solutions — brand identity.
 *
 * The mark is a hexagonal triskelion: three interlocking chevron arms cut from
 * a hexagon ring, rotating clockwise out of a shared center. Rendered as pure
 * SVG so it stays crisp at any size, on light or dark surfaces, and can inherit
 * color when needed.
 *
 * Variants
 *   <LogoMark />                     — the mark alone
 *   <Logo variant="compact" />       — mark + stacked BKM / TECHNOLOGY SOLUTIONS
 *   <Logo variant="full" />          — mark + BKM Technology Solutions LLC + tagline
 *
 * ── PREFER A RASTER/SVG FILE? ─────────────────────────────────────────────────
 * Drop your own file into `public/` and point LOGO_SRC at it. Every usage
 * (nav, footer, anywhere) switches over automatically with no other edits.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const LOGO_SRC: string | null = null;

/** Official brand green, sampled from the logo. */
export const brandGreen = {
  base: '#2FA24C',
  light: '#4CC46A',
  deep: '#1B7A36',
} as const;

type MarkProps = {
  size?: number;
  className?: string;
  /** Adds a soft green bloom behind the mark. */
  glow?: boolean;
  /** Adds the recessed navy plate behind the mark. */
  plated?: boolean;
  /** Unique id suffix so multiple instances don't collide on <defs>. */
  uid?: string;
};

export function LogoMark({
  size = 40,
  className = '',
  glow = false,
  plated = false,
  uid = 'a',
}: MarkProps) {
  const gid = `bkm-mark-${uid}`;
  const sid = `bkm-plate-${uid}`;

  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <span
          aria-hidden
          className="absolute inset-[-18%] rounded-full opacity-70 blur-[10px] transition-opacity duration-500 group-hover/logo:opacity-100"
          style={{
            background:
              'radial-gradient(circle, rgba(47,162,76,0.55) 0%, rgba(47,162,76,0.12) 55%, transparent 72%)',
          }}
        />
      )}

      {plated && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-[26%] border border-navy/20 shadow-soft"
          style={{ background: 'linear-gradient(160deg, #22245F 0%, #1B1D52 100%)' }}
        />
      )}

      <svg
        viewBox="0 0 100 100"
        className="relative h-full w-full"
        role="img"
        aria-label="BKM Technology Solutions"
      >
        <defs>
          <linearGradient id={gid} x1="0.15" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor={brandGreen.light} />
            <stop offset="52%" stopColor={brandGreen.base} />
            <stop offset="100%" stopColor={brandGreen.deep} />
          </linearGradient>
          <linearGradient id={sid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Three interlocking chevron arms */}
        <g fill={`url(#${gid})`}>
          <path d="M54.48,5.59 L90.7,26.5 L90.7,68.33 L75.7,61.58 L75.7,35.16 L52.83,21.95 Z" />
          <path d="M86.23,76.08 L50,97 L13.77,76.08 L27.12,66.47 L50,79.68 L72.88,66.47 Z" />
          <path d="M9.3,68.33 L9.3,26.5 L45.52,5.59 L47.17,21.95 L24.3,35.16 L24.3,61.58 Z" />
        </g>

        {/* Subtle top-light so the mark reads three-dimensional on flat fills */}
        <g fill={`url(#${sid})`} style={{ mixBlendMode: 'screen' }}>
          <path d="M54.48,5.59 L90.7,26.5 L75.7,35.16 L52.83,21.95 Z" opacity="0.5" />
          <path d="M45.52,5.59 L47.17,21.95 L24.3,35.16 L9.3,26.5 Z" opacity="0.35" />
        </g>
      </svg>
    </span>
  );
}

export function Logo({
  size = 36,
  variant = 'compact',
  className = '',
  plated = false,
  glow = false,
  uid = 'nav',
}: {
  size?: number;
  variant?: 'compact' | 'full' | 'mark';
  className?: string;
  plated?: boolean;
  glow?: boolean;
  uid?: string;
}) {
  if (LOGO_SRC) {
    return (
      <span className={`group/logo flex items-center ${className}`}>
        <img
          src={LOGO_SRC}
          alt="BKM Technology Solutions"
          style={{ height: size }}
          className="w-auto object-contain"
        />
      </span>
    );
  }

  if (variant === 'mark') {
    return (
      <span className={`group/logo inline-flex ${className}`}>
        <LogoMark size={size} plated={plated} glow={glow} uid={uid} />
      </span>
    );
  }

  if (variant === 'compact') {
    return (
      <span className={`group/logo flex items-center gap-2.5 ${className}`}>
        <LogoMark size={size} plated={plated} glow={glow} uid={uid} />
        <span className="flex flex-col justify-center leading-none">
          <span
            className="font-semibold tracking-[-0.01em] text-ink"
            style={{ fontSize: Math.round(size * 0.42) }}
          >
            BKM
          </span>
          <span
            className="mt-[3px] whitespace-nowrap font-mono uppercase text-steel-mute"
            style={{
              fontSize: Math.max(6.5, Math.round(size * 0.16)),
              letterSpacing: '0.15em',
            }}
          >
            Technology Solutions
          </span>
        </span>
      </span>
    );
  }

  // full lockup
  return (
    <span className={`group/logo flex items-center gap-4 ${className}`}>
      <LogoMark size={size} plated={plated} glow={glow} uid={uid} />
      <span className="flex flex-col leading-none">
        <span
          className="text-ink"
          style={{ fontSize: Math.round(size * 0.5), letterSpacing: '-0.015em' }}
        >
          <span className="font-semibold">BKM</span>{' '}
          <span className="font-light text-steel-soft">Technology Solutions</span>{' '}
          <span className="font-light text-steel-mute">LLC</span>
        </span>
        <span
          className="mt-2.5 font-mono uppercase text-steel-mute"
          style={{
            fontSize: Math.max(7.5, Math.round(size * 0.19)),
            letterSpacing: '0.34em',
          }}
        >
          Stable&nbsp;&middot;&nbsp;Secure&nbsp;&middot;&nbsp;Growth
        </span>
      </span>
    </span>
  );
}
