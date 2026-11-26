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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{history.scrollRestoration='manual'}catch(e){}function pin(){if(location.pathname!=='/'||location.hash)return;window.scrollTo(0,0)}pin();document.addEventListener('DOMContentLoaded',pin);window.addEventListener('pageshow',pin);window.addEventListener('load',pin);})();`,
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
