import { Routes, Route, Navigate } from 'react-router-dom';
import AppTheme from './theme/AppTheme.jsx';
import ErrorBoundary from './utils/ErrorBoundary.jsx';

// -- COMMENTO -- Pagine
import HomePage from './pages/HomePage.jsx';
import ChiSiamoPage from './pages/ChiSiamoPage.jsx';
import ComeFunzionaPage from './pages/ComeFunzionaPage.jsx';
import ContattiPage from './pages/ContattiPage.jsx';
import FAQPage from './pages/FAQPage.jsx';
import InfoLegaliPage from './pages/InfoLegaliPage.jsx';
import OrdinaPage from './pages/OrdinaPage.jsx';

import LogInPage from './pages/LogInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import DashBoardPage from './pages/DashBoardPage.jsx';
import RiderPage from './pages/RiderPage.jsx';

import RequireBackend from './Components/RequireBackend.jsx'; // -- COMMENTO -- IMPORT

export default function App() {
  return (
    <AppTheme>
      <ErrorBoundary>
        <Routes>
          {/* -- COMMENTO -- Pagine STATICHE: non richiedono BE, visibili anche su GH-Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/chi-siamo" element={<ChiSiamoPage />} />
          <Route path="/come-funziona" element={<ComeFunzionaPage />} />
          <Route path="/contatti" element={<ContattiPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/info-legali" element={<InfoLegaliPage />} />
          <Route path="/ordina" element={<OrdinaPage />} />

          {/* -- COMMENTO -- Pagine che USANO il backend: wrappale con RequireBackend */}
          <Route path="/login" element={
            <RequireBackend><LogInPage /></RequireBackend>
          } />

          <Route path="/signup" element={
            <RequireBackend><SignUpPage /></RequireBackend>
          } />

          <Route path="/dashboard" element={
            <RequireBackend><DashBoardPage /></RequireBackend>
          } />

          {/* -- COMMENTO -- RiderPage: wrappala SE fa chiamate /api (signup, lista, ecc.) */}
          <Route path="/rider" element={
            <RequireBackend><RiderPage /></RequireBackend>
          } />

          {/* -- COMMENTO -- Fallback */}
          <Route index element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </AppTheme>
  );
}
