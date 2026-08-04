// Projektdaten — alle Inhalte sind Platzhalter (Dummy) und werden durch echte
// Projekte von Paulina ersetzt. Bilder werden über ImageSlot als Platzhalter
// gerendert; im echten Build src setzen (siehe components/ImageSlot.tsx).

export type GalleryItem = {
  slotId: string;
  // Freie CSS-aspect-ratio-Angabe (z.B. "16/9"), damit Bilder mit
  // ungewöhnlichem Seitenverhältnis exakt (ohne object-fit:cover-Beschnitt)
  // eingepasst werden können.
  ratio: string;
  span2?: boolean;
  caption: string;
  placeholder: string;
  src?: string;
};

export type Project = {
  index: string; // "01"
  slug: string;
  title: string;
  tag: string;
  // Detailseite
  kunde: string;
  rolle: string;
  jahr: string;
  leistungen: string;
  aufgabe: string;
  umsetzung: string;
  heroPlaceholder: string;
  heroRatio?: "21/9" | "16/9" | "8/1" | "4/5";
  heroVideo?: string;
  heroVideoWebm?: string;
  heroVideoPoster?: string;
  // Optionaler Anschluss-Clip: spielt automatisch weiter, sobald heroVideo endet.
  heroVideoNext?: string;
  heroVideoNextWebm?: string;
  heroVideoNextPoster?: string;
  gallery: GalleryItem[];
  closingSlotId: string;
  closingCaption: string;
  closingPlaceholder: string;
  closingSrc?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "the-double-standard-of-aging",
    title: "The Double Standard of Aging",
    tag: "Bachelorarbeit · Kinetic Typography",
    kunde: "Eigenprojekt (Bachelorarbeit)",
    rolle: "Konzept, Recherche, Typografie & Animation",
    jahr: "2026",
    leistungen: "Recherche, Interviews, Skript, Kinetic Typography, Sounddesign",
    aufgabe:
      "Für die Bachelorarbeit sollte ein Kurzfilm entstehen, der den doppelten Standard beim Altern sichtbar macht: Warum werden Frauen und Männer gesellschaftlich so unterschiedlich bewertet, wenn es um Aussehen, Selbstbild und Lebensplanung geht? Grundlage sind reale Interview-Aussagen, die den Film tragen.",
    umsetzung:
      "Aus den Interviews wurden prägnante Zeilen zu einem Skript montiert und als kinetische Typografie inszeniert — jede Aussage bekommt ihren eigenen Rhythmus im Takt der Stimme. Die reduzierte Rot-Weiß-Palette hält den Fokus konsequent auf dem gesprochenen Wort.",
    heroPlaceholder: "Filmstill — The Double Standard of Aging",
    heroRatio: "16/9",
    heroVideo: "/projects/the-double-standard-of-aging/film.mp4",
    heroVideoWebm: "/projects/the-double-standard-of-aging/film.webm",
    heroVideoPoster: "/projects/the-double-standard-of-aging/poster.jpg",
    gallery: [
      { slotId: "detail-1", ratio: "16/9", span2: true, src: "/projects/the-double-standard-of-aging/still-unsicherheit.jpg", caption: "Filmstill — „…von einerseits ’ner sehr großen Unsicherheit“", placeholder: "Filmstill hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", caption: "Set-Detail oder Making-of", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", caption: "Skript-Auszug oder Storyboard", placeholder: "Skript/Storyboard hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "Filmstill — „Der hatte gedacht, ich wär deutlich jünger.“",
    closingPlaceholder: "Making-of hier ablegen",
    closingSrc: "/projects/the-double-standard-of-aging/still-juenger.jpg",
  },
  {
    index: "02",
    slug: "fake-it-til-you-make-it",
    title: "Fake It Til You Make It",
    tag: "Motion · Kinetic Typography",
    kunde: "Eigenprojekt (Campus-Intervention)",
    rolle: "Konzept, Typografie & Animation",
    jahr: "2024",
    leistungen: "Konzept, Kinetic Typography, Animation",
    aufgabe:
      "Auf dem Campus sollte eine spielerische Intervention Menschen im Vorbeigehen zum Lächeln bringen — nicht mit einer Botschaft von außen, sondern mit einer direkten, überraschenden Ansprache, die kurz innehalten lässt. Lächeln schüttet Endorphine aus und macht nachweislich glücklicher.",
    umsetzung:
      "Zwei kinetische Typografie-Clips ziehen den Blick in einen Text-Strudel: eine direkte, augenzwinkernde Frage dreht sich spiralförmig auf den Betrachter zu. Die reduzierte Zweifarbigkeit — Rot/Blau im einen, Gelb/Schwarz im anderen Clip — hält den Fokus konsequent auf Bewegung und Text.",
    heroPlaceholder: "Filmstill — Fake It Til You Make It",
    heroRatio: "8/1",
    heroVideo: "/projects/fake-it-til-you-make-it/yellow-jacket.mp4",
    heroVideoPoster: "/projects/fake-it-til-you-make-it/poster.jpg",
    heroVideoNext: "/projects/fake-it-til-you-make-it/red.mp4",
    heroVideoNextPoster: "/projects/fake-it-til-you-make-it/poster-red.jpg",
    gallery: [
      { slotId: "detail-1", ratio: "21/9", span2: true, src: "/projects/fake-it-til-you-make-it/detail-red-wide.jpg", caption: "Filmstill — „Are you wearing a red cap?“", placeholder: "Filmstill hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", src: "/projects/fake-it-til-you-make-it/detail-yellow-portrait.jpg", caption: "Filmstill — „Are you wearing a yellow jacket?“", placeholder: "Filmstill (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", src: "/projects/fake-it-til-you-make-it/detail-red-portrait.jpg", caption: "Filmstill — „Are you wearing a red cap?“", placeholder: "Filmstill (Hochformat) hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "Mockup — Media Wall auf dem Campus",
    closingPlaceholder: "Situationsfoto hier ablegen",
    closingSrc: "/projects/fake-it-til-you-make-it/mediawall-installation.jpg",
  },
  {
    index: "03",
    slug: "abgabe",
    title: "Projekttitel eintragen",
    tag: "Kategorie eintragen",
    kunde: "Kunde eintragen",
    rolle: "Rolle eintragen",
    jahr: "Jahr eintragen",
    leistungen: "Leistungen eintragen",
    aufgabe: "Aufgabenbeschreibung eintragen.",
    umsetzung: "Beschreibung der Umsetzung eintragen.",
    heroPlaceholder: "Filmstill hier ablegen",
    heroVideo: "/projects/abgabe/film.mp4",
    heroVideoPoster: "/projects/abgabe/poster.jpg",
    gallery: [
      { slotId: "detail-1", ratio: "16/9", span2: true, caption: "Bildunterschrift eintragen", placeholder: "Filmstill hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", caption: "Bildunterschrift eintragen", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", caption: "Bildunterschrift eintragen", placeholder: "Foto (Hochformat) hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "Bildunterschrift eintragen",
    closingPlaceholder: "Situationsfoto hier ablegen",
  },
  {
    index: "04",
    slug: "4-wochen-4-poster",
    title: "4 Wochen 4 Poster",
    tag: "Plakatgestaltung · Eigenprojekt",
    kunde: "Eigenprojekt",
    rolle: "Gestaltung eintragen",
    jahr: "Jahr eintragen",
    leistungen: "Plakatgestaltung eintragen",
    aufgabe:
      "In vier Wochen sollte je ein eigenständiges Plakat entstehen — vier sehr unterschiedliche Themen, ein durchgängiger gestalterischer Anspruch.",
    umsetzung: "Beschreibung der Umsetzung eintragen.",
    heroPlaceholder: "Hero-Bild des Projekts hier ablegen",
    gallery: [
      { slotId: "detail-1", ratio: "4/5", src: "/projects/plakatgestaltung/poster-museum.jpg", caption: "Plakat 1 — Bildunterschrift eintragen", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-2", ratio: "1550/2203", src: "/projects/plakatgestaltung/poster-regina.jpg", caption: "Plakat 2 — Bildunterschrift eintragen", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", src: "/projects/plakatgestaltung/poster-hohenzollernring.jpg", caption: "Plakat 3 — Bildunterschrift eintragen", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-4", ratio: "1550/2181", src: "/projects/plakatgestaltung/poster-luisa.jpg", caption: "Plakat 4 — Bildunterschrift eintragen", placeholder: "Foto (Hochformat) hier ablegen" },
    ],
    closingSlotId: "detail-5",
    closingCaption: "Bildunterschrift eintragen",
    closingPlaceholder: "Situationsfoto hier ablegen",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
