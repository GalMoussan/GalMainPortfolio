import { socialLinks } from '@/data/social-links';
import { IconGitHub, IconInstagram, IconTwitter, IconLinkedIn, IconCodepen } from '@/components/ui/Icons';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GitHub: IconGitHub,
  Instagram: IconInstagram,
  Twitter: IconTwitter,
  LinkedIn: IconLinkedIn,
  Codepen: IconCodepen,
};

export function SocialSidebar() {
  return (
    <div className="hidden md:flex fixed bottom-0 left-10 flex-col items-center gap-[10px] z-10">
      <ul className="flex flex-col items-center gap-[20px] list-none p-0 m-0 mb-[20px]">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.name];
          return (
            <li key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.name}
                className="text-[var(--light-slate)] hover:text-[var(--green)] hover:-translate-y-[3px] transition-all duration-250 ease-custom inline-block p-[10px]"
              >
                {Icon && <Icon size={20} />}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="w-[1px] h-[90px] bg-[var(--light-slate)]" />
    </div>
  );
}
