import { Nav } from '@/components/layout/Nav';
import { SocialSidebar } from '@/components/layout/SocialSidebar';
import { EmailSidebar } from '@/components/layout/EmailSidebar';

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#content"
        className="absolute -top-10 left-0 bg-[var(--green)] text-[var(--navy)] py-3 px-5 z-[100] font-sans text-[14px] font-medium rounded-full focus:top-0 transition-all duration-200"
      >
        Skip to Content
      </a>
      <Nav />
      <SocialSidebar />
      <EmailSidebar />
      <div id="content" className="relative z-10">
        {children}
      </div>
    </>
  );
}
