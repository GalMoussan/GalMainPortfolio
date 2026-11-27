'use client';

import Link from 'next/link';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { OVERLAY_WINDOWS } from '@/lib/sequenceConfig';
import { caseStudies } from '@/app/ai-integration/_content/case-studies';
import { modernAiStack } from '@/app/ai-integration/_content/about';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SideCard } from './SideCard';
import { useOverlayWindow } from './useOverlayWindow';

/** Top to bottom, mirroring the exploded laptop: screen, logic board, base. */
const layers = [
  { label: 'Orchestration', study: caseStudies['digital-creator-ai'] },
  { label: 'Agents', study: caseStudies.authorlex },
  { label: 'Retrieval', study: caseStudies['transcribe-god'] },
];

const infrastructure = ['Next.js', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Prisma', 'Supabase', 'Firebase'];

const LAYER_STAGGER = 0.012;

/** AI orchestration and infrastructure callouts beside the floating hardware in the `explode` shot. */
export function StackCard({ progress, reduceMotion }: { progress: MotionValue<number>; reduceMotion: boolean }) {
  const card = useOverlayWindow(progress, OVERLAY_WINDOWS.stack, reduceMotion);
  // The staggered layer reveal is desktop-only: on phones the layers sit in a scrollable card,
  // where animating each one every frame competes with the explode shot for the frame budget.
  const staggered = useMediaQuery('(min-width: 1024px)') && !reduceMotion;

  return (
    <SideCard style={card} desktopWidth="lg:w-[min(460px,36vw)]" label="AI orchestration and infrastructure">
      <SectionHeading subtitle={modernAiStack.title}>AI Orchestration</SectionHeading>
      <p className="m-0 text-[14px] leading-[1.6] text-[var(--linen-dim)] [@media(max-height:820px)]:text-[13px]">
        {modernAiStack.body}{' '}
        <Link href="/ai-integration" className="prose-link">
          AI Integration Services →
        </Link>
      </p>

      <ol className="m-0 mt-4 list-none space-y-3 p-0 [@media(max-height:820px)]:mt-3 [@media(max-height:820px)]:space-y-2">
        {layers.map(({ label, study }, i) => (
          <StackLayer key={label} progress={progress} order={i} staggered={staggered} label={label}>
            <h3 className="display m-0 mt-1 text-[18px] leading-tight [@media(max-height:820px)]:text-[16px]">{study.title}</h3>
            <p className="m-0 mt-1 text-[13px] leading-[1.55] text-[var(--linen-dim)]">{study.solution}</p>
            <TechList items={study.tech} />
          </StackLayer>
        ))}
        <StackLayer progress={progress} order={layers.length} staggered={staggered} label="Infrastructure">
          <TechList items={infrastructure} />
        </StackLayer>
      </ol>
    </SideCard>
  );
}

interface StackLayerProps {
  progress: MotionValue<number>;
  order: number;
  /** Fade and slide in one after another; otherwise the layer is simply shown. */
  staggered: boolean;
  label: string;
  children: React.ReactNode;
}

function StackLayer({ progress, order, staggered, label, children }: StackLayerProps) {
  const revealStart = OVERLAY_WINDOWS.stack[0] + 0.01 + order * LAYER_STAGGER;
  const opacity = useTransform(progress, [revealStart, revealStart + 0.02], [0, 1]);
  const x = useTransform(progress, [revealStart, revealStart + 0.02], [16, 0]);

  return (
    <motion.li style={staggered ? { opacity, x } : undefined} className="border-l border-[rgba(243,236,225,0.14)] pl-4">
      <p className="eyebrow m-0">
        {String(order + 1).padStart(2, '0')} · {label}
      </p>
      {children}
    </motion.li>
  );
}

function TechList({ items }: { items: readonly string[] }) {
  return (
    <ul className="m-0 mt-2 flex list-none flex-wrap gap-1.5 p-0">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-[rgba(94,231,255,0.25)] px-2.5 py-0.5 text-[11.5px] text-[rgba(94,231,255,0.85)] [@media(max-height:820px)]:py-0"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
