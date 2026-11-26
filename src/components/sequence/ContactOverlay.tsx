'use client';

import { motion, type MotionValue } from 'framer-motion';
import { OVERLAY_WINDOWS } from '@/lib/sequenceConfig';
import { email } from '@/data/social-links';
import { useOverlayWindow } from './useOverlayWindow';

/** Contact copy shared by the md+ overlay and the small-screen solid section. */
export function ContactCopy({ headingId }: { headingId: string }) {
  return (
    <>
      <p className="m-0 font-mono text-[12px] uppercase tracking-[0.24em] text-white/60">Contact</p>
      <p className="m-0 mt-2 font-sans text-[15px] font-medium tracking-[0.04em] text-[var(--green)]">
        What&apos;s Next?
      </p>
      <h2
        id={headingId}
        className="m-0 mt-2 font-sans text-[clamp(36px,5vw,60px)] font-semibold leading-[1.05] tracking-[-0.035em] text-white"
      >
        Get In Touch
      </h2>
      <p className="mb-0 mt-4 text-[16px] leading-[1.55] text-white/80 md:text-[18px]">
        Although I&apos;m not currently looking for any new opportunities, my inbox is always open. Whether you have a
        question or just want to say hi, I&apos;ll try my best to get back to you!
      </p>
      <a href={`mailto:${email}`} className="outline-button mt-6 inline-block px-8 py-5 leading-[1]">
        Say Hello
      </a>
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
        className="max-w-[420px] [text-shadow:0_1px_24px_rgba(20,21,29,0.55)] lg:max-w-[380px]"
      >
        <ContactCopy headingId="contact-heading" />
      </motion.section>
    </div>
  );
}
