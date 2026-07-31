/*
 * Ersetzt das Prototyping-Element <image-slot>.
 * Solange kein echtes Bild vorliegt, wird eine graue Platzhalterfläche mit
 * Hinweistext gerendert. Sobald Paulina die Bilder liefert: `src` (und `alt`)
 * setzen — dann wird ein <img> mit object-fit:cover ausgegeben.
 */
type Props = {
  placeholder?: string;
  src?: string;
  alt?: string;
};

export default function ImageSlot({ placeholder, src, alt }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? placeholder ?? ""}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
        background: "var(--img-bg)",
        color: "rgba(17,17,17,0.4)",
        fontSize: "12px",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        lineHeight: 1.5,
      }}
    >
      {placeholder}
    </div>
  );
}
