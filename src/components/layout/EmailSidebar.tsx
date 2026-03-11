import { email } from '@/data/social-links';

export function EmailSidebar() {
  return (
    <div className="hidden md:flex fixed bottom-0 right-10 flex-col items-center gap-[10px] z-10">
      <a
        href={`mailto:${email}`}
        className="font-mono text-[var(--fz-xxs)] text-[var(--light-slate)] tracking-widest hover:text-[var(--green)] hover:-translate-y-[3px] transition-all duration-250 ease-custom [writing-mode:vertical-rl] p-[10px]"
      >
        {email}
      </a>
      <div className="w-[1px] h-[90px] bg-[var(--light-slate)]" />
    </div>
  );
}
