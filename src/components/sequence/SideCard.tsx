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
 * Glass card anchored to the right of the viewport on large screens. On smaller
 * ones it is a short bottom sheet above the nav capsule that scrolls internally,
 * so most of the frame stays visible.
 */
export function SideCard({ style, desktopWidth, label, children }: SideCardProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center px-3 pb-[calc(84px+env(safe-area-inset-bottom))] pt-24 md:justify-end md:pr-[96px] lg:items-center lg:px-4 lg:pb-8 lg:pt-24 lg:pr-[clamp(96px,7vw,150px)]">
      <motion.section
        aria-label={label}
        style={style}
        className={`sequence-card max-h-[42vh] w-full max-w-[460px] overflow-y-auto p-4 sm:p-5 lg:max-h-full lg:p-7 ${desktopWidth}`}
      >
        {children}
      </motion.section>
    </div>
  );
}
