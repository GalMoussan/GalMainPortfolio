'use client';

import { useCallback, useRef, useState, type MouseEvent } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function canHover() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function prefersReducedMotionNow() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Logo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isLive, setIsLive] = useState(false);
  const touchPlayedRef = useRef(false);

  const start = useCallback(
    (loop: boolean) => {
      if (prefersReducedMotion || prefersReducedMotionNow()) return;
      const video = videoRef.current;
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.loop = loop;
      if (video.currentTime > 0) video.currentTime = 0;
      const play = video.play();
      if (play) play.catch(() => undefined);
      setIsLive(true);
    },
    [prefersReducedMotion]
  );

  const stop = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsLive(false);
  }, []);

  const onEnter = () => {
    if (prefersReducedMotion || prefersReducedMotionNow() || !canHover()) return;
    start(true);
  };

  const onLeave = () => {
    if (!canHover()) return;
    stop();
  };

  const onFocus = () => {
    if (prefersReducedMotion || prefersReducedMotionNow()) return;
    start(true);
  };

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || prefersReducedMotionNow() || canHover()) return;
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
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onFocus}
      onBlur={stop}
      onClick={onClick}
    >
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          className="site-logo-video"
          muted
          playsInline
          preload="metadata"
          poster="/logo/logo.jpg"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          controls={false}
          onEnded={onEnded}
        >
          <source src="/logo/logo.webm" type="video/webm" />
          <source src="/logo/logo.mp4" type="video/mp4" />
        </video>
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
