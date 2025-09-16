// -- COMMENTO -- ErrorBoundary: mostra fallback anche in produzione
import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error('ErrorBoundary catch:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 24, margin: 24, border: '1px solid var(--border-weak,#ddd)',
          borderRadius: 12, background: 'var(--surface,#fff)', color: 'var(--text,#1a1a1a)'
        }}>
          <h2 style={{ marginTop: 0 }}>Si è verificato un errore</h2>
          {!import.meta.env.DEV && <p>Apri la console per dettagli.</p>}
          {import.meta.env.DEV && (
            <pre style={{ overflow: 'auto', maxHeight: 200, fontSize: 12 }}>
{String(this.state.error?.stack || this.state.error?.message || this.state.error)}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
