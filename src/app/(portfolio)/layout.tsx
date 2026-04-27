import { Nav } from '@/components/layout/Nav';
import { SocialSidebar } from '@/components/layout/SocialSidebar';
import { EmailSidebar } from '@/components/layout/EmailSidebar';
import { Footer } from '@/components/layout/Footer';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#content"
        className="absolute -top-10 left-0 bg-[var(--green)] text-[var(--navy)] py-3 px-5 z-[100] font-mono text-[14px] focus:top-0 transition-all duration-200"
      >
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
    </>
  );
}
