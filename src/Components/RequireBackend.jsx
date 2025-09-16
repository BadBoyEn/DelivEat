// -- COMMENTO -- src/Components/RequireBackend.jsx
import { useEffect, useState } from 'react';

export default function RequireBackend({ children, fallback = null }) {
  const isGhPages = /\.github\.io$/.test(window.location.hostname);
  const [st, setSt] = useState({ checking: !isGhPages, online: !isGhPages });

  useEffect(() => {
    if (isGhPages) return;
    let alive = true;
    (async () => {
      try {
        const ctrl = new AbortController();
        const id = setTimeout(() => ctrl.abort(), 1500);
        const res = await fetch('/api/health', { credentials:'include', signal: ctrl.signal });
        clearTimeout(id);
        if (alive) setSt({ checking:false, online: res.ok });
      } catch {
        if (alive) setSt({ checking:false, online:false });
      }
    })();
    return () => { alive = false; };
  }, [isGhPages]);

  if (st.checking) return <div style={{padding:24}}>Verifica disponibilità server…</div>;
  if (!st.online) return fallback ?? (
    <div style={{padding:24, margin:24, border:'1px solid var(--border-weak,#ddd)', borderRadius:12}}>
      <strong>Backend non raggiungibile.</strong> Avvia il server e ricarica.
    </div>
  );
  return children;
}
