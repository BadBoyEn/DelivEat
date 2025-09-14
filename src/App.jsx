import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppTheme from './theme/AppTheme.jsx';
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
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/rider" element={<RiderPage />} />
          <Route path="/home/chisiamo" element={<ChiSiamoPage />} />
          <Route path="/home/comefunziona" element={<ComeFunzionaPage />} />
          <Route path="/home/contatti" element={<ContattiPage />} />
          <Route path="/home/faq" element={<FAQPage />} />
          <Route path="/home/infolegali" element={<InfoLegaliPage />} />
          <Route path="/home/ordina" element={<OrdinaPage />} />
          <Route path="*" element={<div style={{ padding: 24 }}>404 - Pagina non trovata</div>} />
        </Routes>
      </HashRouter>
    </AppTheme>
  );
}
