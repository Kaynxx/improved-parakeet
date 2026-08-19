import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";
import { aktifTema } from "@/app/theme-actions";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Finans Programı",
    template: "%s · Finans Programı",
  },
  description:
    "Piyasa haberleri, topluluk duyarlılığı ve finansal okuryazarlık akademisi — tek panelde.",
};

/** Şema başına farklı tarayıcı kroması: statik `viewport.themeColor` tek
 *  rengi donduruyordu, üç şemayı da yanlış temsil ederdi. */
export async function generateViewport(): Promise<Viewport> {
  const tema = await aktifTema();
  const renk = tema === "editorial" ? "#f6f1e7" : tema === "terminal" ? "#000000" : "#0a0a0c";
  return { themeColor: renk };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const tema = await aktifTema();

  return (
    <html
      lang="tr"
      data-theme={tema}
      className={`${GeistSans.variable} ${GeistMono.variable} ${newsreader.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
