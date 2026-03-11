export function Contact() {
  return (
    <section id="contact" className="max-w-[600px] mx-auto text-center py-[100px] px-0">
      <p className="font-mono text-[var(--green)] text-[16px] mb-5">
        What&apos;s Next?
      </p>
      <h2 className="text-[clamp(40px,5vw,60px)] font-semibold text-[var(--lightest-slate)]">
        Get In Touch
      </h2>
      <p className="mt-0 mb-[50px] max-w-[500px] mx-auto text-[var(--slate)] text-[20px]">
        Although I&apos;m not currently looking for any new opportunities, my inbox is always open.
        Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
      </p>
      <a
        href="mailto:galmoussan@gmail.com"
        className="outline-button inline-block py-5 px-7 leading-[1]"
      >
        Say Hello
      </a>
    </section>
  );
}
