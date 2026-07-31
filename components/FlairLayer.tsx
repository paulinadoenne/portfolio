"use client";

import { useEffect, useState } from "react";
import { IRIS, IRIS_MASK, NEUTRAL_BG, NEUTRAL_SHADOW } from "./BubbleField";

/*
 * Interaktions-Ebene der Startseite (Custom Cursor, Deck-Wobble, Gelee-Effekt
 * der Blasen). Die Blasen selbst rendert <BubbleField/> in der gepinnten Szene;
 * hier wird nur per [data-bubble] darauf zugegriffen. Rendert selbst nichts.
 * Deaktiviert sich bei prefers-reduced-motion und pointer:coarse.
 */
export default function FlairLayer() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (!reduce && !coarse) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Native Maus ausblenden, solange die Glas-Seifenblase sie ersetzt
    document.body.style.cursor = "none";

    // Custom Cursor: kleine, nachziehende Glas-Seifenblase im Look der [data-bubble]-Blasen
    const cursorBubble = document.createElement("div");
    cursorBubble.style.cssText =
      "position:absolute; width:30px; height:30px; border-radius:50%; overflow:hidden;" +
      `background:${NEUTRAL_BG}; border:1px solid rgba(255,255,255,0.95); box-shadow:${NEUTRAL_SHADOW};` +
      "-webkit-backdrop-filter:url(#pd-glass); backdrop-filter:url(#pd-glass);" +
      "z-index:900; pointer-events:none; transform:translate(-50%,-50%); opacity:0; will-change:transform;" +
      "transition:width 0.25s ease, height 0.25s ease";
    const cursorIris = document.createElement("div");
    cursorIris.style.cssText =
      "position:absolute; inset:0; border-radius:inherit;" +
      `background:${IRIS.replace("{ANGLE}", "205deg")};` +
      `-webkit-mask-image:${IRIS_MASK}; mask-image:${IRIS_MASK};`;
    const cursorShine = document.createElement("div");
    cursorShine.style.cssText =
      "position:absolute; top:12%; left:16%; width:30%; height:16%; border-radius:50%;" +
      "background:rgba(255,255,255,0.85); filter:blur(3px); transform:rotate(-24deg);";
    cursorBubble.appendChild(cursorIris);
    cursorBubble.appendChild(cursorShine);
    document.body.appendChild(cursorBubble);

    // Gelee-Effekt: additive Maus-Interaktion pro Blase über die unabhängigen
    // CSS-Properties translate/scale/rotate (kollidiert nicht mit den Keyframes).
    const bubbles = Array.from(
      document.querySelectorAll<HTMLElement>("[data-bubble]"),
    );
    const bstate = bubbles.map(() => ({
      vx: 0,
      vy: 0,
      ox: 0,
      oy: 0,
      d: 0,
      dv: 0,
      ax: 0,
      ay: 0,
      gx: 0,
      gy: 0,
      io: 0.72,
    }));
    const rects: DOMRect[] = new Array(bubbles.length);

    const state = {
      mx: 0,
      my: 0,
      seen: false,
      dx: 0,
      dy: 0,
      hoverLink: false,
      overRondell: false,
    };
    let pmx = state.mx;
    let pmy = state.my;

    const onMove = (e: MouseEvent) => {
      state.seen = true;
      state.mx = e.clientX;
      state.my = e.clientY;
      const target = e.target as Element | null;
      state.hoverLink = !!(target && target.closest && target.closest("a, button"));
      // Über der ganzen Rondell-Sektion wird die Cursor-Blase ausgeblendet
      // (nicht nur exakt über den Karten-Links): Die Karten sind gekippte
      // Trapeze, deren tatsächliche Trefferfläche dem sichtbaren, rotierten
      // Umriss folgt — nicht ihrer rechteckigen Bounding-Box. In den
      // schmalen Lücken zwischen zwei Karten-Ecken träfe `#arbeiten a`
      // daher nicht, obwohl der Cursor optisch mitten im Kartenstapel steht,
      // und die Blase würde dort kurz sichtbar über Titel/Tag-Text liegen.
      // Die Karte selbst gibt beim Fokussieren schon genug visuelles
      // Feedback (wird groß & frontal).
      state.overRondell = !!(target && target.closest && target.closest("#arbeiten"));
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let running = true;
    const loop = () => {
      if (!running) return;
      if (state.seen) {
        const px = state.mx + window.scrollX;
        const py = state.my + window.scrollY;
        // leicht nachziehend, wie die driftenden Blasen im Feld
        state.dx += (px - state.dx) * 0.22;
        state.dy += (py - state.dy) * 0.22;
        cursorBubble.style.opacity = state.overRondell ? "0" : "1";
        cursorBubble.style.left = state.dx + "px";
        cursorBubble.style.top = state.dy + "px";
        const s = state.hoverLink ? 46 : 30;
        cursorBubble.style.width = s + "px";
        cursorBubble.style.height = s + "px";
      }

      // ===== Gelee-Effekt der Blasen =====
      const mvx = state.mx - pmx;
      const mvy = state.my - pmy;
      pmx = state.mx;
      pmy = state.my;
      const speed = Math.min(Math.hypot(mvx, mvy), 22);
      if (state.seen) {
        // PHASE 1 — ALLE Rects zuerst lesen (nur 1 Layout-Flush pro Frame,
        // kein Read/Write-Thrashing → Main-Thread bleibt frei, Cursor flüssig).
        for (let i = 0; i < bubbles.length; i++) {
          rects[i] = bubbles[i].getBoundingClientRect();
        }
        // PHASE 2 — rechnen und schreiben (keine Layout-Reads mehr).
        for (let i = 0; i < bubbles.length; i++) {
          const bub = bubbles[i];
          const bs = bstate[i];
          const r = rects[i];
          const dx = r.left + r.width / 2 - state.mx;
          const dy = r.top + r.height / 2 - state.my;
          const dist = Math.max(1, Math.hypot(dx, dy));
          const reach = r.width / 2 + 160;
          const prox = Math.max(0, 1 - dist / reach);
          const ux = dx / dist;
          const uy = dy / dist;

          // Drift mit Trägheit (translate)
          if (speed > 1.5) {
            const f = prox * speed * 0.0045;
            bs.vx += ux * f + mvx * f * 0.03;
            bs.vy += uy * f + mvy * f * 0.03;
          }
          bs.vx += -bs.ox * 0.0008;
          bs.vy += -bs.oy * 0.0008;
          bs.vx *= 0.977;
          bs.vy *= 0.977;
          bs.ox += bs.vx;
          bs.oy += bs.vy;
          bs.ox = Math.max(-30, Math.min(30, bs.ox));
          bs.oy = Math.max(-30, Math.min(30, bs.oy));
          bub.style.translate = bs.ox + "px " + bs.oy + "px";

          // Gelee-Delle (scale, unterdämpfte Feder)
          const targetD = prox * prox * 0.15;
          bs.dv += (targetD - bs.d) * 0.011;
          bs.dv *= 0.935;
          bs.d += bs.dv;
          bs.ax += (ux * ux - bs.ax) * 0.08;
          bs.ay += (uy * uy - bs.ay) * 0.08;
          const stx = Math.min(0.04, Math.abs(bs.vx) * 0.011);
          const sty = Math.min(0.04, Math.abs(bs.vy) * 0.011);
          const sx = 1 - bs.d * bs.ax + bs.d * 0.55 * bs.ay + stx - sty * 0.5;
          const sy = 1 - bs.d * bs.ay + bs.d * 0.55 * bs.ax + sty - stx * 0.5;
          bub.style.scale = sx + " " + sy;

          // Mitkippen (rotate) — koppelt an die Feder-Geschwindigkeit
          bub.style.rotate = bs.dv * 55 + "deg";

          // Licht reagiert träge: Glanzpunkt weicht aus, Iris-Rand glüht auf
          const iris = bub.children[0] as HTMLElement | undefined;
          const shine = bub.children[1] as HTMLElement | undefined;
          const gtx = -ux * prox * r.width * 0.08;
          const gty = -uy * prox * r.width * 0.08;
          bs.gx += (gtx - bs.gx) * 0.05;
          bs.gy += (gty - bs.gy) * 0.05;
          if (shine) shine.style.translate = bs.gx + "px " + bs.gy + "px";
          const iot = 0.72 + prox * 0.28;
          bs.io += (iot - bs.io) * 0.05;
          if (iris) iris.style.opacity = String(bs.io);
        }
      }

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return () => {
      running = false;
      window.removeEventListener("mousemove", onMove);
      document.body.style.removeProperty("cursor");
      cursorBubble.remove();
      bubbles.forEach((bub) => {
        bub.style.removeProperty("translate");
        bub.style.removeProperty("scale");
        bub.style.removeProperty("rotate");
        const iris = bub.children[0] as HTMLElement | undefined;
        const shine = bub.children[1] as HTMLElement | undefined;
        if (iris) iris.style.removeProperty("opacity");
        if (shine) shine.style.removeProperty("translate");
      });
    };
  }, [enabled]);

  return null;
}
