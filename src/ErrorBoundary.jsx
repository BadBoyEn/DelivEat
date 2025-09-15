import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError:false, error:null, info:null }; }

  static getDerivedStateFromError(error){ return { hasError:true, error }; }

  componentDidCatch(error, info){
    console.error('-- COMMENTO -- ErrorBoundary:', error);
    console.error('-- COMMENTO -- ComponentStack:', info?.componentStack);
    this.setState({ info });
  }

  render(){
    if(this.state.hasError){
      return (
        <div style={{padding:24}}>
          <h2>Si è verificato un errore</h2>
          <p><b>Messaggio:</b> {this.state.error?.message || String(this.state.error)}</p>
          <pre style={{whiteSpace:'pre-wrap', background:'#00000010', padding:12, borderRadius:8}}>
            {this.state.info?.componentStack || '(nessuno stack disponibile)'}
          </pre>
          <p>Ricarica la pagina. Se l errore persiste, condividi il blocco sopra.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
