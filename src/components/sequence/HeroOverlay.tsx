'use client';

import { motion, type MotionValue } from 'framer-motion';
import { OVERLAY_WINDOWS } from '@/lib/sequenceConfig';
import { email } from '@/data/social-links';
import { useOverlayWindow } from './useOverlayWindow';

export function HeroOverlay({ progress, reduceMotion }: { progress: MotionValue<number>; reduceMotion: boolean }) {
  const style = useOverlayWindow(progress, OVERLAY_WINDOWS.hero, reduceMotion);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-end px-[25px] pb-[calc(112px+env(safe-area-inset-bottom))] md:px-[100px] xl:px-[150px]">
      <motion.div style={style} className="max-w-[600px] [text-shadow:0_1px_24px_rgba(20,21,29,0.45)]">
        <p className="mb-4 ml-[2px] font-sans text-[15px] font-medium tracking-[0.08em] text-[var(--green)]">
          Hi, my name is
        </p>
        <h1 className="m-0 font-sans text-[clamp(44px,7vw,88px)] font-bold leading-[1.02] tracking-[-0.045em] text-white">
          Gal Moussan.
        </h1>
        <h2 className="m-0 mt-3 font-sans text-[clamp(22px,3vw,34px)] font-semibold leading-[1.15] tracking-[-0.03em] text-white/85">
          I build things for the web.
        </h2>
        <p className="mt-5 max-w-[520px] text-[16px] leading-[1.55] text-white/80 md:text-[18px]">
          I&apos;m a fullstack developer and tech lead with a background in military leadership, specializing in
          building CRM systems and web applications. Currently, I&apos;m leading development at{' '}
          <a href="https://www.lagoonads.com/" className="inline-link" target="_blank" rel="noreferrer">
            Lagoonads
          </a>
          .
        </p>
        <div className="mt-8">
          <a href={`mailto:${email}`} className="outline-button inline-block px-8 py-5 leading-[1]">
            Get In Touch
          </a>
        </div>
      </motion.div>
    </div>
  );
}
