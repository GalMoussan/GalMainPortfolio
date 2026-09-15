import { SectionHeading } from '@/components/ui/SectionHeading';

export function Contact() {
  return (
    <section id="contact" className="relative z-[2] max-w-[600px] mx-auto text-center py-[100px] px-0">
      <SectionHeading subtitle="What's Next?">Contact</SectionHeading>
      <h3 className="font-sans text-[clamp(40px,5vw,60px)] font-semibold tracking-[-0.035em] text-[var(--lightest-slate)] mt-2">
        Get In Touch
      </h3>
      <p className="mt-0 mb-[50px] max-w-[500px] mx-auto text-[var(--slate)] text-[20px]">
        Although I&apos;m not currently looking for any new opportunities, my inbox is always open.
        Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
      </p>
      <a
        href="mailto:galmoussan@gmail.com"
        className="outline-button inline-block py-5 px-8 leading-[1]"
      >
        Say Hello
      </a>
    </section>
  );
}
