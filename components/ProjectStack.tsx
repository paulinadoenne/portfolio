"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ImageSlot from "./ImageSlot";
import { projects } from "@/lib/projects";

const N = projects.length;

/* Ausgangs-Transform (p = 0) — auch ohne JS / bei reduced-motion sichtbar. */
function initialCardStyle(i: number) {
  const d = i;
  return {
    transform: `translate(-50%,-50%) translateY(${-d * 56}px) translateZ(${-d * 120}px) rotateX(12deg)`,
    zIndex: 200 - Math.round(d * 12),
    opacity: Math.max(0, Math.min(1, 1 - (d - 4) / 3.8)),
  };
}

export default function ProjectStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = Array.from(
      section.querySelectorAll<HTMLElement>("[data-stack-card]"),
    );
    const left = section.querySelector<HTMLElement>("[data-stack-left]");
    const right = section.querySelector<HTMLElement>("[data-stack-right]");
    const hint = section.querySelector<HTMLElement>("[data-stack-hint]");
    if (!cards.length) return;
    const titles = projects.map((p) => p.title);
    const n = cards.length;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const scrolled = Math.min(Math.max(-rect.top, 0), rect.height - vh);
      const p = scrolled / (vh * 0.8);
      cards.forEach((el, i) => {
        const d = i - p;
        if (d >= 0) {
          el.style.transform = `translate(-50%,-50%) translateY(${-d * 56}px) translateZ(${-d * 120}px) rotateX(12deg)`;
          el.style.zIndex = String(200 - Math.round(d * 12));
          el.style.opacity = String(Math.max(0, Math.min(1, 1 - (d - 4) / 3.8)));
          el.style.pointerEvents = d < 0.5 ? "auto" : "none";
        } else {
          const e = -d;
          el.style.transform = `translate(-50%,-50%) translateY(${e * 120}vh) translateZ(${Math.min(e, 1) * 140}px) rotateX(${12 + Math.min(e, 1) * 30}deg)`;
          el.style.zIndex = "300";
          el.style.opacity = "1";
          el.style.pointerEvents = "none";
        }
      });
      if (hint) hint.style.opacity = p > 0.25 ? "0" : "0.5";
      const cur = Math.min(Math.max(Math.round(p), 0), n - 1);
      if (left) left.textContent = "0" + (cur + 1) + " / 0" + n;
      if (right) right.textContent = titles[cur] || "";
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="arbeiten"
      style={{ position: "relative", height: "740vh", marginTop: 0 }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
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
          data-stack-left
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
          01 / 08
        </div>
        <div
          data-stack-right
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
          {projects[0].title}
        </div>
        <div
          data-stack-hint
          style={{
            position: "absolute",
            left: "50%",
            bottom: "28px",
            transform: "translateX(-50%)",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            opacity: 0.5,
            zIndex: 250,
            transition: "opacity 0.4s ease",
          }}
        >
          Scrollen zum Blättern ↓
        </div>

        {/* Deck-Wobble-Wrapper: neigt sich zur Maus (via FlairLayer) */}
        <div
          data-stack-tilt
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
          }}
        >
        {projects.map((p, i) => {
          const init = initialCardStyle(i);
          return (
            <Link
              key={p.slug}
              data-stack-card
              href={`/projekt/${p.slug}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "58%",
                width: "min(68vw, 900px)",
                transform: init.transform,
                zIndex: init.zIndex,
                opacity: init.opacity,
                willChange: "transform",
                backfaceVisibility: "hidden",
                pointerEvents: i < 1 ? "auto" : "none",
              }}
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
                  <ImageSlot placeholder={`Projektbild ${i + 1} hier ablegen`} />
                </div>
              </div>
            </Link>
          );
        })}
        </div>
      </div>
    </section>
  );
}
