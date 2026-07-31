"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ImageSlot from "./ImageSlot";
import { projects } from "@/lib/projects";

const N = projects.length;
const EASE = "cubic-bezier(0.22, 0.8, 0.24, 1)";
const FRONT_TOP = 0.58; // matches Karten-Anker `top: 58%`
const MAX_LIFT_PX = 380; // Cursor-Weg nach oben bis volle Auffächerung

/* Stumme Autoplay-Vorschau für Projekte mit Hero-Video (Deck-Karte ist ein
 * Link, daher keine Controls). Respektiert prefers-reduced-motion — dann
 * bleibt nur das Poster-Bild stehen. */
function StackVideo({
  src,
  webm,
  poster,
  alt,
}: {
  src: string;
  webm?: string;
  poster?: string;
  alt: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={alt}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}

/* Transform pro Stapeltiefe d (0 = vorderste Karte), abhängig vom
 * Auffächer-Grad `spread` (0 = geschlossener Stapel, 1 = Rondell voll
 * offen): Kartenabstand wächst, Tiefenversatz flacht ab, Deckkraft steigt.
 * Enger, vielschichtiger Stapel (Screenshot-Turm-Referenz) statt weniger
 * Karten mit starkem Fade-out. */
function cardStyle(d: number, spread: number) {
  const gap = 30 + spread * (150 - 30);
  const zStep = 110 - spread * (110 - 26);
  const rot = 10 - spread * 6;
  const closedOpacity = Math.max(0.55, 1 - d * 0.065);
  const opacity = closedOpacity + spread * (1 - closedOpacity);
  return {
    transform: `translate(-50%,-50%) translateY(${-d * gap}px) translateZ(${-d * zStep}px) rotateX(${rot}deg)`,
    zIndex: 200 - Math.round(d * 12),
    opacity,
  };
}

export default function ProjectStack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [spread, setSpread] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [forceOpen, setForceOpen] = useState(false);
  const [hinted, setHinted] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setForceOpen(reduced || coarse);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (forceOpen) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const clientY = e.clientY;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = wrap.getBoundingClientRect();
      const frontY = rect.top + rect.height * FRONT_TOP;
      const t = Math.max(0, Math.min(1, (frontY - clientY) / MAX_LIFT_PX));
      setSpread(t);
      if (t > 0.06) setHinted(true);
    });
  };

  const onMouseLeave = () => {
    if (forceOpen) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    setSpread(0);
    setHoverIndex(0);
  };

  const effectiveSpread = forceOpen ? 1 : spread;

  return (
    <section
      id="arbeiten"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        perspective: "1500px",
        perspectiveOrigin: "50% 16%",
      }}
    >
      {/* Fade-Saum oben */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6vh",
          background:
            "linear-gradient(to bottom, #FFFFFF 0%, rgba(255,255,255,0) 100%)",
          zIndex: 350,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "40px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          zIndex: 400,
        }}
      >
        {"0" + (hoverIndex + 1) + " / 0" + N}
      </div>
      <div
        style={{
          position: "absolute",
          right: "40px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "13px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          textAlign: "right",
          zIndex: 400,
        }}
      >
        {projects[hoverIndex].title}
      </div>
      {!forceOpen && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "28px",
            transform: "translateX(-50%)",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            opacity: hinted ? 0 : 0.5,
            zIndex: 250,
            transition: "opacity 0.4s ease",
          }}
        >
          Cursor nach oben über die Karten bewegen ↑
        </div>
      )}

      <div
        ref={wrapRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
        }}
      >
        {projects.map((p, i) => {
          const s = cardStyle(i, effectiveSpread);
          const clickable = i === 0 || s.opacity > 0.5;
          return (
            <Link
              key={p.slug}
              href={`/projekt/${p.slug}`}
              onMouseEnter={() => setHoverIndex(i)}
              style={{
                position: "absolute",
                left: "50%",
                top: "58%",
                width: "min(68vw, 900px)",
                transform: s.transform,
                zIndex: s.zIndex,
                opacity: s.opacity,
                transition: forceOpen ? "none" : "opacity 0.2s ease",
                willChange: "transform",
                backfaceVisibility: "hidden",
                pointerEvents: clickable ? "auto" : "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                  background: "var(--img-bg)",
                  border: "1px solid rgba(17,17,17,0.16)",
                  boxShadow: "0 16px 40px rgba(17,17,17,0.12)",
                }}
              >
                {p.heroVideo ? (
                  <StackVideo
                    src={p.heroVideo}
                    webm={p.heroVideoWebm}
                    poster={p.heroVideoPoster}
                    alt={p.heroPlaceholder}
                  />
                ) : (
                  <ImageSlot placeholder={`Projektbild ${i + 1} hier ablegen`} />
                )}
                {/* Titel-Overlay statt eigener Header-Leiste — Karte ist der
                    Screenshot selbst, wie im Rondell-Vorbild. */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    padding: "10px 16px",
                    background:
                      "linear-gradient(to bottom, rgba(17,17,17,0.55), rgba(17,17,17,0))",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "10px",
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#ffffff",
                        opacity: 0.85,
                      }}
                    >
                      {p.index}/
                    </span>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "#ffffff",
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#ffffff",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      opacity: 0.75,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
