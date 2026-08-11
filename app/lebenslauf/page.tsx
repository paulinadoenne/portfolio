import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lebenslauf · Paulina Dönne",
};

const PDF_PATH = "/lebenslauf-paulina-doenne.pdf";

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
        <a
          href={PDF_PATH}
          download
          style={{
            background: "var(--accent)",
            color: "#ffffff",
            padding: "12px 24px",
            fontSize: "13px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          PDF herunterladen
        </a>
      </div>

      <div className="cv-stage">
        <div
          className="cv-sheet"
          style={{ background: "transparent", boxShadow: "0 10px 40px rgba(17,17,17,0.15)" }}
        >
          <iframe
            src={PDF_PATH}
            title="Lebenslauf Paulina Dönne"
            style={{
              display: "block",
              width: "210mm",
              height: "297mm",
              border: "none",
            }}
          />
        </div>
      </div>
    </>
  );
}
