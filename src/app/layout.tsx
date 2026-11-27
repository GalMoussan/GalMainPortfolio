import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces, Instrument_Serif } from "next/font/google";
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

/** Display serif: variable, so weight and softness can move with scroll. */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
  display: "swap",
});

// TEMPORARY (style-v3 preview): alternative display serif, chosen with ?display=instrument.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const title = "Gal Moussan | Fullstack Developer & AI Integration Specialist";
const description =
  "Gal Moussan is a fullstack developer and AI integration specialist in Israel. He builds AI agent systems and web apps, and teaches teams to work with Claude Code and other coding agents.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{history.scrollRestoration='manual'}catch(e){}function pin(){if(location.pathname!=='/'||location.hash)return;window.scrollTo(0,0)}pin();document.addEventListener('DOMContentLoaded',pin);window.addEventListener('pageshow',pin);window.addEventListener('load',pin);})();`,
          }}
        />
        {/* TEMPORARY (style-v3 preview): ?display=instrument|fraunces picks the headline serif for the session. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var q=new URLSearchParams(location.search).get('display');if(q)sessionStorage.setItem('display',q);var d=sessionStorage.getItem('display');if(d)document.documentElement.dataset.display=d}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <StarBackground />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
