'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function ScrollScrubController() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const frameRef = useRef<number | null>(null);
  const lastGoodTimeRef = useRef(0);

  useEffect(() => {
    const root = document.querySelector('.scroll-figure');
    const video = root?.querySelector<HTMLVideoElement>('video.scroll-figure-video');
    if (!root || !video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.pause();

    const showVideo = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        root.classList.add('is-live');
      }
    };
    showVideo();
    video.addEventListener('loadeddata', showVideo);
    video.addEventListener('canplay', showVideo);

    const freezeMid = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.currentTime = video.duration * 0.5;
      }
    };

    if (prefersReducedMotion) {
      const onMeta = () => freezeMid();
      video.addEventListener('loadedmetadata', onMeta);
      freezeMid();
      return () => {
        video.removeEventListener('loadedmetadata', onMeta);
        video.removeEventListener('loadeddata', showVideo);
        video.removeEventListener('canplay', showVideo);
      };
    }

    const apply = () => {
      if (video.seeking) return;
      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      const scrolling = document.scrollingElement || document.documentElement;
      const max = Math.max(1, scrolling.scrollHeight - window.innerHeight);
      const y = window.scrollY || scrolling.scrollTop || 0;
      const progress = Math.min(1, Math.max(0, y / max));
      const nextTime = progress * (duration - 0.04);
      if (Math.abs(video.currentTime - nextTime) <= 0.01) return;
      try {
        video.currentTime = nextTime;
      } catch {
        video.currentTime = lastGoodTimeRef.current;
      }
    };

    const onScroll = () => {
      if (frameRef.current != null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        apply();
      });
    };

    const onSeeked = () => {
      lastGoodTimeRef.current = video.currentTime;
      onScroll();
    };

    video.addEventListener('loadedmetadata', apply);
    video.addEventListener('loadeddata', apply);
    video.addEventListener('seeked', onSeeked);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    apply();

    return () => {
      video.removeEventListener('loadeddata', showVideo);
      video.removeEventListener('canplay', showVideo);
      video.removeEventListener('loadedmetadata', apply);
      video.removeEventListener('loadeddata', apply);
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameRef.current != null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [prefersReducedMotion]);

  return null;
}
