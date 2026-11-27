'use client';

import Link from 'next/link';
import { motion, type MotionValue } from 'framer-motion';
import { OVERLAY_WINDOWS } from '@/lib/sequenceConfig';
import { email } from '@/data/social-links';
import { useOverlayWindow } from './useOverlayWindow';

export function HeroOverlay({ progress, reduceMotion }: { progress: MotionValue<number>; reduceMotion: boolean }) {
  const style = useOverlayWindow(progress, OVERLAY_WINDOWS.hero, reduceMotion);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-end px-[25px] pb-[calc(112px+env(safe-area-inset-bottom))] md:px-[100px] xl:px-[150px]">
      {/* Narrow column: keeps the copy left of the subject's glasses and hands in the opening shot. */}
      <motion.div style={style} className="max-w-[540px] [text-shadow:0_1px_24px_rgba(20,21,29,0.45)]">
        <p className="eyebrow mb-5 ml-[2px] !text-[12px]">Hi, my name is</p>
        {/* Stacked on wider screens: the name reads as a title card. */}
        <h1 className="display m-0 text-[clamp(52px,7.5vw,112px)] leading-[0.95] tracking-[-0.03em]">
          Gal<br className="hidden md:block" /> Moussan.
        </h1>
        <h2 className="display m-0 mt-4 text-[clamp(22px,2.4vw,30px)] italic leading-[1.2] text-[rgba(243,236,225,0.9)]">
          I build things for the web — and teach others to build with AI.
        </h2>
        <p className="mt-5 max-w-[480px] text-[16px] leading-[1.65] text-[var(--linen-dim)] md:text-[17px]">
          I&apos;m a fullstack developer and AI integration specialist. I lead AI and development at{' '}
          <a href="https://iasanorth.com" className="prose-link" target="_blank" rel="noreferrer">
            Yassa North
          </a>
          , a school in northern Israel. Alongside that, I build AI agent systems for businesses, take on development
          projects, and train teams to work with Claude Code and other coding agents.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a href={`mailto:${email}`} className="btn-primary">
            Get In Touch
          </a>
          <Link href="/ai-integration" className="btn-link">
            Work with me →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
