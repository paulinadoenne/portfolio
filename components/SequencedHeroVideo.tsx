"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Clip = { src: string; webm?: string; poster?: string };

const videoStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

/* Hero-Video mit mehreren Clips in Reihe: sobald ein Clip endet, spielt
 * automatisch der nächste. Bewusst DASSELBE <video>-Element über den ganzen
 * Wechsel hinweg (kein Neu-Mount per key) — ein frisch gemountetes Element
 * hat für Chrome/Safari nie eine Nutzer-Geste erhalten, wodurch das
 * autoPlay-Attribut beim zweiten Clip stillschweigend blockiert würde. Auf
 * demselben Element, das der Klick auf „Play“ beim ersten Clip bereits
 * aktiviert hat, wird der Folge-Clip zuverlässig automatisch abgespielt. */
export default function SequencedHeroVideo({
  clips,
  ariaLabel,
}: {
  clips: Clip[];
  ariaLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);
  const clip = clips[index];

  useEffect(() => {
    if (index === 0) return;
    const v = ref.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [index]);

  return (
    <video
      ref={ref}
      controls
      playsInline
      preload="metadata"
      poster={clip.poster}
      aria-label={ariaLabel}
      onEnded={() => {
        if (index < clips.length - 1) setIndex(index + 1);
      }}
      style={videoStyle}
    >
      {clip.webm && <source src={clip.webm} type="video/webm" />}
      <source src={clip.src} type="video/mp4" />
    </video>
  );
}
