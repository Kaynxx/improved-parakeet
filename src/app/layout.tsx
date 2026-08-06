import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Schibsted_Grotesk, Source_Serif_4 } from "next/font/google";
import "./globals.css";

/**
 * Üç yüz, üç iş. Hepsinde `latin-ext` zorunlu: ğ ı İ ş Latin Extended-A'da,
 * yalnız `latin` istenirse Türkçe metin yedek yüzden düşüyor ve satır ortasında
 * yüz değişiyor.
 */

/** Arayüz, başlık ve sayılar. Bir haber kuruluşu için çizilmiş grotesk. */
const schibsted = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-schibsted",
  display: "swap",
});

/** Yalnız uzun okuma: haber gövdesi ve ders metni. */
const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif",
  display: "swap",
});

/** Yalnız etiket ve üstbilgi — verinin adı, verinin kendisi değil. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
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

export const viewport: Viewport = {
  themeColor: "#eae8e3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${schibsted.variable} ${sourceSerif.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
