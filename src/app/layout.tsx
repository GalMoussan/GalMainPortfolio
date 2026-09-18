import type { Metadata } from "next";
import localFont from "next/font/local";
import { StarBackground } from "@/components/StarBackground";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gal Moussan | Fullstack Developer & Tech Lead",
  description:
    "Gal Moussan is a fullstack developer and tech lead based in Tel Aviv, specializing in building CRM systems and web applications.",
  openGraph: {
    title: "Gal Moussan | Fullstack Developer & Tech Lead",
    description:
      "Gal Moussan is a fullstack developer and tech lead based in Tel Aviv, specializing in building CRM systems and web applications.",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#10151c",
  },
};

const HERO_SPLIT_CRITICAL_CSS = `
.hero-split{display:flex;align-items:center;min-height:100svh;box-sizing:border-box}
.hero-split-grid{display:grid;grid-template-columns:minmax(0,1fr);align-items:center;width:100%;gap:1.25rem}
.hero-split-left,.hero-split-right{width:auto;max-width:100%;transition:none}
@media (min-width:768px){
.hero-split-grid{grid-template-columns:minmax(0,22rem) minmax(2.5rem,1fr) minmax(0,24rem);column-gap:0;row-gap:0}
.hero-split-left{grid-column:1;max-width:22rem;justify-self:start}
.hero-split-right{grid-column:3;max-width:24rem;justify-self:stretch}
}
@media (min-width:1100px){
.hero-split{width:auto;max-width:none;margin-left:-100px;margin-right:-100px;padding-left:50px;padding-right:50px}
.hero-split-grid{grid-template-columns:22rem minmax(0,1fr) 24rem}
}
@media (min-width:1280px){
.hero-split{margin-left:-150px;margin-right:-150px}
}
.figure-glow{position:absolute;left:50%;top:56%;z-index:0;width:90vmin;height:100vmin;transform:translate(-50%,-50%);opacity:1;pointer-events:none;isolation:isolate;background:radial-gradient(ellipse 46% 62% at 50% 46%,#ffffff 0%,#ffffff 18%,rgba(255,255,255,0.88) 32%,rgba(210,230,240,0.35) 52%,transparent 74%)}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{history.scrollRestoration='manual'}catch(e){}function pin(){if(location.pathname!=='/'||location.hash)return;window.scrollTo(0,0)}pin();document.addEventListener('DOMContentLoaded',pin);window.addEventListener('pageshow',pin);window.addEventListener('load',pin);})();`,
          }}
        />
        <link rel="preload" as="image" href="/gal-spin-poster.png" fetchPriority="high" />
        <style dangerouslySetInnerHTML={{ __html: HERO_SPLIT_CRITICAL_CSS }} />
      </head>
      <body>
        <StarBackground />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
