"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ImageSlot from "./ImageSlot";
import { projects } from "@/lib/projects";

const N = projects.length;

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

// Negativer Winkel: Man blickt von schräg oben in den Stapel hinein (wie in
// eine Aktensammlung), statt von unten gegen eine gekippte Wand zu schauen.
const REST_ROT = -24;
const FOCUS_WINDOW = 0.55; // Indexabstand, über den eine Karte "in den Fokus" kommt

/* 0 (kein Fokus) … 1 (Cursor steht exakt auf dieser Karte), sanft geglättet. */
function focusFactor(absD: number) {
  const t = Math.max(0, 1 - absD / FOCUS_WINDOW);
  return t * t * (3 - 2 * t);
}

/* Karte in Stapeltiefe d (0 = aktuell berührtes Blatt, > 0 = noch unberührt/
 * tiefer im Stapel, < 0 = bereits passiert/"davor" liegend). `foc` (0…1) hebt
 * das gerade berührte Blatt frontal & groß heraus — nur während der Cursor
 * aktiv über dem Stapel ist, sonst bleibt alles in Ruheposition klein.
 *
 * Ebenen-Reihenfolge: Noch unberührte Karten liegen im echten Aktenstapel
 * immer OBEN auf der gerade herausgezogenen/geöffneten Karte — deshalb eine
 * eigene, durchgehend höhere z-Index-Bahn für d > 0, unabhängig vom Fokus-
 * Zustand der geöffneten Karte (sonst überdeckt deren Vergrößerung die
 * Karten, die eigentlich noch über ihr liegen). */
// Zentrierung (-50%,-50%) plus Y-Offset in EINER `translate`-Angabe: die
// einzelnen Transform-Properties (translate/rotate/scale statt eines
// kombinierten `transform`-Strings) interpolieren beim CSS-Übergang jede
// Achse unabhängig und linear. Ein kombinierter `transform: translate()
// translateZ() rotateX() scale()`-String wird von Browsern dagegen als EINE
// Matrix behandelt und beim Animieren zwischen Start-/Zielwert per
// Matrix-Dekomposition interpoliert — das kann bei gleichzeitig
// wechselnder Rotation, Tiefe und Skalierung sichtbar unvorhersehbare
// Zwischenzustände erzeugen (Karten, die kurz größer/verzerrt aufblitzen).
function centeredTranslate(y: number, z: number) {
  return `-50% calc(-50% + ${y}px) ${z}px`;
}

