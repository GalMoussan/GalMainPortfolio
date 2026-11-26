import { ScrollSequenceCanvas } from '@/components/ScrollSequenceCanvas';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <main>
        <ScrollSequenceCanvas />
        <div className="bg-[#242633] px-[25px] sm:px-[50px] lg:px-[100px] xl:px-[150px]">
          <Contact />
        </div>
      </main>
      <div className="bg-[#242633]">
        <Footer />
      </div>
    </>
  );
}
