import { Routes, Route, Navigate } from 'react-router-dom';
import AppTheme from './theme/AppTheme.jsx';
import ErrorBoundary from './utils/ErrorBoundary.jsx';

// -- COMMENTO -- import pagine
import HomePage from './pages/HomePage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import DashBoardPage from './pages/DashBoardPage.jsx';
import RiderPage from './pages/RiderPage.jsx';
import ChiSiamoPage from './pages/ChiSiamoPage.jsx';
import ComeFunzionaPage from './pages/ComeFunzionaPage.jsx';
import ContattiPage from './pages/ContattiPage.jsx';
import FAQPage from './pages/FAQPage.jsx';
import InfoLegaliPage from './pages/InfoLegaliPage.jsx';
import OrdinaPage from './pages/OrdinaPage.jsx';

export default function App() {
  return (
    <AppTheme>
      <ErrorBoundary>
        <Routes>
          {/* -- COMMENTO -- PUBLIC ROUTES -- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/rider" element={<RiderPage />} />
          <Route path="/chi-siamo" element={<ChiSiamoPage />} />
          <Route path="/come-funziona" element={<ComeFunzionaPage />} />
          <Route path="/contatti" element={<ContattiPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/info-legali" element={<InfoLegaliPage />} />
          <Route path="/ordina" element={<OrdinaPage />} />

          {/* -- COMMENTO -- AREA MANAGER/DASHBOARD -- */}
          <Route path="/dashboard" element={<DashBoardPage />} />

          {/* -- COMMENTO -- FALLBACK */}
          <Route index element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </AppTheme>
  );
}
