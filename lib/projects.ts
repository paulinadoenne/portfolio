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
  // Optional: Galerie-Kachel als Video statt Bild (src dient dann als Poster).
  video?: string;
  videoWebm?: string;
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
  // Video nur für die Rondell-Kartenvorschau, unabhängig von heroVideo
  // (das die Detailseite steuert) — z.B. wenn die Detailseite bewusst ohne
  // Video auskommen soll, das Rondell aber trotzdem eine Bewegtbild-
  // Vorschau zeigen soll.
  cardVideo?: string;
  cardVideoWebm?: string;
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
    rolle: "Konzept, Recherche, Typografie, Animation & Soundcollage",
    jahr: "2026",
    leistungen: "Recherche, Interviews, Skript, Kinetic Typography, Soundcollage",
    aufgabe:
      "Für die Bachelorarbeit sollte ein Kurzfilm entstehen, der den doppelten Standard beim Altern sichtbar macht: Warum werden Frauen und Männer gesellschaftlich so unterschiedlich bewertet, wenn es um Aussehen, Selbstbild und Lebensplanung geht? Grundlage sind reale Interview-Aussagen, die den Film tragen.",
    umsetzung:
      "Gestalterisch orientiert sich der Film an Barbara Kruger und Jenny Holzer: Krugers bildhafte Sprache aus roten Flächen und knapper, unmissverständlicher Typografie trifft auf Holzers reduzierte, fast plakative Textaussagen. Aus den Interviews wurden prägnante Zeilen zu einem Skript montiert und als kinetische Typografie inszeniert: jede Aussage bekommt ihren eigenen Rhythmus im Takt der Stimme. Auch die Soundcollage, die diesen Takt trägt, stammt aus eigener Gestaltung. Die reduzierte Rot-Weiß-Palette hält den Fokus konsequent auf dem gesprochenen Wort.",
    heroPlaceholder: "Filmstill · The Double Standard of Aging",
    heroRatio: "16/9",
    heroVideo: "/projects/the-double-standard-of-aging/film.mp4",
    heroVideoWebm: "/projects/the-double-standard-of-aging/film.webm",
    heroVideoPoster: "/projects/the-double-standard-of-aging/poster.jpg",
    gallery: [
      { slotId: "detail-1", ratio: "16/9", span2: true, src: "/projects/the-double-standard-of-aging/still-unsicherheit.jpg", caption: "Filmstill: „…von einerseits ’ner sehr großen Unsicherheit“", placeholder: "Filmstill hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", caption: "Set-Detail oder Making-of", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", caption: "Skript-Auszug oder Storyboard", placeholder: "Skript/Storyboard hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "Filmstill: „Der hatte gedacht, ich wär deutlich jünger.“",
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
      "Auf dem Campus sollte eine spielerische Intervention Menschen im Vorbeigehen zum Lächeln bringen, nicht mit einer Botschaft von außen, sondern mit einer direkten, überraschenden Ansprache, die kurz innehalten lässt. Lächeln schüttet Endorphine aus und macht nachweislich glücklicher.",
    umsetzung:
      "Zwei kinetische Typografie-Clips ziehen den Blick in einen Text-Strudel: eine direkte, augenzwinkernde Frage dreht sich spiralförmig auf den Betrachter zu. Die reduzierte Zweifarbigkeit (Rot/Blau im einen, Gelb/Schwarz im anderen Clip) hält den Fokus konsequent auf Bewegung und Text.",
    heroPlaceholder: "Filmstill · Fake It Til You Make It",
    heroRatio: "8/1",
    heroVideo: "/projects/fake-it-til-you-make-it/yellow-jacket.mp4",
    heroVideoPoster: "/projects/fake-it-til-you-make-it/poster.jpg",
    heroVideoNext: "/projects/fake-it-til-you-make-it/red.mp4",
    heroVideoNextPoster: "/projects/fake-it-til-you-make-it/poster-red.jpg",
    gallery: [
      { slotId: "detail-1", ratio: "21/9", span2: true, src: "/projects/fake-it-til-you-make-it/detail-red-wide.jpg", caption: "Filmstill: „Are you wearing a red cap?“", placeholder: "Filmstill hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", src: "/projects/fake-it-til-you-make-it/detail-yellow-portrait.jpg", caption: "Filmstill: „Are you wearing a yellow jacket?“", placeholder: "Filmstill (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", src: "/projects/fake-it-til-you-make-it/detail-red-portrait.jpg", caption: "Filmstill: „Are you wearing a red cap?“", placeholder: "Filmstill (Hochformat) hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "Mockup · Media Wall auf dem Campus",
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
    rolle: "Konzept & Gestaltung",
    jahr: "2026",
    leistungen: "Konzept, Layout, Typografie, Bildbearbeitung",
    aufgabe:
      "Das Ziel: jede Woche ein eigenständiges Plakat, um die Umgebung zu gestalten. Vier Wochen, vier sehr unterschiedliche Themen, ein durchgängiger gestalterischer Anspruch.",
    umsetzung: "Beschreibung der Umsetzung eintragen.",
    heroPlaceholder: "Hero-Bild des Projekts hier ablegen",
    heroVideoPoster: "/projects/plakatgestaltung/poster-museum.jpg",
    cardVideo: "/projects/plakatgestaltung/museum-plakat-lang.mp4",
    gallery: [
      { slotId: "detail-1", ratio: "4/5", src: "/projects/plakatgestaltung/poster-museum.jpg", caption: "Plakat 1: Programmplakat für das Museum für Ostasiatische Kunst Köln", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", src: "/projects/plakatgestaltung/poster-hohenzollernring.jpg", caption: "Plakat 3: Farbintensive Fotocollage mit Adresse Hohenzollernring", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "1550/2203", src: "/projects/plakatgestaltung/poster-regina.jpg", caption: "Plakat 2: Illustriertes Freundschaftsplakat für Regina", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-4", ratio: "1550/2181", src: "/projects/plakatgestaltung/poster-luisa.jpg", caption: "Plakat 4: Einladungsplakat zu Luisas Geburtstag", placeholder: "Foto (Hochformat) hier ablegen" },
    ],
    closingSlotId: "detail-5",
    closingCaption: "Bildunterschrift eintragen",
    closingPlaceholder: "Situationsfoto hier ablegen",
  },
  {
    index: "05",
    slug: "fraktale-welt",
    title: "Fraktale Welt",
    tag: "Musikvideo · Uni-Projekt",
    kunde: "Eigenprojekt (Uni-Projekt)",
    rolle: "Konzept, Kamera & Motion Design",
    jahr: "2024",
    leistungen: "Konzept, Dreh, Motion Design, Schnitt",
    aufgabe:
      "Im Rahmen eines Uni-Projekts sollte zu einem frei gewählten Track ein Musikvideo entstehen. Die Wahl fiel auf „Night Sun“ von DJane Nava: ein anonymer Mann zieht durch die Nacht und wird dabei zunehmend überfordert von den Reizen, die die Night Sun über ihn bringt.",
    umsetzung:
      "Gedreht wurde mit zwei Kameras. Der Camcorder liefert die POV-Aufnahmen, die den Mann aus seiner eigenen Perspektive durch die Nacht begleiten, während das Smartphone einfängt, was ihm dabei begegnet: Neonschilder, Lichtreflexe, flüchtige Eindrücke der Stadt. Im Schnitt verdichten sich beide Perspektiven zu einem zunehmend fragmentierten, fraktalen Bildrhythmus, der die wachsende Reizüberflutung des Protagonisten spürbar macht.",
    heroPlaceholder: "Filmstill · Night Sun (DJane Nava)",
    heroVideo: "/projects/fraktale-welt/film.mov",
    heroVideoPoster: "/projects/fraktale-welt/poster.jpg",
    gallery: [
      { slotId: "detail-2", ratio: "4/5", src: "/projects/fraktale-welt/still-neon-figur.jpg", caption: "Filmstill: Neonschild-Überlagerung", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", src: "/projects/fraktale-welt/still-glitch-lauf.jpg", caption: "Filmstill: fraktale Überlagerung", placeholder: "Foto (Hochformat) hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "Filmstill: Night Sun",
    closingPlaceholder: "Situationsfoto hier ablegen",
    closingSrc: "/projects/fraktale-welt/still-closing.jpg",
  },
  {
    index: "06",
    slug: "rewe-art-direction",
    title: "REWE Art Direction",
    tag: "Art Direction · Werkstudentin",
    kunde: "REWE Dein Markt",
    rolle: "Art Direction (Werkstudentin)",
    jahr: "2025/2026",
    leistungen: "Layout, Bildregie, Reinzeichnung, Retusche",
    aufgabe:
      "Als Werkstudentin in der Art Direction bei REWE entstand eine breite Auswahl an Werbemitteln: von Rezeptkommunikation über Store-Kommunikation bis zu einer Spendenaktion für die Tafeln, immer innerhalb des bestehenden REWE-Markenauftritts.",
    umsetzung:
      "Vom Gehwegaufsteller über die Kassenzonen-Kommunikation bis zur Rezeptkarte fürs Weihnachtsgeschäft: Jedes Format verlangt ein eigenes Zusammenspiel aus Bild, Text und Markenelementen, von großformatigem Print bis zum kleinteiligen Point-of-Sale-Aufsteller.",
    heroPlaceholder: "Sujet hier ablegen",
    heroVideoPoster: "/projects/rewe-art-direction/gehwegaufsteller.jpg",
    cardVideo: "/projects/rewe-art-direction/neukundenrabatt.mp4",
    gallery: [
      { slotId: "detail-6", ratio: "1200/675", span2: true, src: "/projects/rewe-art-direction/weisser-bohnensalat.jpg", caption: "Rezeptkommunikation: Weißer Bohnensalat", placeholder: "Foto hier ablegen" },
      { slotId: "detail-1", ratio: "1200/1662", span2: true, src: "/projects/rewe-art-direction/gehwegaufsteller.jpg", caption: "Gehwegaufsteller: Spendenaktion für die Tafeln vor Ort", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-2", ratio: "1200/1687", src: "/projects/rewe-art-direction/dankeskommunikation.jpg", caption: "Dankesplakat: „Gemeinsam Teller füllen“ für die Tafel-Kooperation", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "1200/1673", src: "/projects/rewe-art-direction/selfcheckout.jpg", caption: "Infotafel am Self-Checkout: Ablauf der Spendenaktion", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-4", ratio: "600/1223", src: "/projects/rewe-art-direction/sesameis.jpg", caption: "Xmas-POS für REWE Feine Welt: Sesamreis mit Kokos auf Mango-Spiegel", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-4b", ratio: "600/1223", src: "/projects/rewe-art-direction/sesameis-rezept.jpg", caption: "Rückseite mit Zutaten und Zubereitung", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-4c", ratio: "1/1", src: "/projects/rewe-art-direction/neukundenrabatt.jpg", video: "/projects/rewe-art-direction/neukundenrabatt.mp4", caption: "Social-Ad (Video): 20 € Neukundengutschein für den REWE Lieferservice", placeholder: "Video hier ablegen" },
      { slotId: "detail-5", ratio: "1/1", src: "/projects/rewe-art-direction/mitarbeitendenrabatt.jpg", caption: "Recruiting-Sujet: Mitarbeitendenrabatt", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-7", ratio: "600/941", src: "/projects/rewe-art-direction/thekenfrische-icon.jpg", caption: "Icon: Thekenfrische", placeholder: "Icon hier ablegen" },
      { slotId: "detail-7b", ratio: "800/1200", src: "/projects/rewe-art-direction/wassermelonen-eistee.jpg", caption: "Rezeptkommunikation: Wassermelonen-Limetten-Eistee", placeholder: "Foto (Hochformat) hier ablegen" },
      { slotId: "detail-8", ratio: "4/5", caption: "Rezeptkommunikation: Bratlinge mit Pastinaken-Möhren-Gemüse", placeholder: "Foto (Hochformat) hier ablegen" },
    ],
    closingSlotId: "detail-9",
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
