'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type NetworkInformationLike = {
  saveData?: boolean;
  effectiveType?: string;
};

function canPlayCinematicVideo() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') return false;

  return true;
}

export function HeroAtmosphere() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [enableVideo, setEnableVideo] = useState(false);

  useEffect(() => {
    setEnableVideo(canPlayCinematicVideo());
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) setEnableVideo(false);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!enableVideo || !video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const play = video.play();
    if (play) play.catch(() => undefined);

    return () => {
      video.pause();
    };
  }, [enableVideo]);

  useEffect(() => {
    if (prefersReducedMotion || !enableVideo) return;
    const layer = layerRef.current;
    if (!layer) return;

    const apply = () => {
      const y = Math.min(80, Math.max(0, window.scrollY * 0.12));
      layer.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
    };

    const onScroll = () => {
      if (frameRef.current != null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        apply();
      });
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameRef.current != null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [enableVideo, prefersReducedMotion]);

  return (
    <div className="hero-atmosphere" aria-hidden="true">
      {enableVideo ? (
        <div ref={layerRef} className="hero-atmosphere-layer">
          <video
            ref={videoRef}
            className="hero-atmosphere-video"
            muted
            playsInline
            loop
            autoPlay
            preload="auto"
            poster="/videos/hero-poster.jpg"
            src="/videos/hero-loop.mp4"
          />
        </div>
      ) : (
        <div
          className={`hero-atmosphere-still${prefersReducedMotion ? '' : ' hero-atmosphere-still-drift'}`}
          style={{ backgroundImage: "url('/videos/hero-poster.jpg')" }}
        />
      )}
      <div className="hero-atmosphere-scrim" />
    </div>
  );
}
