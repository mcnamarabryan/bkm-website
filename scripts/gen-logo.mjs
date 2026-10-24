/**
 * Generates the BKM triskelion arm paths.
 *
 * Geometry: a regular hexagon ring (outer radius R, thickness T) divided into
 * three 120° chevron bands. One end of each band is cut square (trailing edge),
 * the other tapers to a point (leading edge), producing the pinwheel.
 */
const C = 50;
const R = 47;
const T = 15;
const rIn = R - T / Math.cos(Math.PI / 6);

const vert = (i, rad) => {
  const a = ((-90 + i * 60) * Math.PI) / 180;
  return [C + rad * Math.cos(a), C + rad * Math.sin(a)];
};

const f = (n) => Number(n.toFixed(2));
const P = (p) => `${f(p[0])},${f(p[1])}`;

/** Point on the hexagon perimeter; s is in edge units [0,6). */
function walk(s, rad) {
  const fl = Math.floor(s);
  const i = ((fl % 6) + 6) % 6;
  const fr = s - fl;
  const a = vert(i, rad);
  const b = vert((i + 1) % 6, rad);
  return [a[0] + (b[0] - a[0]) * fr, a[1] + (b[1] - a[1]) * fr];
}

const GAP = 0.11; // dark separation between arms, in edge units
const DELTA = 0; // no inner-edge overshoot; keeps each tip a clean radial cut

function arm(k) {
  const s0 = 2 * k + GAP;
  const s1 = 2 * k + 1;
  const s2 = 2 * k + 2 - GAP;
  return [
    walk(s0, R),
    walk(s1, R),
    walk(s2, R),
    walk(s2 - DELTA, rIn),
    walk(s1, rIn),
    walk(s0, rIn),
  ];
}

const paths = [0, 1, 2].map((k) => `M${arm(k).map(P).join(' L')} Z`);

console.log(`inner radius: ${f(rIn)}`);
paths.forEach((d, i) => console.log(`arm${i}: ${d}`));
