import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import ImageSlot from "@/components/ImageSlot";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Lebenslauf · Paulina Dönne",
};

const pillLabel: CSSProperties = {
  display: "inline-block",
  background: "var(--ink)",
  color: "#f7f4ef",
  fontSize: "9pt",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  padding: "5pt 12pt",
  borderRadius: "3pt",
  marginBottom: "16pt",
};
const entryTitle: CSSProperties = {
  fontSize: "12.5pt",
  fontWeight: 700,
};
const entryYear: CSSProperties = {
  fontWeight: 500,
};
const entryCompany: CSSProperties = {
  fontSize: "9pt",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: "rgba(17,17,17,0.4)",
  marginTop: "3pt",
};
const entryDesc: CSSProperties = {
  margin: "5pt 0 0 0",
  fontSize: "10.5pt",
  lineHeight: 1.55,
  color: "rgba(17,17,17,0.8)",
  maxWidth: "330pt",
};
const contactLabel: CSSProperties = {
  fontSize: "11pt",
  color: "rgba(17,17,17,0.45)",
};
const contactValue: CSSProperties = {
  fontSize: "11pt",
  textAlign: "right",
  color: "var(--ink)",
};

const experience = [
  {
    title: "werkstudentin art direction.",
    period: "2024–2026",
    company: "REWE Group",
    desc: "konzeption und umsetzung von social-media-assets, art direction für werbekampagnen",
  },
  {
    title: "vollzeittätigkeit.",
    period: "2021–2022",
    company: "Optik Dönne, Brühl",
    desc: "brillenglasschliff, kund:innenberatung zu fassungen und gläsern, reparaturservice, organisatorische abläufe, betreuung der social-media-kanäle",
  },
  {
    title: "ausbildung augenoptikerin.",
    period: "2018–2021",
    company: "Optik Niederprüm, Köln",
    desc: "ausbildungsinhalte: brillenglasschliff, kund:innenberatung zu fassungen und gläsern, reparaturservice, organisatorische abläufe",
  },
  {
    title: "aushilfsjob und auslandsaufenthalt.",
    period: "2018",
  },
];

const education = [
  {
    title: "bachelor kommunikationsdesign.",
    period: "2022–2026",
    company: "Peter-Behrens School of Arts, Düsseldorf",
  },
  {
    title: "schulischer teil der fachhochschulreife.",
    period: "2017",
    company: "Karl-Schiller-Berufskolleg, Brühl",
  },
];

const software = [
  "adobe cloud (indesign, photoshop, illustrator, after effects)",
  "blender / cinema4d · ms office",
  "ki-tools (claude, chatgpt, nano banana, firefly, figma)",
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
          <div style={{ padding: "56pt 50pt", minHeight: "100%" }}>
            {/* Kopf */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "24pt",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "30pt",
                    lineHeight: 1,
                  }}
                >
                  paulina dönne<span style={{ color: "var(--accent)" }}>.</span>
                </div>
                <div
                  style={{
                    fontSize: "12pt",
                    marginTop: "8pt",
                  }}
                >
                  kommunikationsdesignerin
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "6pt 28pt",
                  paddingTop: "4pt",
                }}
              >
                <div style={contactLabel}>email</div>
                <a
                  href="mailto:paulinadoenne@outlook.com"
                  style={{ ...contactValue, textDecoration: "underline" }}
                >
                  paulinadoenne@outlook.com
                </a>
                <div style={contactLabel}>standort</div>
                <div style={contactValue}>köln, deutschland</div>
                <div style={contactLabel}>portfolio</div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: "var(--ink)",
                      color: "#f7f4ef",
                      fontWeight: 700,
                      fontSize: "10.5pt",
                      padding: "4pt 10pt",
                      borderRadius: "3pt",
                    }}
                  >
                    paulinadoenne.de
                  </span>
                </div>
              </div>
            </div>

            {/* Berufserfahrung + Foto */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 130pt",
                gap: "24pt",
                marginTop: "64pt",
              }}
            >
              <div>
                <div style={pillLabel}>Berufserfahrung</div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "16pt" }}
                >
                  {experience.map((e) => (
                    <div key={e.title} style={{ breakInside: "avoid" }}>
                      <div style={entryTitle}>
                        {e.title} <span style={entryYear}>({e.period})</span>
                      </div>
                      {e.company && <div style={entryCompany}>{e.company}</div>}
                      {e.desc && <p style={entryDesc}>{e.desc}</p>}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ alignSelf: "start" }}>
                <div
                  style={{
                    position: "relative",
                    width: "130pt",
                    height: "146pt",
                    overflow: "hidden",
                    background: "var(--img-bg)",
                    border: "1pt dashed rgba(17,17,17,0.3)",
                  }}
                >
                  <ImageSlot placeholder="Foto" src="/lebenslauf-foto.jpg" />
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "20pt",
                    marginTop: "14pt",
                  }}
                >
                  hallo.
                </div>
              </div>
            </div>

            {/* Ausbildung */}
            <div style={{ marginTop: "40pt" }}>
              <div style={pillLabel}>Ausbildung</div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "12pt" }}
              >
                {education.map((e) => (
                  <div key={e.title} style={{ breakInside: "avoid" }}>
                    <div style={entryTitle}>
                      {e.title} <span style={entryYear}>({e.period})</span>
                    </div>
                    <div style={entryCompany}>{e.company}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Software */}
            <div style={{ marginTop: "40pt" }}>
              <div style={pillLabel}>Software</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6pt",
                  fontSize: "11pt",
                  lineHeight: 1.6,
                }}
              >
                {software.map((s) => (
                  <div key={s}>{s}</div>
                ))}
              </div>
            </div>

            {/* Fußzeile */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "64pt",
                fontSize: "10pt",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              <span>Dönne</span>
              <span>Kommunikationsdesign</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
