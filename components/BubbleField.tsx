import type { CSSProperties } from "react";

/*
 * Glas-Seifenblasen-Feld als viewport-feste Ebene über der GANZEN Seite:
 *   - liegt über dem Hero-Hintergrund, aber HINTER Nav-Text und den
 *     Projekt-Karten-Labels (niedriger z-index als Nav/ProjectStack),
 *   - bewegt sich NICHT durchs Scrollen (kein Springen über den Projekten),
 *   - die Blasen driften nur autonom (Lavalampe).
 * Die Maus-Interaktion (Gelee-Effekt) + Custom Cursor + Deck-Wobble liegen in
 * FlairLayer und greifen per [data-bubble] auf diese Elemente zu.
 *
 * Performance: backdrop-filter mit SVG-Verzerrung ist teuer — daher bewusst
 * wenige Blasen und ein schlanker Filter (1 Oktave, kleine Filter-Region).
 */

export const IRIS =
  "conic-gradient(from {ANGLE}, rgba(255,80,170,0.34), rgba(60,190,255,0.40), rgba(255,220,60,0.32), rgba(140,90,255,0.40), rgba(50,255,180,0.34), rgba(255,80,170,0.34))";
export const IRIS_MASK =
  "radial-gradient(circle at 50% 50%, transparent 50%, #000 76%, rgba(0,0,0,0.4) 92%, transparent 100%)";

export const NEUTRAL_BG =
  "radial-gradient(circle at 32% 27%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 22%, rgba(255,255,255,0.02) 55%, rgba(255,255,255,0.10) 80%, rgba(255,255,255,0.30) 94%, rgba(255,255,255,0.06) 100%)";
const ACCENT_BG =
  "radial-gradient(circle at 32% 27%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 22%, rgba(232,69,44,0.02) 55%, rgba(232,69,44,0.06) 80%, rgba(232,120,90,0.22) 94%, rgba(232,69,44,0.05) 100%)";
export const NEUTRAL_SHADOW =
  "inset 0 0 20px rgba(255,255,255,0.35), inset -14px -18px 34px rgba(17,17,17,0.05), inset 12px 14px 26px rgba(255,255,255,0.55), 0 22px 50px rgba(17,17,17,0.06)";
const ACCENT_SHADOW =
  "inset 0 0 20px rgba(255,255,255,0.35), inset -14px -18px 34px rgba(180,70,45,0.07), inset 12px 14px 26px rgba(255,255,255,0.55), 0 22px 50px rgba(17,17,17,0.06)";

type Bubble = {
  pos: CSSProperties;
  size: string;
  accent?: boolean;
  anim: string;
  delay?: string;
  angle: string;
  hue: number;
  sat: number;
  aspect: number;
  op: number;
};

