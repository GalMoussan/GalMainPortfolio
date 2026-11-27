'use client';

import { useState } from 'react';

/** "Show me the password" button that reveals a live demo's access password in place. */
export function PasswordReveal({ password }: { password: string }) {
  const [shown, setShown] = useState(false);

  if (shown) {
    return (
      <span className="text-[13px] text-[var(--linen-dim)]">
        Password: <span className="select-all font-medium text-[var(--amber)]">{password}</span>
      </span>
    );
  }

  return (
    <button type="button" onClick={() => setShown(true)} className="btn-chip !px-3.5 !py-1.5 !text-[12px]">
      Show me the password
    </button>
  );
}
