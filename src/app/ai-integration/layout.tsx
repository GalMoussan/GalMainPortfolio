import { Footer } from '@/components/layout/Footer';
import { AINav } from './_components/AINav';
import { ConditionalAnalytics } from '@/components/ConditionalAnalytics';
import { ConditionalScrollTracker } from '@/components/ConditionalScrollTracker';

export default function AIIntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#content"
        className="btn-primary absolute -top-16 left-4 z-[100] transition-all duration-200 focus:top-4"
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
      <ConditionalScrollTracker />
      {/* Only load Analytics if user has given consent */}
      <ConditionalAnalytics />
    </>
  );
}
