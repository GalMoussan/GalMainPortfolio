import { ScrollSequenceCanvas } from '@/components/ScrollSequenceCanvas';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <main>
        <ScrollSequenceCanvas />
      </main>
      <div className="bg-[#242633]">
        <Footer />
      </div>
    </>
  );
}
