import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { SocialSidebar } from "@/components/layout/SocialSidebar";
import { EmailSidebar } from "@/components/layout/EmailSidebar";
import { Footer } from "@/components/layout/Footer";
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
        <a href="#content" className="absolute -top-10 left-0 bg-[var(--green)] text-[var(--navy)] py-3 px-5 z-[100] font-mono text-[14px] focus:top-0 transition-all duration-200">
          Skip to Content
        </a>
        <Nav />
        <SocialSidebar />
        <EmailSidebar />
        <div id="content">
          <main className="max-w-[1600px] mx-auto px-[25px] sm:px-[50px] lg:px-[100px] xl:px-[150px] min-h-screen pt-0 pb-0">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
