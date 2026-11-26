import { ScrollSequenceCanvas } from '@/components/ScrollSequenceCanvas';
import { ContactCopy } from '@/components/sequence/ContactOverlay';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <main>
        <ScrollSequenceCanvas />
        {/* Phones: contact on solid ground so the phoenix finale stays uncovered (md+ uses the overlay). */}
        <section aria-labelledby="contact-heading-mobile" className="bg-[#242633] px-[25px] py-[100px] md:hidden">
          <ContactCopy headingId="contact-heading-mobile" />
        </section>
      </main>
      <div className="bg-[#242633]">
        <Footer />
      </div>
    </>
  );
}
