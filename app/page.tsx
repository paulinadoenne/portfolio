import Link from "next/link";
import { HomeNav } from "@/components/Nav";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import ProjectStack from "@/components/ProjectStack";
import SiteFooter from "@/components/SiteFooter";
import FlairLayer from "@/components/FlairLayer";
import BubbleField from "@/components/BubbleField";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <BubbleField />
      <FlairLayer />
      <HomeNav />

      {/* ===== PROJEKT-STAPEL ===== */}
      <ProjectStack />

      {/* ===== ÜBER MICH ===== */}
      <section
        id="ueber"
        className="pd-about-grid"
        style={{
          position: "relative",
          zIndex: 60,
          borderTop: "1px solid var(--ink)",
          padding: "clamp(64px, 10vw, 120px) clamp(20px, 5vw, 40px)",
          display: "grid",
          gridTemplateColumns: "minmax(240px, 340px) 1fr",
          gap: "clamp(32px, 6vw, 64px)",
          alignItems: "start",
        }}
      >
        <Reveal
          kind="img"
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "3/4",
            overflow: "hidden",
            background: "var(--img-bg)",
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <ImageSlot
              src="/portrait-paulina.jpg"
              alt="Portrait von Paulina Dönne"
            />
          </div>
        </Reveal>

        <Reveal kind="up" delay={120} style={{ maxWidth: "760px" }}>
          <h2
            style={{
              margin: "0 0 32px 0",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              fontSize: "clamp(44px, 6vw, 88px)",
              lineHeight: 0.95,
            }}
          >
            Über mich
          </h2>
          <p
            style={{
              margin: "0 0 40px 0",
              fontSize: "clamp(20px, 2vw, 28px)",
              lineHeight: 1.55,
            }}
          >
            Ich bin Paulina Dönne, Kommunikationsdesignerin aus Köln. An der
            Peter Behrens School of Arts habe ich gelernt, Gestaltung von der
            ersten Idee bis zum letzten Frame zu denken: von Advertising
            Design über Editorial bis Bewegtbild. Hier zeige ich eine Auswahl
            meiner Projekte: Commercials, Editorial Design, Animation
            und Werbemittel. Dieses Portfolio dient zugleich als
            Bewerbungsunterlage.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link
              href="/lebenslauf"
              className="pd-btn-fill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "var(--ink)",
                color: "#ffffff",
                padding: "16px 30px",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Lebenslauf (PDF) ↓
            </Link>
            <a
              href="mailto:paulinadoenne@outlook.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid var(--ink)",
                padding: "16px 30px",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Kontakt
            </a>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
