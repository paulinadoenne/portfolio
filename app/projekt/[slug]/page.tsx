import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { SubNav } from "@/components/Nav";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import { projects, getProject, nextProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.title} · Paulina Dönne` : "Projekt · Paulina Dönne" };
}

const metaLabel: CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  opacity: 0.5,
  marginBottom: "8px",
};
const metaValue: CSSProperties = { fontSize: "16px", fontWeight: 500 };
const captionStyle: CSSProperties = {
  marginTop: "10px",
  fontSize: "12px",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  opacity: 0.5,
};
const blockLabel: CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.16em",
  color: "var(--accent)",
  paddingTop: "8px",
};

export default async function ProjektPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = nextProject(slug);

  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <SubNav />

      {/* ===== HEADER ===== */}
      <header
        style={{
          padding:
            "clamp(64px, 12vw, 88px) clamp(20px, 5vw, 40px) clamp(40px, 8vw, 56px) clamp(20px, 5vw, 40px)",
        }}
      >
        <Reveal
          kind="up"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "20px",
            marginBottom: "12px",
          }}
        >
          <span
            style={{ fontSize: "16px", fontWeight: 700, color: "var(--accent)" }}
          >
            {p.index}/
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              opacity: 0.55,
            }}
          >
            {p.tag}
          </span>
        </Reveal>
        <Reveal
          kind="up"
          delay={80}
          as="h1"
          style={{
            margin: "0 0 56px 0",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            fontSize:
              p.slug === "the-double-standard-of-aging"
                ? "clamp(40px, 7vw, 110px)"
                : "clamp(52px, 10vw, 160px)",
            lineHeight: 0.95,
          }}
        >
          {p.slug === "the-double-standard-of-aging" ? (
            <>
              The Double Standard
              <br />
              of Aging
            </>
          ) : p.slug === "4-wochen-4-poster" ? (
            <>
              4 Wochen
              <br />4 Poster
            </>
          ) : (
            p.title
          )}
        </Reveal>

        <Reveal
          kind="up"
          delay={160}
          className="pd-meta-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "32px",
            borderTop: "1px solid var(--ink)",
            paddingTop: "20px",
            maxWidth: "1100px",
          }}
        >
          <div>
            <div style={metaLabel}>Kunde</div>
            <div style={metaValue}>{p.kunde}</div>
          </div>
          <div>
            <div style={metaLabel}>Rolle</div>
            <div style={metaValue}>{p.rolle}</div>
          </div>
          <div>
            <div style={metaLabel}>Jahr</div>
            <div style={metaValue}>{p.jahr}</div>
          </div>
          <div>
            <div style={metaLabel}>Leistungen</div>
            <div style={metaValue}>{p.leistungen}</div>
          </div>
        </Reveal>
      </header>

      {/* ===== HERO ===== */}
      {p.heroVideo && (
      <div style={{ padding: "0 clamp(20px, 5vw, 40px)" }}>
        <Reveal
          kind="img"
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: p.heroRatio ?? "21/9",
            overflow: "hidden",
            background: "var(--img-bg)",
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            {p.heroVideo ? (
              <video
                controls
                playsInline
                preload="metadata"
                poster={p.heroVideoPoster}
                aria-label={p.heroPlaceholder}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              >
                {p.heroVideoWebm && (
                  <source src={p.heroVideoWebm} type="video/webm" />
                )}
                <source src={p.heroVideo} type="video/mp4" />
              </video>
            ) : (
              <ImageSlot placeholder={p.heroPlaceholder} />
            )}
          </div>
        </Reveal>

        {p.heroVideoNext && (
          <Reveal
            kind="img"
            style={{
              position: "relative",
              width: "100%",
              marginTop: "clamp(16px, 3vw, 24px)",
              aspectRatio: p.heroRatio ?? "21/9",
              overflow: "hidden",
              background: "var(--img-bg)",
            }}
          >
            <div style={{ position: "absolute", inset: 0 }}>
              <video
                controls
                playsInline
                preload="metadata"
                poster={p.heroVideoNextPoster}
                aria-label={p.heroPlaceholder}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              >
                {p.heroVideoNextWebm && (
                  <source src={p.heroVideoNextWebm} type="video/webm" />
                )}
                <source src={p.heroVideoNext} type="video/mp4" />
              </video>
            </div>
          </Reveal>
        )}
      </div>
      )}

      {/* ===== AUFGABE ===== */}
      <section
        className="pd-split-grid"
        style={{
          padding: "clamp(64px, 10vw, 120px) clamp(20px, 5vw, 40px)",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "clamp(24px, 4vw, 48px)",
          maxWidth: "1240px",
        }}
      >
        <Reveal kind="up" style={blockLabel}>
          Die Aufgabe
        </Reveal>
        <Reveal
          kind="up"
          delay={100}
          as="p"
          style={{
            margin: 0,
            fontSize: "clamp(22px, 2.4vw, 32px)",
            lineHeight: 1.5,
            maxWidth: "800px",
          }}
        >
          {p.aufgabe}
        </Reveal>
      </section>

      {/* ===== GALERIE ===== */}
      <section
        className="pd-gallery-grid"
        style={{
          padding: "0 clamp(20px, 5vw, 40px)",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(20px, 4vw, 40px)",
        }}
      >
        {p.gallery.map((g) => (
          <div key={g.slotId} style={g.span2 ? { gridColumn: "span 2" } : undefined}>
            <Reveal
              kind="img"
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: g.ratio,
                overflow: "hidden",
                background: "var(--img-bg)",
              }}
            >
              <div style={{ position: "absolute", inset: 0 }}>
                <ImageSlot placeholder={g.placeholder} src={g.src} />
              </div>
            </Reveal>
            <div style={captionStyle}>{g.caption}</div>
          </div>
        ))}
      </section>

      {/* ===== UMSETZUNG ===== */}
      <section
        className="pd-split-grid"
        style={{
          padding: "clamp(64px, 10vw, 120px) clamp(20px, 5vw, 40px)",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "clamp(24px, 4vw, 48px)",
          maxWidth: "1240px",
        }}
      >
        <Reveal kind="up" style={blockLabel}>
          Die Umsetzung
        </Reveal>
        <Reveal
          kind="up"
          delay={100}
          as="p"
          style={{
            margin: 0,
            fontSize: "clamp(18px, 1.6vw, 22px)",
            lineHeight: 1.65,
            maxWidth: "720px",
          }}
        >
          {p.umsetzung}
        </Reveal>
      </section>

      {/* ===== ABSCHLUSS-BILD ===== */}
      <section
        className="pd-gallery-grid"
        style={{
          padding: "0 clamp(20px, 5vw, 40px)",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(20px, 4vw, 40px)",
        }}
      >
        <div style={{ gridColumn: "span 2" }}>
          <Reveal
            kind="img"
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "21/9",
              overflow: "hidden",
              background: "var(--img-bg)",
            }}
          >
            <div style={{ position: "absolute", inset: 0 }}>
              <ImageSlot placeholder={p.closingPlaceholder} src={p.closingSrc} />
            </div>
          </Reveal>
          <div style={captionStyle}>{p.closingCaption}</div>
        </div>
      </section>

      {/* ===== NÄCHSTES PROJEKT ===== */}
      <footer
        style={{
          marginTop: "clamp(72px, 12vw, 140px)",
          background: "var(--footer-bg)",
          color: "#ffffff",
          padding: "clamp(48px, 10vw, 88px) clamp(20px, 5vw, 40px) clamp(24px, 4vw, 36px) clamp(20px, 5vw, 40px)",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            opacity: 0.5,
            marginBottom: "16px",
          }}
        >
          Nächstes Projekt
        </div>
        <Link
          href={`/projekt/${next.slug}`}
          className="pd-next"
          style={{
            display: "flex",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: "clamp(14px, 3vw, 28px)",
            color: "#ffffff",
          }}
        >
          <span
            style={{
              fontWeight: 700,
              textTransform: "uppercase",
              fontSize:
                next.slug === "the-double-standard-of-aging"
                  ? "clamp(36px, 6.5vw, 96px)"
                  : "clamp(48px, 9vw, 140px)",
              lineHeight: 0.95,
            }}
          >
            {next.slug === "the-double-standard-of-aging" ? (
              <>
                The Double Standard
                <br />
                of Aging
              </>
            ) : next.slug === "4-wochen-4-poster" ? (
              <>
                4 Wochen
                <br />4 Poster
              </>
            ) : (
              next.title
            )}
          </span>
          <span className="pd-arrow" style={{ fontSize: "clamp(28px, 4vw, 56px)" }}>
            →
          </span>
        </Link>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "clamp(48px, 10vw, 88px)",
            paddingTop: "22px",
            borderTop: "1px solid var(--footer-hair)",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            opacity: 0.5,
            textTransform: "uppercase",
          }}
        >
          <span>© 2026 Paulina Dönne</span>
          <Link href="/impressum" style={{ color: "#ffffff" }}>
            Impressum &amp; Datenschutz
          </Link>
        </div>
      </footer>
    </div>
  );
}
