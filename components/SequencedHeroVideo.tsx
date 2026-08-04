"use client";

import { useState } from "react";
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
 * automatisch der nächste. `key={clip.src}` erzwingt einen Neu-Mount des
 * <video>-Elements beim Wechsel, da Browser eine reine <source>-Änderung
 * ohne manuelles .load() nicht zuverlässig übernehmen. */
export default function SequencedHeroVideo({
  clips,
  ariaLabel,
}: {
  clips: Clip[];
  ariaLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const clip = clips[index];

  return (
    <video
      key={clip.src}
      controls
      playsInline
      preload="metadata"
      poster={clip.poster}
      aria-label={ariaLabel}
      autoPlay={index > 0}
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
