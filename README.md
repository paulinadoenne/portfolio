# Portfolio Paulina Dönne

Portfolio-Website (zugleich Bewerbungsunterlage) für Paulina Dönne,
Kommunikationsdesignerin. Umsetzung des Design-Handoffs `design_handoff_portfolio`
in **Next.js 16 (App Router) + React 19**, ohne Webfonts (Helvetica/System-Stack),
mit vanilla CSS und CSS Custom Properties.

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build (statisch, prerendered)
npm run start    # Produktions-Server
```

Alle Seiten werden statisch generiert – deploybar auf Vercel (oder jedem
Static-Host) ohne weitere Konfiguration.

## Seiten

| Route               | Datei                              | Inhalt                                   |
| ------------------- | ---------------------------------- | ---------------------------------------- |
| `/`                 | `app/page.tsx`                     | Startseite mit 3D-Projektstapel          |
| `/projekt/[slug]`   | `app/projekt/[slug]/page.tsx`      | Projekt-Detailseite (8 Projekte, zyklisch)|
| `/lebenslauf`       | `app/lebenslauf/page.tsx`          | Druckbarer CV (A4, `window.print()`)     |
| `/impressum`        | `app/impressum/page.tsx`           | Impressum & Datenschutz                   |

## Herzstück: Projektstapel

`components/ProjectStack.tsx` – cursor-gesteuertes „Folder-Deck" in einem normal
`100vh` hohen Abschnitt (kein Scroll-Jacking mehr). Sobald der Cursor die oberste
Karte berührt (`mouseenter`), rückt die nächste Karte per CSS-Transition (0.6s)
nach vorn; React-State (`current`) treibt die Stapel-Transforms. Bei
`prefers-reduced-motion` läuft der Kartenwechsel ohne Animation (Transition aus).

## Was noch anzupassen ist (Platzhalter → echt)

1. **Projektbilder / Portrait / CV-Foto** — `components/ImageSlot.tsx` rendert
   solange graue Platzhalterflächen. Sobald Bilder vorliegen: `src` (und `alt`)
   an die jeweiligen `<ImageSlot>`-Aufrufe übergeben, dann wird ein `<img>`
   ausgegeben. (Für viele Bilder ggf. auf `next/image` umstellen.)
2. **Projektinhalte** — `lib/projects.ts`. Alle 8 Projekte (Titel, Tag, Kunde,
   Rolle, Jahr, Leistungen, Aufgabe, Umsetzung, Bildunterschriften) sind Dummy-
   Texte und durch echte Projekte zu ersetzen.
3. **Kontaktdaten / Impressum / Lebenslauf** — Platzhalter „… eintragen"
   (Adresse, Telefon, Stationen, Hochschule, Hosting-Angaben) durch echte Daten
   ersetzen. E-Mail ist überall `hallo@paulinadoenne.de`.
4. **Social-Links** — Instagram/LinkedIn im Footer (`components/SiteFooter.tsx`).

## Akzentfarbe

Zentral als CSS Custom Property `--accent` in `app/globals.css` (Default `#E8452C`).
Handoff-Alternativen: `#2547D0`, `#0F7B4C`, `#131209`. Ein Wert ändern genügt.

## Design-Tokens

Alle in `app/globals.css` (`:root`): `--paper`, `--ink`, `--accent`, `--img-bg`,
`--footer-bg`, `--footer-hair`, `--ease` (`cubic-bezier(0.22, 0.8, 0.24, 1)`),
`--font`.
