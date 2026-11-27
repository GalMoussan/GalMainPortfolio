'use client';

import Link from 'next/link';
import { motion, type MotionValue } from 'framer-motion';
import { OVERLAY_WINDOWS } from '@/lib/sequenceConfig';
import { email } from '@/data/social-links';
import { useOverlayWindow } from './useOverlayWindow';
import { KineticWords } from './KineticWords';
import { KineticLines } from './KineticLines';

const HEADING_WINDOW = OVERLAY_WINDOWS.contact;
/** The body follows the heading in. */
const BODY_WINDOW = [OVERLAY_WINDOWS.contact[0] + 0.012, OVERLAY_WINDOWS.contact[1]] as const;

interface ContactCopyProps {
  headingId: string;
  /** Timeline position for the scroll-driven overlay; omit for the static small-screen section. */
  progress?: MotionValue<number>;
  reduceMotion?: boolean;
}

/** Contact copy shared by the md+ overlay and the small-screen solid section. */
export function ContactCopy({ headingId, progress, reduceMotion }: ContactCopyProps) {
  return (
    <>
      <p className="eyebrow m-0">Contact</p>
      <p className="display m-0 mt-3 text-[20px] italic text-[var(--linen-dim)]">What&apos;s Next?</p>
      {/* One line: wrapping would push the block up over the glowing laptop in the final shot. */}
      <h2
        id={headingId}
        className="display m-0 mt-1 whitespace-nowrap text-[clamp(40px,3.9vw,56px)] leading-[1] tracking-[-0.03em]"
      >
        <KineticWords
          text="Get In Touch"
          progress={progress}
          window={progress ? HEADING_WINDOW : undefined}
          reduceMotion={reduceMotion}
          tracking={-0.03}
        />
      </h2>
      <p className="mb-0 mt-5 text-[16px] leading-[1.65] text-[var(--linen-dim)] md:text-[17px]">
        <KineticLines
          parts={[
            "I'm open to projects: AI agent systems, development work of any kind, and coding-agent training for teams. Have something in mind, or just want to say hi? My inbox is open and I reply quickly.",
          ]}
          progress={progress}
          window={progress ? BODY_WINDOW : undefined}
          reduceMotion={reduceMotion}
        />
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-6">
        <a href={`mailto:${email}`} className="btn-primary">
          Say Hello
        </a>
        <Link href="/ai-integration" className="btn-link">
          See services →
        </Link>
      </div>
    </>
  );
}

/**
 * Closing copy under the risen phoenix, mirroring the hero in the opposite corner.
 * md+ only: on phones it would cover the phoenix, so the page shows a solid section instead.
 */
export function ContactOverlay({ progress, reduceMotion }: { progress: MotionValue<number>; reduceMotion: boolean }) {
  const style = useOverlayWindow(progress, OVERLAY_WINDOWS.contact, reduceMotion);

  return (
    <div className="pointer-events-none absolute inset-0 hidden items-end justify-end px-[100px] md:flex lg:pb-[88px] md:pb-[112px]">
      <motion.section
        aria-labelledby="contact-heading"
        style={style}
        className="max-w-[420px] [text-shadow:0_1px_24px_rgba(20,21,29,0.55)] lg:max-w-[340px]"
      >
        <ContactCopy headingId="contact-heading" progress={progress} reduceMotion={reduceMotion} />
      </motion.section>
    </div>
  );
}
