'use client';

import { useCallback, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function prefersReducedMotionNow() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isCoarsePointer() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: none)').matches;
}

export function Logo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isLive, setIsLive] = useState(false);
  const touchPlayedRef = useRef(false);

  const start = useCallback((loop: boolean) => {
    if (prefersReducedMotionNow()) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = loop;
    const play = video.play();
    if (play) play.catch(() => undefined);
    setIsLive(true);
  }, []);

  const stop = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* ignore seek abort */
      }
    }
    setIsLive(false);
  }, []);

  const onPointerEnter = (event: PointerEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotionNow()) return;
    if (event.pointerType === 'touch') return;
    start(true);
  };

  const onPointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === 'touch') return;
    stop();
  };

  const onFocus = () => {
    if (prefersReducedMotionNow()) return;
    start(true);
  };

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotionNow() || !isCoarsePointer()) return;
    if (!touchPlayedRef.current) {
      event.preventDefault();
      touchPlayedRef.current = true;
      start(false);
    }
  };

  const onEnded = () => {
    if (videoRef.current?.loop) return;
    stop();
  };

  return (
    <a
      href="/"
      aria-label="Gal Moussan — home"
      className={`site-logo${isLive ? ' is-live' : ''}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={onFocus}
      onBlur={stop}
      onClick={onClick}
    >
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          className="site-logo-video"
          src="/logo/logo.mp4"
          poster="/logo/logo.jpg"
          muted
          playsInline
          loop
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          controls={false}
          onEnded={onEnded}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/logo.jpg"
        alt=""
        width={64}
        height={64}
        className="site-logo-still"
        draggable={false}
      />
    </a>
  );
}
