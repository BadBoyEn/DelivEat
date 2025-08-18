import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import HomePage from './pages/HomePage';
import DashBoardPage from './pages/DashBoardPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
      </Routes>
    </Router>
  )
}