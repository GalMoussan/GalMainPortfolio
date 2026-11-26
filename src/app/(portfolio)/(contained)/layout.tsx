import { Footer } from '@/components/layout/Footer';

/** Archive and tool pages: centred, padded content column above the site footer. */
export default function ContainedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="max-w-[1600px] mx-auto px-[25px] sm:px-[50px] lg:px-[100px] xl:px-[150px] min-h-screen pt-0 pb-0">
        {children}
      </main>
      <Footer />
    </>
  );
}