// Über den ganzen Screen verteilt (top in % des Viewports). hue/sat/aspect/op
// variieren pro Blase bewusst unregelmäßig, damit keine zwei gleich aussehen.
const BUBBLES: Bubble[] = [
  { pos: { top: "4%", left: "6%" }, size: "8vw", anim: "pd-lava-a 19s ease-in-out infinite, pd-shape 12s ease-in-out infinite", angle: "210deg", hue: -22, sat: 1.15, aspect: 1.06, op: 1 },
  { pos: { top: "10%", right: "12%" }, size: "5.5vw", accent: true, anim: "pd-lava-c 26s ease-in-out infinite, pd-shape 15s ease-in-out infinite", delay: "-9s", angle: "30deg", hue: 18, sat: 0.85, aspect: 0.93, op: 0.88 },
  { pos: { top: "18%", left: "26%" }, size: "6.5vw", anim: "pd-lava-b 23s ease-in-out infinite, pd-shape 13.5s ease-in-out infinite", delay: "-5s", angle: "120deg", hue: 42, sat: 1.3, aspect: 1.11, op: 0.95 },
  { pos: { top: "24%", right: "30%" }, size: "5vw", anim: "pd-lava-c 30s ease-in-out infinite, pd-shape 17s ease-in-out infinite", delay: "-16s", angle: "300deg", hue: -48, sat: 0.75, aspect: 0.9, op: 1 },
  { pos: { top: "33%", left: "10%" }, size: "7vw", anim: "pd-lava-b 25s ease-in-out infinite, pd-shape 14s ease-in-out infinite", delay: "-11s", angle: "80deg", hue: 8, sat: 1.05, aspect: 1.02, op: 0.82 },
  { pos: { top: "40%", right: "8%" }, size: "6vw", accent: true, anim: "pd-lava-a 29s ease-in-out infinite, pd-shape 16s ease-in-out infinite", delay: "-7s", angle: "260deg", hue: 33, sat: 0.9, aspect: 1.08, op: 1 },
  { pos: { top: "48%", left: "40%" }, size: "5.5vw", anim: "pd-lava-c 22s ease-in-out infinite, pd-shape 13s ease-in-out infinite", delay: "-3s", angle: "150deg", hue: -12, sat: 1.2, aspect: 0.95, op: 0.9 },
  { pos: { top: "55%", right: "22%" }, size: "7.5vw", accent: true, anim: "pd-lava-b 24s ease-in-out infinite, pd-shape 14.5s ease-in-out infinite", delay: "-6s", angle: "330deg", hue: -35, sat: 1.0, aspect: 1.14, op: 0.85 },
  { pos: { top: "63%", left: "16%" }, size: "6vw", anim: "pd-lava-c 28s ease-in-out infinite, pd-shape 16.5s ease-in-out infinite", delay: "-18s", angle: "200deg", hue: 25, sat: 0.8, aspect: 0.88, op: 1 },
  { pos: { top: "72%", right: "14%" }, size: "7vw", accent: true, anim: "pd-lava-a 21s ease-in-out infinite, pd-shape 13.5s ease-in-out infinite", delay: "-10s", angle: "100deg", hue: 5, sat: 1.25, aspect: 1.04, op: 0.92 },
  { pos: { top: "80%", left: "32%" }, size: "5.5vw", anim: "pd-lava-b 26s ease-in-out infinite, pd-shape 15s ease-in-out infinite", delay: "-4s", angle: "50deg", hue: -40, sat: 0.95, aspect: 0.97, op: 1 },
  { pos: { top: "90%", right: "26%" }, size: "6.5vw", anim: "pd-lava-c 29s ease-in-out infinite, pd-shape 15.5s ease-in-out infinite", delay: "-12s", angle: "60deg", hue: 15, sat: 1.1, aspect: 1.09, op: 0.88 },
];

function BubbleView({ b }: { b: Bubble }) {
  // Glanzpunkt pro Blase leicht versetzt, damit das Licht nicht bei allen
  // Blasen aus derselben Richtung zu kommen scheint.
  const shine: CSSProperties = {
    position: "absolute",
    top: `${9 + (b.hue % 7)}%`,
    left: `${14 + (b.hue % 5)}%`,
    width: "24%",
    height: "11%",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.98)",
    filter: "blur(2px)",
    transform: `rotate(${-24 + b.hue}deg)`,
  };
  const counter: CSSProperties = {
    position: "absolute",
    bottom: "9%",
    right: "12%",
    width: "14%",
    height: "7%",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.5)",
    filter: "blur(4px)",
    transform: "rotate(-18deg)",
  };
  const iris = IRIS.replace("{ANGLE}", b.angle);
  return (
    <div
      data-bubble
      style={{
        position: "absolute",
        ...b.pos,
        width: b.size,
        height: `calc(${b.size} * ${b.aspect})`,
        borderRadius: "50%",
        overflow: "hidden",
        opacity: b.op,
        filter: `hue-rotate(${b.hue}deg) saturate(${b.sat})`,
        background: b.accent ? ACCENT_BG : NEUTRAL_BG,
        backdropFilter: "url(#pd-glass)",
        WebkitBackdropFilter: "url(#pd-glass)",
        border: "0.5px solid rgba(255,255,255,0.75)",
        boxShadow: b.accent ? ACCENT_SHADOW : NEUTRAL_SHADOW,
        animation: b.anim,
        animationDelay: b.delay,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: iris,
          WebkitMaskImage: IRIS_MASK,
          maskImage: IRIS_MASK,
        }}
      />
      <div style={shine} />
      <div style={counter} />
    </div>
  );
}

export default function BubbleField() {
  return (
    <>
      {/* SVG-Glasfilter (Chromium) — schlank gehalten (1 Oktave, kleine Region) */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter
            id="pd-glass"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.004"
              numOctaves={1}
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={34}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Viewport-feste Ebene über der ganzen Seite */}
      <div
        className="pd-bubble-layer"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          // Über allen Inhalten (Nav, Rondell-Karten, Über-mich, Footer),
          // nur unter dem Custom Cursor (900).
          zIndex: 850,
          pointerEvents: "none",
        }}
      >
        {BUBBLES.map((b, i) => (
          <BubbleView key={i} b={b} />
        ))}
      </div>
    </>
  );
}
