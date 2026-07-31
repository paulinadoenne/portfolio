"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ImageSlot from "./ImageSlot";
import { projects } from "@/lib/projects";

const N = projects.length;
const FRONT_TOP = 0.58; // matches Karten-Anker `top: 58%`
const PX_PER_CARD = 92; // Cursor-Weg nach oben, um ein Blatt abzulegen

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

const REST_ROT = 44; // starker Kippwinkel: Stapel wirkt wie von schräg oben betrachtet
const FOCUS_WINDOW = 0.55; // Indexabstand, über den eine Karte "in den Fokus" kommt

/* 0 (kein Fokus) … 1 (Cursor steht exakt auf dieser Karte), sanft geglättet. */
function focusFactor(absD: number) {
  const t = Math.max(0, 1 - absD / FOCUS_WINDOW);
  return t * t * (3 - 2 * t);
}

/* Ruheposition im Stapel für Tiefe d >= 0 (0 = vorderste/aktuelle Karte) —
 * enger, vielschichtiger Turm, stark von oben gekippt. Bleibt der Cursor auf
 * einer Karte stehen (d ≈ 0), richtet sie sich frontal auf und vergrößert
 * sich — wie aus dem Stapel herausgehoben. */
function restStyle(d: number) {
  const gap = 30;
  const zStep = 110;
  const foc = focusFactor(d);
  const rot = REST_ROT * (1 - foc);
  const scale = 1 + foc * 0.34;
  return {
    transform: `translate(-50%,-50%) translateY(${-d * gap}px) translateZ(${-d * zStep}px) rotateX(${rot}deg) scale(${scale})`,
    zIndex: 200 - Math.round(d * 12) + Math.round(foc * 60),
    opacity: Math.max(0.55, 1 - d * 0.065),
  };
}

/* Ein bereits "abgelegtes" Blatt (d < 0, Cursor ist am Blatt vorbeigewandert):
 * fliegt nach unten aus dem Bild — wie eine Rondell-Seite, die man
 * weitergeblättert hat. */
function flyStyle(d: number) {
  const e = -d;
  const ee = Math.min(e, 1);
  return {
    transform: `translate(-50%,-50%) translateY(${e * 70}vh) translateZ(${ee * 160}px) rotateX(${REST_ROT + ee * 26}deg)`,
    zIndex: 300,
    opacity: 1,
  };
}

/* Statische, voll aufgefächerte Ansicht für Touch / prefers-reduced-motion
 * (keine Hover-Geste verfügbar) — alle Karten gleichzeitig sichtbar & klickbar. */
function openStyle(d: number) {
  const gap = 150;
  const zStep = 26;
  const rot = 4;
  return {
    transform: `translate(-50%,-50%) translateY(${-d * gap}px) translateZ(${-d * zStep}px) rotateX(${rot}deg)`,
    zIndex: 200 - Math.round(d * 12),
    opacity: 1,
  };
}

export default function ProjectStack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
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
      const next = Math.max(0, Math.min(N - 1, (frontY - clientY) / PX_PER_CARD));
      setP(next);
      if (next > 0.05) setHinted(true);
    });
  };

  const onMouseLeave = () => {
    if (forceOpen) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    setP(0);
  };

  const displayIndex = forceOpen
    ? hoverIndex
    : Math.max(0, Math.min(N - 1, Math.round(p)));

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
        {"0" + (displayIndex + 1) + " / 0" + N}
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
        {projects[displayIndex].title}
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
        {projects.map((proj, i) => {
          let s: { transform: string; zIndex: number; opacity: number };
          let clickable: boolean;
          if (forceOpen) {
            s = openStyle(i);
            clickable = true;
          } else {
            const d = i - p;
            s = d >= 0 ? restStyle(d) : flyStyle(d);
            // exakt die Karte, die auch in der Kopfzeile angezeigt wird
            clickable = i === displayIndex;
          }
          return (
            <Link
              key={proj.slug}
              href={`/projekt/${proj.slug}`}
              onMouseEnter={forceOpen ? () => setHoverIndex(i) : undefined}
              style={{
                position: "absolute",
                left: "50%",
                top: "58%",
                width: "min(68vw, 900px)",
                transform: s.transform,
                zIndex: s.zIndex,
                opacity: s.opacity,
                transition: forceOpen
                  ? "none"
                  : "transform 0.12s ease-out, opacity 0.12s ease-out",
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
                {proj.heroVideo ? (
                  <StackVideo
                    src={proj.heroVideo}
                    webm={proj.heroVideoWebm}
                    poster={proj.heroVideoPoster}
                    alt={proj.heroPlaceholder}
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
                      {proj.index}/
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
                      {proj.title}
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
                    {proj.tag}
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
