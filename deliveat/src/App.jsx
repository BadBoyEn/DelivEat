import { BrowserRouter as Router, Routes, Route } from 'react-router';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogiInPage'
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
      </Routes>
    </Router>
  )
}

export default App