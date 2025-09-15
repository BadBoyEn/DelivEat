import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'   
import App from './App.jsx'
import AppTheme from './theme/AppTheme.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>                               
      <HashRouter>
        <AppTheme>
          <App />
        </AppTheme>
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
