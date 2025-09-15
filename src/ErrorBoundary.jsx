import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(p){ super(p); this.state = { hasError:false, error:null }; }
  static getDerivedStateFromError(error){ return { hasError:true, error }; }
  componentDidCatch(error, info){
    console.error('— COMMENTO — ErrorBoundary:', error, info);
  }
  render(){
    if(this.state.hasError){
      return <div>Si è verificato un errore. Controlla la console.</div>;
    }
    return this.props.children;
  }
}
