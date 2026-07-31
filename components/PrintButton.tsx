"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      style={{
        background: "var(--accent)",
        color: "#ffffff",
        border: "none",
        padding: "12px 24px",
        fontFamily: "var(--font)",
        fontSize: "13px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        cursor: "pointer",
      }}
    >
      Drucken / Als PDF sichern
    </button>
  );
}
