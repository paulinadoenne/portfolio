// Projektdaten — alle Inhalte sind Platzhalter (Dummy) und werden durch echte
// Projekte von Paulina ersetzt. Bilder werden über ImageSlot als Platzhalter
// gerendert; im echten Build src setzen (siehe components/ImageSlot.tsx).

export type GalleryItem = {
  slotId: string;
  ratio: "16/9" | "4/5" | "21/9";
  span2?: boolean;
  caption: string;
  placeholder: string;
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
  gallery: GalleryItem[];
  closingSlotId: string;
  closingCaption: string;
  closingPlaceholder: string;
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "vela-mobility",
    title: "VELA Mobility",
    tag: "Commercial · Imagefilm",
    kunde: "VELA Mobility GmbH",
    rolle: "Konzept, Art Direction & Animation",
    jahr: "2025",
    leistungen: "Storyboard, 30s-Spot, Social Cutdowns, Key Visuals",
    aufgabe:
      "VELA bringt E-Lastenräder in Innenstädte — bekannt war die Marke aber nur in der Branche. Der 30-Sekunden-Spot erzählt einen Liefertag aus der Perspektive des Rads: schnell geschnitten, mit animierten Typo-Inserts im Takt der Musik. Aus dem Spot entstanden zwölf Cutdowns für Social und eine Key-Visual-Serie für OOH.",
    umsetzung:
      "Vom Storyboard bis zum finalen Grade in sechs Wochen: Dreh an zwei Tagen in Köln, danach Schnitt, 2D-Typo-Animation in After Effects und Sounddesign. Die Insert-Typografie greift das Ladeflächen-Raster der Räder auf — dadurch funktionieren Spot, Plakat und Feed als eine Familie.",
    heroPlaceholder: "Hero-Bild des Projekts hier ablegen",
    gallery: [
      { slotId: "detail-1", ratio: "16/9", span2: true, caption: "Filmstill — Eröffnungsszene, 00:04", placeholder: "Filmstill: Eröffnungsszene hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", caption: "Key Visual — Citylight-Format", placeholder: "Key Visual (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", caption: "Social Cutdown — Typo-Insert", placeholder: "Social Cutdown (9:16-Still) hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "OOH-Serie — Großfläche, Kampagnenmotiv 2/3",
    closingPlaceholder: "OOH-Motiv oder Making-of hier ablegen",
  },
  {
    index: "02",
    slug: "klangraum-festival",
    title: "Klangraum Festival",
    tag: "Editorial · Plakatserie",
    kunde: "Klangraum Festival e.V.",
    rolle: "Konzept, Gestaltung & Satz",
    jahr: "2025",
    leistungen: "Plakatserie, Programmheft, Leitsystem, Social Assets",
    aufgabe:
      "Für die dritte Ausgabe des Klangraum Festivals sollte ein visuelles System entstehen, das sich über Plakate, Programmheft und Wege­leitsystem trägt — flexibel genug für 40 Acts und dennoch als eine Handschrift erkennbar.",
    umsetzung:
      "Ein modulares Raster übersetzt die Klangfarben der Bühnen in Typografie und Fläche. Die Plakate variieren dieselbe Grundstruktur pro Spielort — so entsteht Serie statt Einzelmotiv. Gedruckt im Zweifarb-Offset auf ungestrichenem Papier.",
    heroPlaceholder: "Hero-Bild des Projekts hier ablegen",
    gallery: [
      { slotId: "detail-1", ratio: "16/9", span2: true, caption: "Plakatserie — Übersicht der Spielorte", placeholder: "Plakatserie (Übersicht) hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", caption: "Einzelplakat — Hauptbühne", placeholder: "Einzelplakat (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", caption: "Programmheft — Doppelseite", placeholder: "Programmheft (Innenseite) hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "Leitsystem — Aufbau vor Ort",
    closingPlaceholder: "Leitsystem oder Making-of hier ablegen",
  },
  {
    index: "03",
    slug: "kornwerk",
    title: "Kornwerk",
    tag: "Motion · Erklärfilm",
    kunde: "Kornwerk Mühlen GmbH",
    rolle: "Konzept, Illustration & Animation",
    jahr: "2024",
    leistungen: "Drehbuch, Illustration, 2D-Animation, Sounddesign",
    aufgabe:
      "Ein Erklärfilm sollte den Weg vom Korn zum fertigen Mehl verständlich und warm erzählen — für Website und Messe, ohne Fachjargon.",
    umsetzung:
      "Handgezeichnete Illustrationen wurden in After Effects zum Leben erweckt. Ein durchgehender Kamerafahrt-Look verbindet die Stationen zu einer Reise. Farbklima und Musik halten den Ton bodenständig.",
    heroPlaceholder: "Hero-Bild des Projekts hier ablegen",
    gallery: [
      { slotId: "detail-1", ratio: "16/9", span2: true, caption: "Filmstill — Kamerafahrt durch die Mühle", placeholder: "Filmstill hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", caption: "Character-Design — Studien", placeholder: "Illustration (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", caption: "Storyboard — Ausschnitt", placeholder: "Storyboard-Panel hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "Styleframe — Farbklima",
    closingPlaceholder: "Styleframe oder Making-of hier ablegen",
  },
  {
    index: "04",
    slug: "stadtbad-sommer",
    title: "Stadtbad Sommer",
    tag: "Kampagne · OOH",
    kunde: "Stadtwerke — Bäderbetriebe",
    rolle: "Konzept & Art Direction",
    jahr: "2024",
    leistungen: "Kampagnenidee, Key Visuals, OOH, Anzeigen",
    aufgabe:
      "Die städtischen Freibäder sollten eine Sommerkampagne bekommen, die Lust macht und zugleich die Öffnungszeiten klar kommuniziert — plakativ, freundlich, aus der Ferne lesbar.",
    umsetzung:
      "Ein reduziertes Farb- und Formsystem übersetzt Wasser, Sonne und Bewegung in wenige Elemente. Große Typo, klare Hierarchie, konsequent über alle Formate von Citylight bis Anzeige.",
    heroPlaceholder: "Hero-Bild des Projekts hier ablegen",
    gallery: [
      { slotId: "detail-1", ratio: "16/9", span2: true, caption: "Großfläche — Motiv 1/3", placeholder: "OOH-Motiv hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", caption: "Citylight — Hochformat", placeholder: "Citylight-Motiv hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", caption: "Anzeige — Tageszeitung", placeholder: "Anzeigenmotiv hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "Kampagne — Motivfamilie im Stadtraum",
    closingPlaceholder: "Situationsfoto oder Motivfamilie hier ablegen",
  },
  {
    index: "05",
    slug: "cafe-botan",
    title: "Café Botan",
    tag: "Werbemittel · Packaging",
    kunde: "Café Botan",
    rolle: "Branding & Packaging-Design",
    jahr: "2024",
    leistungen: "Logo, Verpackung, Speisekarte, Papeterie",
    aufgabe:
      "Ein neu eröffnetes Café brauchte eine Ausstattung, die vom Kaffeebecher bis zur Speisekarte zusammenpasst — botanisch inspiriert, aber nicht kitschig.",
    umsetzung:
      "Eine gezeichnete Blattmarke bildet den Kern, ergänzt um eine warme Farbpalette und eine ruhige Grotesk. Alle Werbemittel entstehen aus demselben Baukasten — vom Coffee-to-go-Becher bis zur Treuekarte.",
    heroPlaceholder: "Hero-Bild des Projekts hier ablegen",
    gallery: [
      { slotId: "detail-1", ratio: "16/9", span2: true, caption: "Packaging — Becher & Tüten", placeholder: "Packaging-Foto hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", caption: "Speisekarte — Titel", placeholder: "Speisekarte (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", caption: "Papeterie — Treuekarte", placeholder: "Papeterie-Foto hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "Anwendung — im Ladenlokal",
    closingPlaceholder: "Situationsfoto hier ablegen",
  },
  {
    index: "06",
    slug: "papierwelt",
    title: "Papierwelt",
    tag: "Animation · Kurzfilm",
    kunde: "Eigenprojekt",
    rolle: "Konzept, Papierbau & Animation",
    jahr: "2023",
    leistungen: "Drehbuch, Set-Bau, Stop-Motion, Schnitt",
    aufgabe:
      "Ein freier Kurzfilm sollte in einer vollständig aus Papier gebauten Welt spielen — als Studie zu Materialität und Licht in der Stop-Motion.",
    umsetzung:
      "Sets und Figuren wurden von Hand gefaltet und Bild für Bild animiert. Das Licht modelliert die Papierkanten; der Schnitt hält den Rhythmus ruhig, damit das Material wirken kann.",
    heroPlaceholder: "Hero-Bild des Projekts hier ablegen",
    gallery: [
      { slotId: "detail-1", ratio: "16/9", span2: true, caption: "Filmstill — Papierstadt bei Nacht", placeholder: "Filmstill hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", caption: "Set-Detail — Faltung", placeholder: "Set-Foto (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", caption: "Making-of — Animationsstand", placeholder: "Making-of-Foto hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "Set — Totale im Gegenlicht",
    closingPlaceholder: "Set-Totale hier ablegen",
  },
  {
    index: "07",
    slug: "nordlicht",
    title: "Nordlicht",
    tag: "Branding · Identity",
    kunde: "Nordlicht Studio",
    rolle: "Brand-Identity & Gestaltung",
    jahr: "2023",
    leistungen: "Naming-Support, Logo, Design-System, Guidelines",
    aufgabe:
      "Ein junges Fotostudio brauchte eine Identität, die kühl und präzise wirkt, ohne kalt zu sein — von der Visitenkarte bis zur Website konsistent.",
    umsetzung:
      "Ein Bildzeichen aus überlagerten Linien verweist auf Belichtung und Horizont. Ein klares Typo- und Rasterset macht die Marke skalierbar; die Guidelines halten alles zusammen.",
    heroPlaceholder: "Hero-Bild des Projekts hier ablegen",
    gallery: [
      { slotId: "detail-1", ratio: "16/9", span2: true, caption: "Design-System — Übersicht", placeholder: "System-Übersicht hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", caption: "Logo — Konstruktion", placeholder: "Logo-Konstruktion hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", caption: "Geschäftsausstattung", placeholder: "Papeterie-Foto hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "Anwendung — Website & Print",
    closingPlaceholder: "Anwendungsfoto hier ablegen",
  },
  {
    index: "08",
    slug: "form-magazin",
    title: "FORM Magazin",
    tag: "Editorial · Ausgabe 04",
    kunde: "FORM Magazin",
    rolle: "Editorial Design & Satz",
    jahr: "2023",
    leistungen: "Layout-Konzept, Satz, Bildredaktion, Cover",
    aufgabe:
      "Die vierte Ausgabe eines Design-Magazins sollte ein Layoutkonzept bekommen, das Lesbarkeit und Haltung verbindet — großzügig, ruhig, mit klarer Typo-Hierarchie.",
    umsetzung:
      "Ein Grundraster mit variabler Spaltigkeit gibt jedem Beitrag eigenen Rhythmus, ohne die Ausgabe auseinanderfallen zu lassen. Das Cover setzt ein reduziertes Typo-Statement, innen führt eine klare Hierarchie durch die Strecken.",
    heroPlaceholder: "Hero-Bild des Projekts hier ablegen",
    gallery: [
      { slotId: "detail-1", ratio: "16/9", span2: true, caption: "Innenseiten — Strecke", placeholder: "Doppelseite hier ablegen" },
      { slotId: "detail-2", ratio: "4/5", caption: "Cover — Ausgabe 04", placeholder: "Cover (Hochformat) hier ablegen" },
      { slotId: "detail-3", ratio: "4/5", caption: "Typo-Detail — Auftakt", placeholder: "Typo-Detail hier ablegen" },
    ],
    closingSlotId: "detail-4",
    closingCaption: "Ausgabe — im Kontext",
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
