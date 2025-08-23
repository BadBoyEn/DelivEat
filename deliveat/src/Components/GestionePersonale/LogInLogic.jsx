import { useState } from 'react';

const API_BASE = 'http://localhost:5000'; // back dev server

export function useLogInLogic() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;

    const e = (email?.value || '').trim();
    const p = (password?.value || '').trim();

    if (!e || !/\S+@\S+\.\S+/.test(e)) {
      setEmailError(true);
      setEmailErrorMessage('Inserisci una email valida.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!p || p.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('La password deve avere almeno 6 caratteri.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const postJson = async (url, body) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    let payload = {};
    try { payload = await res.json(); } catch {}
    if (!res.ok) {
      const msg = payload?.error || payload?.message || 'Errore';
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return payload;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const email = (data.get('email') || '').toString().trim();
    const password = (data.get('password') || '').toString().trim();

    try {
      const mg = await postJson(`${API_BASE}/api/manager/login`, { email, password });
      localStorage.setItem('token', mg.token);
      localStorage.setItem('role', 'manager');
      window.location.assign('/dashboard'); 
      return;
    } catch (err) {
      if (err?.status === 401) {
        setPasswordError(true);
        setPasswordErrorMessage('Credenziali manager non valide.');
      }
    }

    try {
      const rd = await postJson(`${API_BASE}/api/rider/login`, { email, password });
      localStorage.setItem('token', rd.token);
      localStorage.setItem('role', 'rider');
      // window.location.assign('/rider'); // mo che avremo la pagina del rider
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
