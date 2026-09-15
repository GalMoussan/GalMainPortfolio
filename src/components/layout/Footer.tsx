import Link from 'next/link';
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
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-[1] flex flex-col items-center justify-center py-[15px] px-0 text-center min-h-[70px]">
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

      <div className="flex flex-col items-center gap-[8px]">
        <a
          href="https://github.com/galmoussan"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[12px] text-[var(--slate)] hover:text-[var(--green)] transition-colors leading-[1]"
        >
          Built by Gal Moussan
        </a>

        <div className="font-mono text-[12px] text-[var(--slate)] leading-[1]">
          © {currentYear} Gal Moussan. All rights reserved.
        </div>

        <div className="flex flex-wrap items-center justify-center gap-[8px] font-mono text-[12px] text-[var(--slate)]">
          <Link href="/privacy-policy" className="hover:text-[var(--green)] transition-colors">
            Privacy Policy
          </Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-[var(--green)] transition-colors">
            Terms of Use
          </Link>
          <span>·</span>
          <Link href="/cookie-policy" className="hover:text-[var(--green)] transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
