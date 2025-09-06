import { useState } from 'react';
import { loginManager, loginRider } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { socket } from '../GestionePersonale/Socket.jsx';

export function useLogInLogic() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;

    // -- COMMENTO -- Email
    const e = (email?.value || '').trim();
    if (!/^\S+@\S+\.\S+$/.test(e)) {
      setEmailError(true);
      setEmailErrorMessage('Inserisci un’email valida.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    // -- COMMENTO -- Password base
    const p = (password?.value || '').trim();
    if (p.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('La password deve avere almeno 6 caratteri.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/login');
    }
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const email = (data.get('email') || '').toString().trim();
    const password = (data.get('password') || '').toString().trim();

    // --- Manager login ---
    try {
      const mg = await loginManager({ email, password });
      localStorage.setItem('token', mg.token);
      localStorage.setItem('role', 'manager');
      socket.emit('managerLoggedIn', { email });
      navigate('/dashboard', { replace: true });
      return;
    } catch (err) {
      if (err?.status === 401) {
        setPasswordError(true);
        setPasswordErrorMessage('Credenziali manager non valide. Provo come rider…');
      } else {
        setPasswordError(true);
        setPasswordErrorMessage(err?.message || 'Errore');
        return;
      }
    }

    // --- Rider login ---
    try {
      const rd = await loginRider({ email, password });
      localStorage.setItem('token', rd.token);
      localStorage.setItem('role', 'rider');

      // -- COMMENTO -- passo i dati al RiderPage
      navigate('/rider', { replace: true, state: { nome: rd.rider.firstName, cognome: rd.rider.lastName, email: rd.rider.email } });
    } catch (err) {
      setPasswordError(true);
      setPasswordErrorMessage(err?.message || 'Credenziali non valide.');
    }
  };

  return {
    emailError, emailErrorMessage,
    passwordError, passwordErrorMessage,
    validateInputs,
    handleSubmit
  };
}
