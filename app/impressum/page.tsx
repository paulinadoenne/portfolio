import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum & Datenschutz · Paulina Dönne",
};

const navStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "clamp(14px, 3.5vw, 22px) clamp(16px, 5vw, 40px)",
  position: "sticky",
  top: 0,
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  zIndex: 50,
};
const h2: CSSProperties = {
  margin: "0 0 24px 0",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "-0.01em",
  fontSize: "clamp(22px, 5vw, 28px)",
  overflowWrap: "break-word",
};
const body: CSSProperties = { fontSize: "16px", lineHeight: 1.8 };

export default function ImpressumPage() {
  return (
    <div style={{ minHeight: "100vh" }} className="impressum">
      <nav style={navStyle}>
        <Link
          href="/"
          style={{
            fontSize: "13px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          ← Zurück zum Portfolio
        </Link>
        <Link
          href="/"
          style={{
            fontWeight: 700,
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Paulina Dönne
        </Link>
      </nav>

      <div
        style={{
          padding:
            "clamp(64px, 12vw, 88px) clamp(20px, 5vw, 40px) clamp(64px, 10vw, 120px) clamp(20px, 5vw, 40px)",
          maxWidth: "840px",
        }}
      >
        <h1
          style={{
            margin: "0 0 72px 0",
            maxWidth: "100%",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            fontSize: "clamp(38px, 8vw, 110px)",
            lineHeight: 0.95,
            overflowWrap: "break-word",
          }}
        >
          Impressum &amp; Datenschutz
        </h1>

        <h2 style={h2}>Impressum</h2>
        <div style={{ ...body, marginBottom: "64px" }}>
          <p style={{ margin: "0 0 20px 0" }}>Angaben gemäß § 5 TMG:</p>
          <p style={{ margin: "0 0 20px 0" }}>Paulina Dönne</p>
          <p style={{ margin: "0 0 20px 0" }}>
            E-Mail:{" "}
            <a href="mailto:paulinadoenne@outlook.com" className="pd-underline">
              paulinadoenne@outlook.com
            </a>
          </p>
          <p style={{ margin: 0 }}>
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Paulina Dönne.
          </p>
        </div>

        <h2 style={h2}>Datenschutzerklärung</h2>
        <div style={body}>
          <p style={{ margin: "0 0 20px 0" }}>
            <strong>1. Allgemeines.</strong> Diese Website dient der Präsentation
            meiner Arbeiten. Personenbezogene Daten werden nur erhoben, soweit
            dies technisch erforderlich ist.
          </p>
          <p style={{ margin: "0 0 20px 0" }}>
            <strong>2. Hosting.</strong> Hosting-Anbieter und Angaben zur
            Server-Protokollierung hier eintragen (Anbieter, Speicherdauer,
            Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p style={{ margin: "0 0 20px 0" }}>
            <strong>3. Kontaktaufnahme.</strong> Bei Kontakt per E-Mail werden
            die übermittelten Daten ausschließlich zur Bearbeitung der Anfrage
            verwendet.
          </p>
          <p style={{ margin: "0 0 20px 0" }}>
            <strong>4. Externe Dienste.</strong> Eingebundene Schriften,
            eingebettete Videos oder Analyse-Tools hier aufführen, inklusive
            Anbieter und Zweck.
          </p>
          <p style={{ margin: 0 }}>
            <strong>5. Ihre Rechte.</strong> Sie haben das Recht auf Auskunft,
            Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten
            sowie ein Beschwerderecht bei der zuständigen Aufsichtsbehörde.
          </p>
        </div>
      </div>

      <footer
        style={{
          background: "#111111",
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          padding: "28px clamp(20px, 5vw, 40px)",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ opacity: 0.5 }}>© 2026 Paulina Dönne</span>
        <Link href="/" style={{ color: "#ffffff" }}>
          paulinadoenne.de
        </Link>
      </footer>
    </div>
  );
}
