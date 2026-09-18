import { ScrollScrubController } from './ScrollScrubController';

export function ScrollScrubFigure() {
  return (
    <div className="scroll-figure" aria-hidden="true">
      <div className="figure-glow" aria-hidden="true" />
      <div className="scroll-figure-media">
        <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden="true">
          <filter id="gal-knock-white" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1.35 -1.35 -1.35 3.55 0"
            />
          </filter>
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="scroll-figure-poster"
          src="/gal-spin-poster.png"
          alt=""
          width={720}
          height={720}
          decoding="sync"
          fetchPriority="high"
          draggable={false}
        />
        <video
          className="scroll-figure-video"
          src="/gal-spin.mp4"
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
        />
      </div>
      <ScrollScrubController />
    </div>
  );
}
