'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function ScrollScrubFigure() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.pause();

    const freezeMid = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = video.duration * 0.5;
      }
    };

    if (prefersReducedMotion) {
      const onMeta = () => freezeMid();
      video.addEventListener('loadedmetadata', onMeta);
      freezeMid();
      return () => video.removeEventListener('loadedmetadata', onMeta);
    }

    const apply = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      const root = document.scrollingElement || document.documentElement;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      const y = window.scrollY || root.scrollTop || 0;
      const progress = Math.min(1, Math.max(0, y / max));
      const nextTime = progress * (duration - 0.04);
      if (Math.abs(video.currentTime - nextTime) > 0.01) {
        video.currentTime = nextTime;
      }
    };

    const onScroll = () => {
      if (frameRef.current != null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        apply();
      });
    };

    video.addEventListener('loadedmetadata', apply);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    apply();

    return () => {
      video.removeEventListener('loadedmetadata', apply);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameRef.current != null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="scroll-figure" aria-hidden="true">
      <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden="true">
        <filter id="gal-knock-white" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1.35 -1.35 -1.35 3.55 0"
          />
        </filter>
      </svg>
      <div className="scroll-figure-glow" />
      <video
        ref={videoRef}
        className="scroll-figure-video"
        muted
        playsInline
        preload="auto"
        poster="/gal-spin-poster.jpg"
        src="/gal-spin.mp4"
        controls={false}
        disablePictureInPicture
      />
    </div>
  );
}
