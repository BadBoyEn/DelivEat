// -- COMMENTO -- ErrorBoundary: intercetta errori React ed evita pagina bianca
import React from 'react';

export default class ErrorBoundary extends React.Component {
  // -- COMMENTO -- Stato iniziale
  state = { hasError: false, error: null };

  // -- COMMENTO -- Aggiorna stato quando un figlio lancia un errore
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // -- COMMENTO -- Log opzionale (solo in dev)
  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary catch:', error, info);
    }
  }

  // -- COMMENTO -- Reset manuale
  handleReload = () => {
    this.setState({ hasError: false, error: null });
    // -- COMMENTO -- ricarica “morbida”
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '24px',
          margin: '24px',
          border: '1px solid var(--border-weak, #ddd)',
          borderRadius: '12px',
          background: 'var(--surface, #fff)',
          color: 'var(--text, #1a1a1a)',
          boxShadow: 'var(--elevation-2, 0 6px 18px rgba(0,0,0,0.1))'
        }}>
          <h2 style={{ marginTop: 0 }}>Si è verificato un errore</h2>
          <p>Riprova a ricaricare la pagina. Se persiste, controlla la console.</p>
          {import.meta.env.DEV && this.state.error && (
            <pre style={{
              overflow: 'auto',
              maxHeight: 200,
              fontSize: 12,
              background: 'var(--surface-2, #f7f7f7)',
              padding: 12,
              borderRadius: 8
            }}>
{String(this.state.error?.stack || this.state.error?.message || this.state.error)}
            </pre>
          )}
          <button onClick={this.handleReload}
            style={{
              marginTop: 12,
              padding: '10px 16px',
              borderRadius: 10,
              border: '1px solid var(--border-weak, #dadada)',
              background: 'var(--accent, #8E24AA)',
              color: 'var(--on-accent, #fff)',
              cursor: 'pointer'
            }}>
            Ricarica
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
