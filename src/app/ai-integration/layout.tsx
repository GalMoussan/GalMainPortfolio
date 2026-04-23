import { StarBackground } from '@/components/StarBackground';
import { Footer } from '@/components/layout/Footer';
import { AINav } from './_components/AINav';

export default function AIIntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StarBackground />
      <a
        href="#content"
        className="absolute -top-10 left-0 bg-[var(--green)] text-[var(--navy)] py-3 px-5 z-[100] font-mono text-[14px] focus:top-0 transition-all duration-200"
      >
        Skip to Content
      </a>
      <AINav />
      <div id="content">
        <main className="max-w-[1600px] mx-auto px-[25px] sm:px-[50px] lg:px-[100px] xl:px-[150px] min-h-screen pt-[100px] pb-0">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
