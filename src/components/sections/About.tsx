export function About() {
  const skills = [
    'JavaScript (ES6+)',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'Tailwind CSS',
    'AI/LLM APIs',
    'Firebase',
    'Angular',
    'Playwright',
    'Vitest',
  ];

  return (
    <section id="about" className="max-w-[900px] mx-auto py-[100px]">
      <h2 className="numbered-heading">About Me</h2>

      <div className="grid grid-cols-1 gap-[30px] md:grid-cols-[3fr_2fr] md:gap-[50px]">
        {/* Text Column */}
        <div>
          <div className="text-[var(--slate)] text-[16px] md:text-[20px] space-y-4">
            <p>
              Hello! My name is Gal and I&apos;m a fullstack developer and tech lead based in Tel Aviv.
              With a background in military leadership as an officer and company commander in the
              Israeli Air Force, I bring strong strategic thinking and team management skills to
              every project I work on.
            </p>
            <p>
              I&apos;ve had the privilege of working across startups in Israel and Australia, from{' '}
              <a href="https://www.lagoonads.com/" className="inline-link" target="_blank" rel="noreferrer">
                affiliate marketing platforms
              </a>
              {' '}to{' '}
              <a href="#" className="inline-link" target="_blank" rel="noreferrer">
                CRM systems
              </a>
              {' '}to{' '}
              <a href="#" className="inline-link" target="_blank" rel="noreferrer">
                QA automation
              </a>
              . My main focus these days is leading the development of an affiliate marketing CRM
              system at{' '}
              <a href="https://www.lagoonads.com/" className="inline-link" target="_blank" rel="noreferrer">
                Lagoonads
              </a>
              .
            </p>
            <p>
              Outside of work, I&apos;m passionate about surfing, extreme sports, traveling, and
              volunteering — I&apos;ve been teaching youth at risk how to surf with{' '}
              <a href="#" className="inline-link" target="_blank" rel="noreferrer">
                My Wave
              </a>{' '}
              since 2020.
            </p>
          </div>

          <p className="mt-5 text-[var(--slate)]">Here are a few technologies I&apos;ve been working with recently:</p>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-1 p-0 mt-5 list-none">
            {skills.map((skill) => (
              <li
                key={skill}
                className="relative pl-[30px] mb-[10px] font-mono text-[13px] text-[var(--slate)] before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)] before:text-[14px] before:leading-[20px]"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Photo Column */}
        <div className="relative mx-auto max-w-[250px] w-full md:max-w-[300px]">
          <div className="relative group block w-full aspect-square">
            {/* Green border offset box */}
            <div
              className="absolute top-[15px] left-[15px] w-full h-full border-2 border-[var(--green)] rounded transition-[top,left] duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:top-[10px] group-hover:left-[10px]"
            />
            {/* Image with green tint overlay */}
            <div className="relative rounded overflow-hidden w-full h-full">
              {/* Green tint overlay */}
              <div className="absolute inset-0 bg-[var(--green)] mix-blend-multiply z-10 opacity-40 transition-opacity duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:opacity-0" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile.jpeg"
                alt="Headshot"
                width={300}
                height={300}
                className="relative rounded w-full h-full object-cover filter grayscale contrast-[1] brightness-90 transition-[filter] duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:grayscale-0 group-hover:brightness-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
