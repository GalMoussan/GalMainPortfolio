'use client';

import { HeroAtmosphere } from '@/components/HeroAtmosphere';

export function Hero() {
  return (
    <>
      <HeroAtmosphere />
      <section
        id="hero"
        className="hero-copy relative z-[2] flex flex-col justify-end min-h-[100svh] max-w-[1000px] mx-auto py-0 pt-[120px] pb-[72px] md:pb-[96px]"
      >
        <p className="mb-5 ml-[2px] font-sans text-[var(--green)] text-[16px] font-medium tracking-[0.08em]">
          Hi, my name is
        </p>
        <h1 className="font-sans text-[clamp(40px,6.4vw,72px)] font-bold text-[var(--lightest-slate)] leading-[1.05] tracking-[-0.045em] m-0">
          Gal Moussan.
        </h1>
        <h2 className="font-sans text-[clamp(22px,3.4vw,36px)] font-semibold text-[var(--light-slate)] leading-[1.15] tracking-[-0.03em] mt-3">
          I build things for the web.
        </h2>
        <p className="mt-5 max-w-[540px] text-[var(--light-slate)] text-[18px] md:text-[20px] leading-[1.45]">
          I&apos;m a fullstack developer and tech lead with a background in military leadership,
          specializing in building CRM systems and web applications. Currently, I&apos;m leading
          development at{' '}
          <a href="https://www.lagoonads.com/" className="inline-link" target="_blank" rel="noreferrer">
            Lagoonads
          </a>
          .
        </p>
        <div className="mt-8">
          <a
            href="mailto:galmoussan@gmail.com"
            className="outline-button inline-block py-5 px-8 leading-[1]"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </>
  );
}
