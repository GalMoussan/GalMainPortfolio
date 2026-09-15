import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { NoteworthyProjects } from "@/components/sections/NoteworthyProjects";
import { Contact } from "@/components/sections/Contact";
import { ScrollScrubFigure } from "@/components/ui/ScrollScrubFigure";

export default function Home() {
  return (
    <>
      <ScrollScrubFigure />
      <Hero />
      <About />
      <Experience />
      <FeaturedProjects />
      <NoteworthyProjects />
      <Contact />
    </>
  );
}