function cardTransform(d: number, hovering: boolean) {
  const gap = 42;
  const zStep = 182;
  const foc = hovering ? focusFactor(Math.abs(d)) : 0;
  // Vergrößerung bewusst moderat: Die fokussierte Karte muss immer
  // vollständig sichtbar bleiben und darf dafür lieber kleiner ausfallen,
  // statt in Nachbarkarten hineinzuwachsen.
  const scale = 1 + foc * 0.14;

  if (d >= 0) {
    // Rotation/Skalierung bleiben über den ganzen Bereich stetig (foc blendet
    // weich zum frontalen Fokus hin) — nur die z-Ebene bekommt eine harte
    // Stufe: Sobald eine Karte noch nicht ganz erreicht ist (d spürbar > 0),
    // liegt sie im Stapel über der gerade fokussierten Karte, nicht darunter.
    const rot = REST_ROT * (1 - foc);
    const untouched = d > 0.02;
    // Im Ruhezustand (kein Hover) liegt der Turm der unberührten Karten über
    // der kleinen vordersten Karte. Sobald aktiv fokussiert wird, muss die
    // vergrößerte Karte dagegen vollständig sichtbar sein — sie darf dann
    // auch über ihre unmittelbaren, noch unberührten Nachbarn steigen.
    // z-index wird bewusst NUR aus dem diskreten, ganzzahligen Karten-Index
    // (i, über d = i - p) abgeleitet, nie aus einem interpolierten/
    // animierten Zwischenwert — sonst könnte die Stacking-Reihenfolge
    // während des Übergangs flackern.
    const zIndex = untouched
      ? 500 - Math.round(d * 10)
      : hovering
        ? 600 + Math.round(foc * 100)
        : 200;
    // Beim Hovern bekommt der GESAMTE unberührte Turm denselben zusätzlichen
    // Rückschub (nicht nur der unmittelbare Nachbar d=1): Die fokussierte
    // Karte wird groß & flach (volle Höhe, keine Kippung) und braucht mehr
    // Abstand zum nächsten Turm-Blatt, als der normale Ruhe-Abstand (gap)
    // hergibt. Ein Zusatzabstand nur für d=1 würde diese Karte über die
    // Position von d=2 hinausschieben und die natürliche Turm-Reihenfolge
    // invertieren — der flache Betrag hier verschiebt stattdessen den
    // kompletten Turm gleichmäßig, ihre relativen Abstände zueinander
    // bleiben dabei unverändert. Zusätzliche Marge (ggü. vorher 340px), da
    // eine Karte, die gerade den Fokus verliert, während des ~120ms-Übergangs
    // noch kurz ihre volle fokussierte Größe mitführt, obwohl ihr z-index
    // (aus dem bereits aktuellen, diskreten d) sofort auf den Turm-Wert
    // zurückspringt — ohne diese Marge könnte sie in dem Fenster sichtbar in
    // die dahinterliegenden Turm-Karten hineinschneiden.
    const neighborPush = hovering && untouched ? 220 : 0;
    return {
      translate: centeredTranslate(-d * gap - neighborPush, -d * zStep),
      rotate: `1 0 0 ${rot}deg`,
      scale: `${scale}`,
      zIndex,
      opacity: Math.max(0.55, 1 - d * 0.065),
    };
  }

  // Bereits berührte, "untere/vordere" Blätter: rutschen deutlich nach unten
  // aus dem Bereich der fokussierten Karte heraus, damit deren Fläche
  // vollständig frei bleibt (statt nur leicht nach vorne zu klappen und
  // dabei noch hineinzuragen) — und schrumpfen dabei etwas. `e` bleibt
  // unbegrenzt, sonst würden alle weit zurückliegenden Karten an derselben
  // Stelle übereinander liegen. Die Rotation folgt derselben Formel wie im
  // d>=0-Zweig (kein zusätzlicher Steilheits-Term), sonst kippen die
  // Karten unterhalb spitz nach hinten weg statt ein gleichmäßiges Trapez
  // zu bilden. Versatz (360/51) größer als beim oberen Turm, da die
  // fokussierte Karte groß & flach wird und die unmittelbar dahinterliegende
  // untere Karte sonst noch in ihren unteren Rand hineinragt.
  const e = -d;
  const rot = REST_ROT * (1 - foc);
  const shrink = Math.max(0.7, 1 - e * 0.08);
  return {
    translate: centeredTranslate(e * 360, -e * 51),
    rotate: `1 0 0 ${rot}deg`,
    scale: `${scale * shrink}`,
    zIndex: 150 + Math.round(foc * 40) - Math.round(e),
    opacity: Math.max(0.15, 1 - e * 0.16),
  };
}

/* Statische, voll aufgefächerte Ansicht für Touch / prefers-reduced-motion
 * (keine Hover-Geste verfügbar) — alle Karten gleichzeitig sichtbar & klickbar.
 * `gap` kommt von außen (viewporthöhen-abhängig berechnet): bei fixem 150px
 * bräuchten 8 Karten ~1050px Höhe — auf kurzen Mobil-Viewports (z.B. 667px)
 * lägen die hinteren Karten außerhalb der `overflow:hidden`-Sektion und
 * wären weder sichtbar noch erreichbar. */
function openStyle(d: number, gap: number) {
  const zStep = gap * 0.173;
  const rot = -4;
  return {
    translate: centeredTranslate(-d * gap, -d * zStep),
    rotate: `1 0 0 ${rot}deg`,
    scale: "1",
    zIndex: 200 - Math.round(d * 12),
    opacity: 1,
  };
}

