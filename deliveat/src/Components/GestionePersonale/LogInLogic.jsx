import { useState } from 'react';

export function useLogInLogic() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const tryManagerLogin = async (email, password) => {
    const res = await fetch('/api/manager/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('not-manager');
    return res.json(); // { message, token, user:{role,email} }
  };

  const tryRiderLogin = async (email, password) => {
    const res = await fetch('/api/rider/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(errText || 'Errore login rider');
    }
    return res.json(); // { message, token, rider:{...} }
  };

  const handleSubmit = async (event) => {
    if (!validateInputs()) {
      event.preventDefault();
      return;
    }
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      // 1) Prova login manager
      const mgr = await tryManagerLogin(email, password);
      localStorage.setItem('token', mgr.token);
      localStorage.setItem('role', 'manager');
      // Redirect a Dashboard.jsx (route /dashboard)
      window.location.assign('/dashboard');
      return;
    } catch (_) {
      // non è manager o errore -> continua con rider
    }

    try {
      // 2) Prova login rider (fallback)
      const rid = await tryRiderLogin(email, password);
      localStorage.setItem('token', rid.token);
      localStorage.setItem('role', 'rider');
      // Qui fai il redirect alla pagina rider (se prevista) o lascia in pagina
      // window.location.assign('/rider'); // opzionale
    } catch (err) {
      setPasswordError(true);
      setPasswordErrorMessage('Credenziali non valide.');
    }
  };

  return {
    emailError, emailErrorMessage,
    passwordError, passwordErrorMessage,
    validateInputs,
    handleSubmit
  };
}
