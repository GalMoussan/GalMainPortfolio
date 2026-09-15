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

interface HeroAtmosphereProps {
  anchorRef: { current: HTMLElement | null };
}

export function HeroAtmosphere({ anchorRef }: HeroAtmosphereProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [enableVideo, setEnableVideo] = useState(false);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    setEnableVideo(canPlayCinematicVideo());
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setEnableVideo(false);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    const anchor = anchorRef.current;
    if (!enableVideo || !video || !anchor) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const syncPlayback = (visible: boolean) => {
      if (visible) {
        const play = video.play();
        if (play) play.catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => syncPlayback(entry.isIntersecting && entry.intersectionRatio > 0.02),
      { threshold: [0, 0.02, 0.1, 0.25] }
    );

    observer.observe(anchor);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [anchorRef, enableVideo]);

  useEffect(() => {
    if (prefersReducedMotion || !enableVideo) return;

    const onScroll = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      if (rect.bottom <= 0) {
        setParallax(0);
        return;
      }
      setParallax(Math.min(120, Math.max(0, window.scrollY * 0.22)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [anchorRef, enableVideo, prefersReducedMotion]);

  return (
    <div className="hero-atmosphere" aria-hidden="true">
      {enableVideo ? (
        <video
          ref={videoRef}
          className="hero-atmosphere-video"
          muted
          playsInline
          loop
          preload="metadata"
          poster="/videos/hero-poster.jpg"
          style={{ transform: `translate3d(0, ${parallax}px, 0) scale(1.08)` }}
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
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
