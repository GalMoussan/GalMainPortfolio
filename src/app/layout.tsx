import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { StarBackground } from "@/components/StarBackground";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
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
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body>
        <StarBackground />
        {children}
      </body>
    </html>
  );
}
