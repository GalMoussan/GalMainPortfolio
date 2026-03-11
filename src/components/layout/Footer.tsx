import { socialLinks } from '@/data/social-links';
import { IconGitHub, IconInstagram, IconTwitter, IconLinkedIn, IconCodepen } from '@/components/ui/Icons';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GitHub: IconGitHub,
  Instagram: IconInstagram,
  Twitter: IconTwitter,
  LinkedIn: IconLinkedIn,
  Codepen: IconCodepen,
};

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-[15px] px-0 text-center min-h-[70px]">
      <div className="flex items-center gap-[20px] mb-[10px] md:hidden">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.name];
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={link.name}
              className="text-[var(--light-slate)] hover:text-[var(--green)] transition-colors p-[10px]"
            >
              {Icon && <Icon size={20} />}
            </a>
          );
        })}
      </div>
      <a
        href="https://github.com/bchiang7/v4"
        target="_blank"
        rel="noreferrer"
        className="font-mono text-[var(--fz-xxs)] text-[var(--slate)] hover:text-[var(--green)] transition-colors leading-[1]"
      >
        <div>Designed &amp; Built by Brittany Chiang</div>
      </a>
    </footer>
  );
}
