import Image from 'next/image';

export function About() {
  const skills = [
    'JavaScript (ES6+)',
    'TypeScript',
    'React',
    'Eleventy',
    'Node.js',
    'WordPress',
  ];

  return (
    <section id="about" className="max-w-[900px] mx-auto py-[100px]">
      <h2 className="numbered-heading">About Me</h2>

      <div className="grid grid-cols-[3fr_2fr] gap-[50px]">
        {/* Text Column */}
        <div>
          <div className="text-[var(--slate)] text-[var(--fz-xl)] space-y-4">
            <p>
              Hello! My name is Brittany and I enjoy creating things that live on the internet. My
              interest in web development started back in 2012 when I decided to try editing custom
              Tumblr themes — turns out hacking together a custom reblog button taught me a lot about
              HTML &amp; CSS!
            </p>
            <p>
              Fast-forward to today, and I&apos;ve had the privilege of working at{' '}
              <a href="https://us.mullenlowe.com/" className="inline-link" target="_blank" rel="noreferrer">
                an advertising agency
              </a>
              ,{' '}
              <a href="https://starry.com/" className="inline-link" target="_blank" rel="noreferrer">
                a start-up
              </a>
              ,{' '}
              <a href="https://www.apple.com/" className="inline-link" target="_blank" rel="noreferrer">
                a huge corporation
              </a>
              , and{' '}
              <a href="https://www.upstatement.com/" className="inline-link" target="_blank" rel="noreferrer">
                a student-led design studio
              </a>
              . My main focus these days is building accessible, inclusive products and digital
              experiences at{' '}
              <a href="https://www.upstatement.com/" className="inline-link" target="_blank" rel="noreferrer">
                Upstatement
              </a>{' '}
              for a variety of clients.
            </p>
            <p>
              I also recently{' '}
              <a
                href="https://www.newline.co/courses/build-a-spotify-connected-app"
                className="inline-link"
                target="_blank"
                rel="noreferrer"
              >
                launched a course
              </a>{' '}
              that covers everything you need to build a web app with the Spotify API using Node &amp;
              React.
            </p>
          </div>

          <p className="mt-5 text-[var(--slate)]">Here are a few technologies I&apos;ve been working with recently:</p>

          <ul className="grid grid-cols-2 gap-x-2 gap-y-0 p-0 mt-5 list-none overflow-hidden">
            {skills.map((skill) => (
              <li
                key={skill}
                className="relative pl-[30px] mb-[10px] font-mono text-[var(--fz-xs)] text-[var(--slate)] before:content-['▹'] before:absolute before:left-0 before:text-[var(--green)] before:text-[var(--fz-sm)] before:leading-[20px]"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Photo Column */}
        <div className="relative max-w-[300px]">
          <div className="relative group block">
            {/* Green border offset box */}
            <div
              className="absolute -inset-0 top-[15px] left-[15px] border-2 border-[var(--green)] rounded z-[-1] transition-all duration-250 ease-custom group-hover:top-[10px] group-hover:left-[10px]"
            />
            {/* Image with overlay */}
            <div className="relative rounded overflow-hidden">
              <div className="absolute inset-0 bg-[var(--green-tint)] mix-blend-screen z-10 transition-all duration-250 ease-custom group-hover:bg-transparent" />
              <Image
                src="/images/profile.jpg"
                alt="Headshot"
                width={300}
                height={300}
                className="relative rounded w-full grayscale contrast-100 transition-all duration-250 ease-custom group-hover:grayscale-0 group-hover:mix-blend-normal"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
