'use client';

import { motion, type MotionStyle } from 'framer-motion';

interface SideCardProps {
  style: MotionStyle;
  /** Width on large screens, where the card sits in the right-hand negative space. */
  desktopWidth: string;
  label: string;
  children: React.ReactNode;
}

/**
 * Glass card anchored to the right of the viewport on large screens and to the
 * bottom (above the nav capsule) on smaller ones.
 */
export function SideCard({ style, desktopWidth, label, children }: SideCardProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center px-4 pb-[calc(92px+env(safe-area-inset-bottom))] pt-24 md:justify-end md:pr-[96px] lg:items-center lg:pb-8 lg:pt-24 lg:pr-[clamp(96px,7vw,150px)]">
      <motion.section
        aria-label={label}
        style={style}
        className={`sequence-card max-h-full w-full max-w-[460px] overflow-y-auto p-6 lg:p-7 ${desktopWidth}`}
      >
        {children}
      </motion.section>
    </div>
  );
}
