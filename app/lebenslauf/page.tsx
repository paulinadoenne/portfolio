import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Lebenslauf — Paulina Dönne",
};

const sectionGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "110pt 1fr",
  gap: "18pt",
  padding: "16pt 0",
  borderBottom: "1pt solid #111111",
};
const sectionLabel: CSSProperties = {
  fontSize: "9pt",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--accent)",
  paddingTop: "2pt",
};
const jobTitleRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12pt",
  fontSize: "11.5pt",
  fontWeight: 700,
};
const period: CSSProperties = {
  fontWeight: 500,
  opacity: 0.6,
  whiteSpace: "nowrap",
};
const jobDesc: CSSProperties = {
  margin: "4pt 0 0 0",
  fontSize: "10.5pt",
  lineHeight: 1.55,
  opacity: 0.85,
};
const pill: CSSProperties = {
  border: "1pt solid #111111",
  borderRadius: "999pt",
  padding: "4pt 10pt",
  fontSize: "9.5pt",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const skills = [
  "Photoshop",
  "Illustrator",
  "InDesign",
  "After Effects",
  "Premiere",
  "Figma",
  "Cinema 4D",
];

export default function LebenslaufPage() {
  return (
    <>
      <div
        className="pd-no-print"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 32px",
          background: "#111111",
          color: "#ffffff",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          ← Zurück zum Portfolio
        </Link>
        <PrintButton />
      </div>

      <div className="cv-stage">
        <div className="cv-sheet">
          <div style={{ padding: "52pt 48pt", minHeight: "100%" }}>
            {/* Kopf */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "24pt",
                borderBottom: "2pt solid #111111",
                paddingBottom: "20pt",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "38pt",
                    lineHeight: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Paulina
                  <br />
                  Dönne<span style={{ color: "var(--accent)" }}>.</span>
                </div>
                <div
                  style={{
                    fontSize: "11pt",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginTop: "10pt",
                  }}
                >
                  Kommunikationsdesignerin
                </div>
              </div>
              <div
                style={{ display: "flex", gap: "20pt", alignItems: "flex-start" }}
              >
                <div
                  style={{
                    fontSize: "10pt",
                    lineHeight: 1.7,
                    textAlign: "right",
                  }}
                >
                  <div>paulinadoenne@outlook.com</div>
                  <div>Stadt eintragen, Deutschland</div>
                  <div>paulinadoenne.de</div>
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "78pt",
                    height: "100pt",
                    overflow: "hidden",
                    background: "var(--img-bg)",
                    flex: "none",
                  }}
                >
                  <ImageSlot placeholder="Foto" />
                </div>
              </div>
            </div>

            {/* Profil */}
            <div style={sectionGrid}>
              <div style={sectionLabel}>Profil</div>
              <p style={{ margin: 0, fontSize: "11pt", lineHeight: 1.6 }}>
                Kommunikationsdesignerin mit Schwerpunkt auf Commercials,
                Editorial Design, Animation und Werbemitteln. Zwei bis drei Sätze
                zum eigenen Profil hier eintragen: Was treibt dich an, wofür
                stehst du gestalterisch?
              </p>
            </div>

            {/* Erfahrung */}
            <div style={sectionGrid}>
              <div style={sectionLabel}>Erfahrung</div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "14pt" }}
              >
                <div style={{ breakInside: "avoid" }}>
                  <div style={jobTitleRow}>
                    <span>Position eintragen — Agentur / Unternehmen</span>
                    <span style={period}>20XX – heute</span>
                  </div>
                  <p style={jobDesc}>
                    Kurzbeschreibung der Tätigkeit: Projekte, Verantwortung,
                    besondere Erfolge. Ein bis zwei Zeilen genügen.
                  </p>
                </div>
                <div style={{ breakInside: "avoid" }}>
                  <div style={jobTitleRow}>
                    <span>Praktikum / Werkstudium — Unternehmen</span>
                    <span style={period}>20XX – 20XX</span>
                  </div>
                  <p style={jobDesc}>
                    Kurzbeschreibung der Tätigkeit und der wichtigsten Aufgaben.
                  </p>
                </div>
                <div style={{ breakInside: "avoid" }}>
                  <div style={jobTitleRow}>
                    <span>Freie Projekte</span>
                    <span style={period}>20XX – heute</span>
                  </div>
                  <p style={jobDesc}>
                    Freie Arbeiten für Kund:innen aus Kultur und Wirtschaft —
                    Auswahl im Portfolio.
                  </p>
                </div>
              </div>
            </div>

            {/* Ausbildung */}
            <div style={sectionGrid}>
              <div style={sectionLabel}>Ausbildung</div>
              <div style={{ breakInside: "avoid" }}>
                <div style={jobTitleRow}>
                  <span>B.A. Kommunikationsdesign — Hochschule eintragen</span>
                  <span style={period}>20XX – 20XX</span>
                </div>
                <p style={jobDesc}>
                  Schwerpunkte, Abschlussarbeit oder Auszeichnungen hier
                  eintragen.
                </p>
              </div>
            </div>

            {/* Fähigkeiten */}
            <div style={sectionGrid}>
              <div style={sectionLabel}>Fähigkeiten</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6pt" }}>
                {skills.map((s) => (
                  <span key={s} style={pill}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Sprachen */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "110pt 1fr",
                gap: "18pt",
                padding: "16pt 0",
              }}
            >
              <div style={sectionLabel}>Sprachen</div>
              <div style={{ fontSize: "11pt", lineHeight: 1.7 }}>
                Deutsch (Muttersprache) · Englisch (fließend)
              </div>
            </div>

            {/* Fußzeile */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "24pt",
                paddingTop: "10pt",
                borderTop: "1pt solid #111111",
                fontSize: "8.5pt",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                opacity: 0.5,
              }}
            >
              <span>Paulina Dönne — Lebenslauf</span>
              <span>Portfolio: paulinadoenne.de</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
