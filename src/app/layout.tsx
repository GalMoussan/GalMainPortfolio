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
    "theme-color": "#0a192f",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <StarBackground />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
