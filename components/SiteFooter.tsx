import Link from "next/link";
import Reveal from "./Reveal";

const MARQUEE_WORDS = [
  "Offen für Anfragen",
  "Portfolio 2026",
  "Kommunikationsdesign",
  "Offen für Anfragen",
  "Portfolio 2026",
  "Kommunikationsdesign",
];

function MarqueeRun() {
  return (
    <div
      style={{
        display: "flex",
        whiteSpace: "nowrap",
        fontSize: "13px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.18em",
      }}
    >
      {MARQUEE_WORDS.map((w, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
          <span style={{ padding: "0 26px" }}>{w}</span>
          <span style={{ color: "var(--accent)" }}>—</span>
        </span>
      ))}
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer
      id="kontakt"
      style={{
        position: "relative",
        zIndex: 60,
        background: "var(--footer-bg)",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          padding: "14px 0",
          borderBottom: "1px solid var(--footer-hair)",
        }}
      >
        <div
          className="pd-marquee"
          style={{
            display: "flex",
            width: "max-content",
            animation: "pd-marquee 20s linear infinite",
          }}
        >
          <MarqueeRun />
          <MarqueeRun />
        </div>
      </div>

      <div style={{ padding: "clamp(56px, 10vw, 96px) clamp(20px, 5vw, 40px) 0 clamp(20px, 5vw, 40px)" }}>
        <Reveal
          kind="up"
          as="a"
          href="mailto:hallo@paulinadoenne.de"
          style={{
            display: "block",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "clamp(40px, 12.5vw, 200px)",
            lineHeight: 0.95,
            color: "#ffffff",
          }}
        >
          Sag Hallo<span style={{ color: "var(--accent)" }}>.</span>
        </Reveal>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 40px) clamp(20px, 4vw, 32px) clamp(20px, 5vw, 40px)",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          opacity: 0.7,
          textTransform: "uppercase",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", gap: "28px" }}>
          <a href="mailto:hallo@paulinadoenne.de" style={{ color: "#ffffff" }}>
            E-Mail
          </a>
          <a href="#" style={{ color: "#ffffff" }}>
            Instagram
          </a>
          <a href="#" style={{ color: "#ffffff" }}>
            LinkedIn
          </a>
        </div>
        <div style={{ display: "flex", gap: "28px" }}>
          <span style={{ opacity: 0.6 }}>© 2026 Paulina Dönne</span>
          <Link href="/impressum" style={{ color: "#ffffff" }}>
            Impressum &amp; Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}
