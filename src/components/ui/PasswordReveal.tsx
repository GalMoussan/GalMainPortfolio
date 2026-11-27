'use client';

import { useState } from 'react';

/** "Show me the password" button that reveals a live demo's access password in place. */
export function PasswordReveal({ password }: { password: string }) {
  const [shown, setShown] = useState(false);

  if (shown) {
    return (
      <span className="font-mono text-[12px] text-[var(--light-slate)]">
        Password: <span className="select-all text-[var(--green)]">{password}</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShown(true)}
      className="rounded-full border border-[var(--green)] px-4 py-1.5 font-sans text-[12px] font-medium text-[var(--green)] transition-all duration-300 hover:bg-[var(--green-tint)] hover:shadow-[0_0_18px_var(--cyan-bloom)]"
    >
      Show me the password
    </button>
  );
}
