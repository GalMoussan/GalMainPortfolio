'use client';

import Link from 'next/link';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { OVERLAY_WINDOWS } from '@/lib/sequenceConfig';
import { caseStudies } from '@/app/ai-integration/_content/case-studies';
import { modernAiStack } from '@/app/ai-integration/_content/about';
import { SectionHeading } from '@/components/ui/SectionHeading';
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

  return (
    <SideCard style={card} desktopWidth="lg:w-[min(440px,32vw)]" label="AI orchestration and infrastructure">
      <SectionHeading subtitle={modernAiStack.title}>AI Orchestration</SectionHeading>
      <p className="m-0 text-[14px] leading-[1.55] text-white/75">
        {modernAiStack.body}{' '}
        <Link href="/ai-integration" className="inline-link">
          AI Integration Services →
        </Link>
      </p>

      <ol className="m-0 mt-4 list-none space-y-3 p-0">
        {layers.map(({ label, study }, i) => (
          <StackLayer key={label} progress={progress} order={i} reduceMotion={reduceMotion} label={label}>
            <h3 className="m-0 mt-1 text-[15px] font-semibold tracking-[-0.01em] text-white">{study.title}</h3>
            <p className="m-0 mt-1 text-[13px] leading-[1.5] text-white/70">{study.solution}</p>
            <TechList items={study.tech} />
          </StackLayer>
        ))}
        <StackLayer progress={progress} order={layers.length} reduceMotion={reduceMotion} label="Infrastructure">
          <TechList items={infrastructure} />
        </StackLayer>
      </ol>
    </SideCard>
  );
}

interface StackLayerProps {
  progress: MotionValue<number>;
  order: number;
  reduceMotion: boolean;
  label: string;
  children: React.ReactNode;
}

function StackLayer({ progress, order, reduceMotion, label, children }: StackLayerProps) {
  const revealStart = OVERLAY_WINDOWS.stack[0] + 0.01 + order * LAYER_STAGGER;
  const opacity = useTransform(progress, [revealStart, revealStart + 0.02], [0, 1]);
  const x = useTransform(progress, [revealStart, revealStart + 0.02], [16, 0]);

  return (
    <motion.li style={{ opacity, x: reduceMotion ? 0 : x }} className="border-l border-[rgba(94,231,255,0.4)] pl-4">
      <p className="m-0 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--green)]">
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
          className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 font-mono text-[11px] text-white/70"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
