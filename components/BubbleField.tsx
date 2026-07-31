import type { CSSProperties } from "react";

/*
 * Glas-Seifenblasen-Feld als viewport-feste Ebene über der GANZEN Seite:
 *   - liegt über Hero, Projekten und Footer (wird nirgends abgeschnitten),
 *   - bewegt sich NICHT durchs Scrollen (kein Springen über den Projekten),
 *   - die Blasen driften nur autonom (Lavalampe).
 * Die Maus-Interaktion (Gelee-Effekt) + Custom Cursor + Deck-Wobble liegen in
 * FlairLayer und greifen per [data-bubble] auf diese Elemente zu.
 *
 * Performance: backdrop-filter mit SVG-Verzerrung ist teuer — daher bewusst
 * wenige Blasen und ein schlanker Filter (1 Oktave, kleine Filter-Region).
 */

export const IRIS =
  "conic-gradient(from {ANGLE}, rgba(255,120,180,0.10), rgba(120,220,255,0.13), rgba(255,235,140,0.10), rgba(170,140,255,0.13), rgba(120,255,210,0.10), rgba(255,120,180,0.10))";
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
};

// Über den ganzen Screen verteilt (top in % des Viewports).
const BUBBLES: Bubble[] = [
  { pos: { top: "4%", left: "6%" }, size: "8vw", anim: "pd-lava-a 19s ease-in-out infinite, pd-shape 12s ease-in-out infinite", angle: "210deg" },
  { pos: { top: "10%", right: "12%" }, size: "5.5vw", accent: true, anim: "pd-lava-c 26s ease-in-out infinite, pd-shape 15s ease-in-out infinite", delay: "-9s", angle: "30deg" },
  { pos: { top: "18%", left: "26%" }, size: "6.5vw", anim: "pd-lava-b 23s ease-in-out infinite, pd-shape 13.5s ease-in-out infinite", delay: "-5s", angle: "120deg" },
  { pos: { top: "24%", right: "30%" }, size: "5vw", anim: "pd-lava-c 30s ease-in-out infinite, pd-shape 17s ease-in-out infinite", delay: "-16s", angle: "300deg" },
  { pos: { top: "33%", left: "10%" }, size: "7vw", anim: "pd-lava-b 25s ease-in-out infinite, pd-shape 14s ease-in-out infinite", delay: "-11s", angle: "80deg" },
  { pos: { top: "40%", right: "8%" }, size: "6vw", accent: true, anim: "pd-lava-a 29s ease-in-out infinite, pd-shape 16s ease-in-out infinite", delay: "-7s", angle: "260deg" },
  { pos: { top: "48%", left: "40%" }, size: "5.5vw", anim: "pd-lava-c 22s ease-in-out infinite, pd-shape 13s ease-in-out infinite", delay: "-3s", angle: "150deg" },
  { pos: { top: "55%", right: "22%" }, size: "7.5vw", accent: true, anim: "pd-lava-b 24s ease-in-out infinite, pd-shape 14.5s ease-in-out infinite", delay: "-6s", angle: "330deg" },
  { pos: { top: "63%", left: "16%" }, size: "6vw", anim: "pd-lava-c 28s ease-in-out infinite, pd-shape 16.5s ease-in-out infinite", delay: "-18s", angle: "200deg" },
  { pos: { top: "72%", right: "14%" }, size: "7vw", accent: true, anim: "pd-lava-a 21s ease-in-out infinite, pd-shape 13.5s ease-in-out infinite", delay: "-10s", angle: "100deg" },
  { pos: { top: "80%", left: "32%" }, size: "5.5vw", anim: "pd-lava-b 26s ease-in-out infinite, pd-shape 15s ease-in-out infinite", delay: "-4s", angle: "50deg" },
  { pos: { top: "90%", right: "26%" }, size: "6.5vw", anim: "pd-lava-c 29s ease-in-out infinite, pd-shape 15.5s ease-in-out infinite", delay: "-12s", angle: "60deg" },
];

function BubbleView({ b }: { b: Bubble }) {
  const shine: CSSProperties = {
    position: "absolute",
    top: "11%",
    left: "15%",
    width: "26%",
    height: "13%",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.85)",
    filter: "blur(5px)",
    transform: "rotate(-24deg)",
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
        height: b.size,
        borderRadius: "50%",
        overflow: "hidden",
        background: b.accent ? ACCENT_BG : NEUTRAL_BG,
        // Glasklare Lichtbrechung (Liquid/Fisheye) — KEIN Blur, sonst matt.
        backdropFilter: "url(#pd-glass)",
        WebkitBackdropFilter: "url(#pd-glass)",
        border: "1px solid rgba(255,255,255,0.95)",
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
          zIndex: 500,
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
