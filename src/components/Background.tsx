/**
 * Ambient page backdrop.
 *
 * Light theme: an almost-white canvas with a faint navy grid, a soft green
 * bloom anchored behind the hero, and one cool navy wash toward the footer.
 * Everything is extremely low contrast so text stays legible (WCAG AA).
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas">
      {/* Warm-to-cool base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_-15%,#ffffff_0%,#f6f8fa_48%,#eef2f7_100%)]" />

      {/* Green bloom behind the hero */}
      <div className="absolute -left-[14%] top-[-18%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(47,162,76,0.16),transparent_68%)] blur-3xl animate-drift" />

      {/* Cool navy wash, right side */}
      <div
        className="absolute right-[-18%] top-[4%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(34,36,95,0.10),transparent_68%)] blur-3xl animate-drift"
        style={{ animationDelay: '-7s' }}
      />

      {/* Faint green tide near the bottom */}
      <div
        className="absolute bottom-[-20%] left-[26%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(47,162,76,0.10),transparent_70%)] blur-3xl animate-drift"
        style={{ animationDelay: '-14s' }}
      />

      {/* Engineering grid, faded out toward the edges */}
      <div className="absolute inset-0 grid-lines opacity-70 [mask-image:radial-gradient(78%_62%_at_50%_18%,#000_5%,transparent_82%)]" />
    </div>
  );
}
