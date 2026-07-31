"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

const EASE = "cubic-bezier(0.22, 0.8, 0.24, 1)";

type Props = {
  kind?: "up" | "img";
  delay?: number;
  as?: "div" | "h1" | "h2" | "p" | "a" | "span";
  className?: string;
  style?: CSSProperties;
  href?: string;
  children: ReactNode;
};

/*
 * Ein-/Scroll-Einblendung — 1:1 aus dem Handoff portiert.
 * `up`  : opacity 0 / translateY(36px) -> sichtbar (0.9s)
 * `img` : Container clip-path inset(0 0 100% 0) -> offen (1.1s),
 *         inneres Element scale(1.07) -> 1 (1.4s)
 * Respektiert prefers-reduced-motion (dann statisch sichtbar), einmalig.
 *
 * Bei `img` liegt die clip-path-Maske auf einem inneren Wrapper, NICHT auf
 * dem beobachteten Element selbst: Ein Element, das sich per clip-path auf
 * praktisch 0 Fläche versteckt, meldet dem IntersectionObserver dauerhaft
 * intersectionRatio 0 — die Einblendung würde nie auslösen.
 */
export default function Reveal({
  kind = "up",
  delay = 0,
  as = "div",
  className,
  style,
  href,
  children,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clipEl = kind === "img" ? clipRef.current : null;

    el.style.transition = "none";
    if (kind === "up") {
      el.style.opacity = "0";
      el.style.transform = "translateY(36px)";
    }
    if (kind === "img" && clipEl) {
      clipEl.style.clipPath = "inset(0 0 100% 0)";
      const inner = clipEl.firstElementChild as HTMLElement | null;
      if (inner) {
        inner.style.transition = "none";
        inner.style.transform = "scale(1.07)";
      }
    }

    const reveal = () => {
      setTimeout(() => {
        if (kind === "up") {
          el.style.transition =
            "opacity 0.9s " + EASE + ", transform 0.9s " + EASE;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
        if (kind === "img" && clipEl) {
          clipEl.style.transition = "clip-path 1.1s " + EASE;
          clipEl.style.clipPath = "inset(0 0 0% 0)";
          const inner = clipEl.firstElementChild as HTMLElement | null;
          if (inner) {
            inner.style.transition = "transform 1.4s " + EASE;
            inner.style.transform = "scale(1)";
          }
        }
        setTimeout(() => {
          if (kind === "up") {
            ["transition", "opacity", "transform"].forEach((p) =>
              el.style.removeProperty(p),
            );
          }
          if (kind === "img" && clipEl) {
            clipEl.style.removeProperty("transition");
            clipEl.style.removeProperty("clip-path");
            const inner = clipEl.firstElementChild as HTMLElement | null;
            if (inner) {
              inner.style.removeProperty("transition");
              inner.style.removeProperty("transform");
            }
          }
        }, 1600);
      }, delay);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            io.unobserve(en.target);
            reveal();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [kind, delay]);

  const Tag: ElementType = as;
  // Polymorphes `as` -> ref/props locker typisieren, damit die
  // Intrinsic-Element-Union den ref-Typ nicht überbestimmt.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tagProps: any = { ref, className, style, href };

  if (kind === "img") {
    return (
      <Tag {...tagProps}>
        <div ref={clipRef} style={{ position: "absolute", inset: 0 }}>
          {children}
        </div>
      </Tag>
    );
  }

  return <Tag {...tagProps}>{children}</Tag>;
}
