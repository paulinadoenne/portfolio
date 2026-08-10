import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paulina Dönne · Kommunikationsdesign",
  description:
    "Portfolio von Paulina Dönne, Kommunikationsdesignerin: Commercials, Editorial, Animation und Werbemittel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
