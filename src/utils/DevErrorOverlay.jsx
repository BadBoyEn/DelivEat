// -- COMMENTO -- Overlay di sviluppo: intercetta errori globali / promise rejection
// -- COMMENTO -- Mostrato SOLO in dev (import.meta.env.DEV)
import { useEffect, useState } from 'react';

export default function DevErrorOverlay() {
  // -- COMMENTO -- Se non è dev, non renderizzare nulla
  if (!import.meta.env.DEV) return null;

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // -- COMMENTO -- Handler error sincrono
    const onError = (e) => {
      setErrors((prev) => [
        { type: 'error', message: e.message, detail: e.error?.stack || '', time: Date.now() },
        ...prev
      ].slice(0, 5));
    };

    // -- COMMENTO -- Handler error async (Promise non gestite)
    const onRejection = (e) => {
      const msg = e.reason?.message || String(e.reason);
      const stack = e.reason?.stack || '';
      setErrors((prev) => [
        { type: 'promise', message: msg, detail: stack, time: Date.now() },
        ...prev
      ].slice(0, 5));
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  const clear = () => setErrors([]);

  if (errors.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      right: 16,
      bottom: 16,
      zIndex: 9999,
      width: 360,
      maxWidth: 'calc(100vw - 32px)',
      background: 'var(--surface, #ffffff)',
      color: 'var(--text, #1a1a1a)',
      border: '1px solid var(--border-weak, #dadada)',
      borderRadius: 14,
      boxShadow: 'var(--elevation-3, 0 10px 24px rgba(0,0,0,0.12))',
      overflow: 'hidden',
      fontSize: 13,
      lineHeight: 1.35
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        background: 'var(--surface-2, #f7f7f7)',
        borderBottom: '1px solid var(--border-weak, #dadada)'
      }}>
        <strong>Dev Error Overlay</strong>
        <button onClick={clear} style={{
          border: '1px solid var(--border-weak, #dadada)',
          background: 'transparent',
          borderRadius: 8,
          padding: '4px 8px',
          cursor: 'pointer',
          color: 'var(--text, #1a1a1a)'
        }}>Pulisci</button>
      </div>

      <div style={{ maxHeight: 280, overflow: 'auto' }}>
        {errors.map((e, i) => (
          <div key={e.time + '-' + i} style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-weak, #eee)' }}>
            <div style={{ opacity: 0.75, marginBottom: 4 }}>
              [{new Date(e.time).toLocaleTimeString()}] {e.type === 'promise' ? 'Unhandled Rejection' : 'Error'}
            </div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{e.message}</div>
            {e.detail && (
              <pre style={{
                background: 'var(--surface-2, #f7f7f7)',
                padding: 8,
                borderRadius: 8,
                overflow: 'auto',
                maxHeight: 120
              }}>{e.detail}</pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
