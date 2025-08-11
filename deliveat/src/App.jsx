import { BrowserRouter as Router, Routes, Route } from 'react-router';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  )
}

export default App
