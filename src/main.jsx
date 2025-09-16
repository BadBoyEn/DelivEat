import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import AppTheme from './theme/AppTheme.jsx'
import ErrorBoundary from './utils/ErrorBoundary.jsx'
import './index.css'

// -- COMMENTO -- Overlay di debug solo in sviluppo
let DevErrorOverlay = () => null
if (import.meta.env.DEV) {
try { DevErrorOverlay = (await import('./utils/DevErrorOverlay.jsx')).default } catch {}
}


ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<ErrorBoundary>
<HashRouter>
<AppTheme>
<DevErrorOverlay />
<App />
</AppTheme>
</HashRouter>
</ErrorBoundary>
</React.StrictMode>
)