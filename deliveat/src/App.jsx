import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Pagine (i tuoi file)
import LogInPage from './pages/LogInPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import HomePage from './pages/HomePage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import ContattiPage from './pages/ContattiPage.jsx'
import InfoLegaliPage from './pages/InfoLegaliPage.jsx'
import DashBoardPage from './pages/DashBoardPage.jsx'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* pagine principali */}
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/faq" element={<FAQPage />} />
        <Route path="/home/contatti" element={<ContattiPage/>}/>
        <Route path="/home/info" element={<InfoLegaliPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />

        {/* 404 */}
        <Route path="*" element={<h2 style={{padding:16}}>Pagina non trovata</h2>} />
      </Routes>
    </Router>
  )
}
