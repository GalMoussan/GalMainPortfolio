import { featuredProjects } from '@/data/featured-projects';
import { otherProjects } from '@/data/other-projects';
import { IconExternalLink, IconGitHub } from '@/components/ui/Icons';

interface ArchiveProject {
  year: string;
  title: string;
  madeAt?: string;
  tech: string[];
  github?: string;
  external?: string;
}

const allProjects: ArchiveProject[] = [
  ...featuredProjects.map((p) => ({
    year: '2020',
    title: p.title,
    madeAt: 'Personal',
    tech: p.tech,
    github: p.github,
    external: p.external,
  })),
  ...otherProjects.map((p) => ({
    year: '2019',
    title: p.title,
    madeAt: 'Personal',
    tech: p.tech,
    github: p.github,
    external: p.external,
  })),
];

export default function ArchivePage() {
  return (
    <div className="pt-[var(--nav-height)] min-h-screen">
      <header className="mb-[50px]">
        <a
          href="/"
          className="inline-block font-mono text-[var(--green)] text-[14px] mb-2 hover:underline"
        >
          &larr; Back
        </a>
        <h1 className="text-[clamp(40px,5vw,60px)] font-semibold text-[var(--lightest-slate)]">
          Archive
        </h1>
        <p className="font-mono text-[var(--green)] text-[16px]">
          A big list of things I&apos;ve worked on
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="py-[10px] pr-[20px] font-mono text-[14px] text-[var(--green)] font-normal">
                Year
              </th>
              <th className="py-[10px] pr-[20px] font-mono text-[14px] text-[var(--green)] font-normal">
                Title
              </th>
              <th className="py-[10px] pr-[20px] font-mono text-[14px] text-[var(--green)] font-normal hidden lg:table-cell">
                Made at
              </th>
              <th className="py-[10px] pr-[20px] font-mono text-[14px] text-[var(--green)] font-normal hidden md:table-cell">
                Built with
              </th>
              <th className="py-[10px] font-mono text-[14px] text-[var(--green)] font-normal">
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {allProjects.map((project) => (
              <tr key={project.title} className="border-b border-[var(--lightest-navy)]">
                <td className="py-[10px] pr-[20px] font-mono text-[14px] text-[var(--green)]">
                  {project.year}
                </td>
                <td className="py-[10px] pr-[20px] text-[20px] font-semibold text-[var(--lightest-slate)]">
                  {project.title}
                </td>
                <td className="py-[10px] pr-[20px] text-[18px] text-[var(--light-slate)] hidden lg:table-cell">
                  {project.madeAt || '—'}
                </td>
                <td className="py-[10px] pr-[20px] font-mono text-[12px] text-[var(--slate)] hidden md:table-cell">
                  {project.tech.join(' · ')}
                </td>
                <td className="py-[10px]">
                  <div className="flex items-center gap-[10px]">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="text-[var(--light-slate)] hover:text-[var(--green)] transition-colors"
                      >
                        <IconGitHub size={18} />
                      </a>
                    )}
                    {project.external && (
                      <a
                        href={project.external}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="External Link"
                        className="text-[var(--light-slate)] hover:text-[var(--green)] transition-colors"
                      >
                        <IconExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
