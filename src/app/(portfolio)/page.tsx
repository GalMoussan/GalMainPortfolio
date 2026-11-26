import { ScrollSequenceCanvas } from '@/components/ScrollSequenceCanvas';
import { NoteworthyProjects } from '@/components/sections/NoteworthyProjects';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <main>
        <ScrollSequenceCanvas />
        <div className="bg-[#242633] px-[25px] sm:px-[50px] lg:px-[100px] xl:px-[150px]">
          <NoteworthyProjects />
          <Contact />
        </div>
      </main>
      <div className="bg-[#242633]">
        <Footer />
      </div>
    </>
  );
}
