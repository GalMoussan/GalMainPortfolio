import Image from 'next/image';
import { modernAiStack } from '../_content/about';

export function AboutGal() {
  return (
    <section id="about-gal" className="max-w-[1000px] mx-auto py-[100px]">
      <h2 className="numbered-heading">Why a one-person shop beats a 50-person agency for this.</h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Photo - left on desktop */}
        <div className="md:col-span-5">
          <div className="relative group max-w-[300px] mx-auto">
            {/* Green border offset box */}
            <div className="absolute top-[15px] left-[15px] w-full h-full border-2 border-[var(--green)] rounded transition-[top,left] duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:top-[10px] group-hover:left-[10px]" />
            {/* Image with green tint overlay */}
            <div className="relative rounded overflow-hidden w-full aspect-square">
              <div className="absolute inset-0 bg-[var(--green)] mix-blend-multiply z-10 opacity-40 transition-opacity duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:opacity-0" />
              <Image
                src="/images/profile.jpeg"
                alt="Gal Moussan"
                width={300}
                height={300}
                quality={85}
                sizes="300px"
                className="relative rounded w-full h-full object-cover filter grayscale contrast-[1] brightness-90 transition-[filter] duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:grayscale-0 group-hover:brightness-100"
              />
            </div>
          </div>
        </div>

        {/* Copy - right on desktop */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <h3 className="text-[var(--green)] font-semibold mb-2">Builder, not consultant.</h3>
            <p className="text-[var(--slate)]">
              I&apos;m Gal. Fullstack developer for 5+ years, former tech lead on production systems, and today Chief of AI &amp; Development at a school. I don&apos;t subcontract. The person selling you the system is the person building it.
            </p>
          </div>

          <div>
            <h3 className="text-[var(--green)] font-semibold mb-2">{modernAiStack.title}</h3>
            <p className="text-[var(--slate)]">{modernAiStack.body}</p>
          </div>

          <div>
            <h3 className="text-[var(--green)] font-semibold mb-2">I teach this.</h3>
            <p className="text-[var(--slate)]">
              I&apos;ve taught AI to kids, youth and teams. If I can explain agents to a 13-year-old, I can get your developers shipping with them.
            </p>
          </div>

          <div>
            <h3 className="text-[var(--green)] font-semibold mb-2">Honest about fit.</h3>
            <p className="text-[var(--slate)]">
              I&apos;ll tell you when AI isn&apos;t the answer. Some processes need a better spreadsheet, not an agent. I&apos;d rather say so on the free call than build something that doesn&apos;t work.
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--lightest-navy)]">
            <p className="text-[var(--slate)] text-sm">
              Israel · Remote · Hebrew &amp; English
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
