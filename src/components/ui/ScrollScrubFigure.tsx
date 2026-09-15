'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function ScrollScrubFigure() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.pause();

    if (prefersReducedMotion) {
      video.currentTime = 0;
      return;
    }

    const scrub = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      video.currentTime = progress * duration;
    };

    const onLoaded = () => scrub();
    video.addEventListener('loadedmetadata', onLoaded);
    window.addEventListener('scroll', scrub, { passive: true });
    window.addEventListener('resize', scrub);
    scrub();

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
      window.removeEventListener('scroll', scrub);
      window.removeEventListener('resize', scrub);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="scroll-figure" aria-hidden="true">
      <video
        ref={videoRef}
        className="scroll-figure-video"
        muted
        playsInline
        preload="auto"
        poster="/videos/figure-poster.jpg"
        src="/videos/figure-turn.mp4"
      />
    </div>
  );
}
