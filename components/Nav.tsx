import Link from "next/link";
import type { CSSProperties } from "react";

const navStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "8px 20px",
  padding: "22px 40px",
  position: "sticky",
  top: 0,
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  zIndex: 200,
};

const label: CSSProperties = {
  fontSize: "13px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const name: CSSProperties = {
  fontWeight: 700,
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

export function HomeNav() {
  return (
    <nav style={navStyle}>
      <a href="#" style={name}>
        Paulina Dönne
      </a>
      <div
        className="pd-nav-subtitle"
        style={{
          fontSize: "13px",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          opacity: 0.6,
        }}
      >
        Kommunikationsdesign — Portfolio 2026
      </div>
      <div style={{ display: "flex", gap: "32px", ...label }}>
        <a href="#arbeiten">Arbeiten</a>
        <a href="#ueber">Über</a>
        <a href="#kontakt">Kontakt</a>
      </div>
    </nav>
  );
}

/* Nav für Unterseiten: Zurück-Link | Name | rechter Link */
export function SubNav({
  backLabel = "← Alle Arbeiten",
  rightHref = "/#kontakt",
  rightLabel = "Kontakt",
}: {
  backLabel?: string;
  rightHref?: string;
  rightLabel?: string;
}) {
  return (
    <nav style={{ ...navStyle, zIndex: 50 }}>
      <Link href="/" style={label}>
        {backLabel}
      </Link>
      <Link href="/" style={name}>
        Paulina Dönne
      </Link>
      <Link href={rightHref} style={label}>
        {rightLabel}
      </Link>
    </nav>
  );
}
