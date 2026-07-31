"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import ImageSlot from "./ImageSlot";
import { projects } from "@/lib/projects";

const N = projects.length;
const EASE = "cubic-bezier(0.22, 0.8, 0.24, 1)";
const FLIP_MS = 650;

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

/* Transform pro Stapeltiefe d (0 = oberste Karte) — unverändert aus dem
 * Handoff übernommen, nur die Auslösung ist jetzt der Cursor statt Scroll. */
function cardStyle(d: number) {
  return {
    transform: `translate(-50%,-50%) translateY(${-d * 56}px) translateZ(${-d * 120}px) rotateX(12deg)`,
    zIndex: 200 - Math.round(d * 12),
    opacity: Math.max(0, Math.min(1, 1 - (d - 4) / 3.8)),
  };
}

export default function ProjectStack() {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const advance = () => {
    if (flipping !== null) return;
    if (reduced) {
      setCurrent((c) => (c + 1) % N);
      return;
    }
    setFlipping(current);
    setTimeout(() => {
      setCurrent((c) => (c + 1) % N);
      setFlipping(null);
    }, FLIP_MS);
  };

  // Ziel-Ruheposition (hinterstes Blatt), in die die flippende Karte
  // am Ende der Aktenordner-Animation übergeht.
  const backRest = cardStyle(N - 1);

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
        {"0" + (current + 1) + " / 0" + N}
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
        {projects[current].title}
      </div>
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
          opacity: current > 0 ? 0 : 0.5,
          zIndex: 250,
          transition: "opacity 0.4s ease",
        }}
      >
        Mit dem Cursor über die Karten gleiten
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
        }}
      >
        {projects.map((p, i) => {
          const d = ((i - current) % N + N) % N;
          const s = cardStyle(d);
          const isTop = d === 0;
          const isFlippingThis = flipping === i;
          const style: CSSProperties = isFlippingThis
            ? {
                position: "absolute",
                left: "50%",
                top: "58%",
                width: "min(68vw, 900px)",
                transformOrigin: "50% 0%",
                animation: `pd-card-flip ${FLIP_MS}ms ${EASE} forwards`,
                ["--flip-y" as string]: `${-(N - 1) * 56}px`,
                ["--flip-z" as string]: `${-(N - 1) * 120}px`,
                ["--flip-op" as string]: String(backRest.opacity),
                ["--flip-zi" as string]: String(backRest.zIndex),
                willChange: "transform",
                backfaceVisibility: "hidden",
                pointerEvents: "auto",
              }
            : {
                position: "absolute",
                left: "50%",
                top: "58%",
                width: "min(68vw, 900px)",
                transform: s.transform,
                zIndex: s.zIndex,
                opacity: s.opacity,
                transition: reduced
                  ? "none"
                  : `transform 0.6s ${EASE}, opacity 0.6s ${EASE}`,
                willChange: "transform",
                backfaceVisibility: "hidden",
                pointerEvents: isTop ? "auto" : "none",
              };
          return (
            <Link
              key={p.slug}
              href={`/projekt/${p.slug}`}
              onMouseEnter={isTop ? advance : undefined}
              style={style}
            >
              <div
                style={{
                  background: "#ffffff",
                  border: "1.5px solid var(--ink)",
                  boxShadow: "0 -14px 36px rgba(17,17,17,0.10)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    padding: "10px 18px",
                    borderBottom: "1.5px solid var(--ink)",
                    background: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "12px",
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--accent)",
                      }}
                    >
                      {p.index}/
                    </span>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "19px",
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "18px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        opacity: 0.55,
                      }}
                    >
                      {p.tag}
                    </span>
                    <span style={{ fontSize: "14px", color: "var(--accent)" }}>
                      →
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/9",
                    overflow: "hidden",
                    background: "var(--img-bg)",
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
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