export default function ProjectStack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  // Ruheposition jeder Karte (ungefähre Rechtecke), einmal pro Hover-Session
  // gemessen — bewusst NICHT die live-animierende Fläche. Eine Karte, die
  // gerade fokussiert, braucht bis zu 0,6s, um an ihre zentrierte Position zu
  // wandern; würde die Fokus-Wahl gegen die währenddessen wandernde Fläche
  // prüfen, verlässt der (unbewegte) Cursor die Fläche mitten in der
  // Animation, das Rondell springt zurück in die Ruhe, die Karte wandert
  // zurück Richtung Cursor, trifft ihn dort wieder — ein Auf-und-zu-„Buckeln“,
  // besonders sichtbar bei weit hinten liegenden Karten mit langem Weg.
  const restRectsRef = useRef<DOMRect[] | null>(null);
  const [p, setP] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [forceOpen, setForceOpen] = useState(false);
  const [hinted, setHinted] = useState(false);
  const raf = useRef(0);
  // Ziel-Index, dem `p` pro Frame nur um einen begrenzten Schritt entgegen-
  // läuft (statt direkt zu springen) — bei schnellen Mausbewegungen über
  // mehrere Karten hinweg werden dadurch alle dazwischenliegenden Karten
  // sichtbar durchlaufen, statt übersprungen zu werden.
  const pTargetRef = useRef(0);
  const chaseRaf = useRef(0);
  // Kartenabstand der aufgefächerten Touch-Ansicht: passt sich der Viewport-
  // höhe an, damit alle N Karten innerhalb der Sektion sichtbar & antippbar
  // bleiben (siehe Kommentar bei openStyle).
  const [fanGap, setFanGap] = useState(150);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setForceOpen(reduced || coarse);
  }, []);

  useEffect(() => {
    const updateFanGap = () => {
      // Fan ist symmetrisch um die Vertikalmitte verteilt (siehe Aufruf
      // unten: `openStyle(i - (N-1)/2, fanGap)`), nutzt also die volle
      // Viewporthöhe statt nur die obere Hälfte. `gap` muss so klein sein,
      // dass auch die äußerste Karte (samt halber Kartenhöhe) noch inner-
      // halb der Kopf-/Fußraum-Reserven liegt.
      const cardWidth = Math.min(window.innerWidth * 0.8, 420);
      const cardHeight = cardWidth * (9 / 16);
      const reserved = 190; // Kopfzeile oben + Rand unten
      const available = window.innerHeight - cardHeight - reserved;
      const gap = Math.max(34, Math.min(150, available / (N - 1)));
      setFanGap(gap);
    };
    updateFanGap();
    window.addEventListener("resize", updateFanGap);
    return () => window.removeEventListener("resize", updateFanGap);
  }, []);

  useEffect(() => {
    const step = () => {
      setP((prev) => {
        const target = pTargetRef.current;
        const diff = target - prev;
        if (Math.abs(diff) < 0.01) return target;
        const maxStep = 0.09;
        return prev + Math.sign(diff) * Math.min(maxStep, Math.abs(diff));
      });
      chaseRaf.current = requestAnimationFrame(step);
    };
    chaseRaf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(chaseRaf.current);
  }, []);

  useEffect(() => {
    const invalidate = () => {
      restRectsRef.current = null;
    };
    window.addEventListener("resize", invalidate);
    return () => window.removeEventListener("resize", invalidate);
  }, []);

  const measureRestRects = () => {
    const rects = cardRefs.current.map((el) => el?.getBoundingClientRect());
    if (rects.every((r): r is DOMRect => r !== undefined)) {
      restRectsRef.current = rects;
    }
  };

  const hitTest = (clientX: number, clientY: number, rects: (DOMRect | undefined)[]) => {
    let hitIndex = -1;
    let hitZ = -Infinity;
    for (let i = 0; i < N; i++) {
      const el = cardRefs.current[i];
      const r = rects[i];
      if (!el || !r) continue;
      if (clientX < r.left || clientX > r.right || clientY < r.top || clientY > r.bottom) {
        continue;
      }
      const z = parseInt(el.style.zIndex || "0", 10);
      if (z > hitZ) {
        hitZ = z;
        hitIndex = i;
      }
    }
    return hitIndex;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (forceOpen) return;
    const clientY = e.clientY;
    const clientX = e.clientX;
    // Zu Beginn einer Hover-Session frisch messen (garantiert die aktuelle
    // Ruheposition statt eines möglicherweise veralteten Mount-Snapshots).
    if (!hovering) measureRestRects();
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      // 1) Solange der Cursor noch irgendwo innerhalb der TATSÄCHLICH
      // gerenderten (ggf. groß & zentriert animierten) Fläche der aktuell
      // offenen Karte liegt, bleibt sie ausgewählt.
      if (hovering) {
        const currentIndex = Math.max(0, Math.min(N - 1, Math.round(p)));
        const el = cardRefs.current[currentIndex];
        if (el) {
          const r = el.getBoundingClientRect();
          if (clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom) {
            setHinted(true);
            return;
          }
        }
      }
      // 2) Sonst gegen die stabilen Ruhepositionen prüfen (siehe Kommentar
      // oben) — legt fest, ob eine andere Karte übernimmt oder (kein Treffer)
      // das Rondell in die Ruheposition zurückfällt.
      const rects = restRectsRef.current;
      const hitIndex = rects ? hitTest(clientX, clientY, rects) : -1;
      if (hitIndex === -1) {
        pTargetRef.current = 0;
        setHovering(false);
        return;
      }
      pTargetRef.current = hitIndex;
      setHovering(true);
      setHinted(true);
    });
  };

  const onMouseLeave = () => {
    if (forceOpen) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    pTargetRef.current = 0;
    setHovering(false);
  };

  const displayIndex = forceOpen
    ? hoverIndex
    : Math.max(0, Math.min(N - 1, Math.round(p)));

  return (
    <section
      id="arbeiten"
      style={{
        position: "relative",
        // Eigener Stacking-Context nötig: `transform-style:preserve-3d` auf
        // dem Karten-Wrapper spannt selbst einen lokalen Stacking-Context
        // auf, wodurch die inneren Karten-z-Indizes (bis 700) NICHT mehr
        // global mit Geschwistern wie BubbleField vergleichbar sind — ohne
        // eigenes z-index hier läge der ganze Kartenstapel effektiv auf
        // Ebene 0. BubbleField liegt bewusst über allen Inhalten (850).
        zIndex: 60,
        height: "100vh",
        overflow: "hidden",
        perspective: "1815px",
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
          left: forceOpen ? "20px" : "40px",
          top: forceOpen ? "76px" : "50%",
          transform: forceOpen ? "none" : "translateY(-50%)",
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
          right: forceOpen ? "20px" : "40px",
          top: forceOpen ? "76px" : "50%",
          transform: forceOpen ? "none" : "translateY(-50%)",
          maxWidth: forceOpen ? "50vw" : undefined,
          overflow: forceOpen ? "hidden" : undefined,
          textOverflow: forceOpen ? "ellipsis" : undefined,
          whiteSpace: forceOpen ? "nowrap" : undefined,
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
          let s: {
            translate: string;
            rotate: string;
            scale: string;
            zIndex: number;
            opacity: number;
          };
          let clickable: boolean;
          if (forceOpen) {
            s = openStyle(i - (N - 1) / 2, fanGap);
            clickable = true;
          } else {
            const d = i - p;
            s = cardTransform(d, hovering);
            // exakt die Karte, die auch in der Kopfzeile angezeigt wird
            // (in Ruhe ohne Hover ist das die erste Karte, sonst die berührte)
            clickable = i === displayIndex;
          }
          return (
            <Link
              key={proj.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              href={`/projekt/${proj.slug}`}
              onMouseEnter={forceOpen ? () => setHoverIndex(i) : undefined}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: forceOpen ? "min(80vw, 420px)" : "min(42vw, 600px)",
                translate: s.translate,
                rotate: s.rotate,
                scale: s.scale,
                zIndex: s.zIndex,
                opacity: s.opacity,
                transition: forceOpen
                  ? "none"
                  : "translate 0.6s ease-out, rotate 0.6s ease-out, scale 0.6s ease-out, opacity 0.6s ease-out",
                willChange: "translate, rotate, scale",
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
