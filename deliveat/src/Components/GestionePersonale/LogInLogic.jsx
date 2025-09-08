import { useState } from 'react';
import { smartLogin } from '../../api/auth'; 
import { useNavigate } from 'react-router-dom';

export function useLogInLogic() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const navigate = useNavigate();

  // -- COMMENTO -- Validazioni minime (DOM id: email, password)
  const validateInputs = () => {
    const emailEl = document.getElementById('email');
    const passEl = document.getElementById('password');

    const email = (emailEl?.value || '').trim();
    const password = passEl?.value || '';

    let ok = true;

    if (!email) {
      setEmailError(true);
      setEmailErrorMessage('Inserisci la email');
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Email non valida');
      ok = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage('Inserisci la password');
      ok = false;
    } else if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('La password deve avere almeno 6 caratteri');
      ok = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return ok;
  };

  // -- COMMENTO -- Submit: usa smartLogin
  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    setEmailError(false); setEmailErrorMessage('');
    setPasswordError(false); setPasswordErrorMessage('');

    if (!validateInputs()) return;

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const res = await smartLogin({ email, password });

      if (res.role === 'manager') {
        // -- COMMENTO -- MANAGER OK
        navigate('/dashboard', { replace: true });
        return;
      }

      // -- COMMENTO -- RIDER OK
      const r = res?.rider || {};
      navigate('/rider', {
        replace: true,
        state: {
          nome: r.nome ?? r.firstName ?? '',
          cognome: r.cognome ?? r.lastName ?? '',
          email: r.email ?? '',
          id: r.id ?? r._id ?? '',
        },
      });
      return;

    } catch (err) {
      // -- COMMENTO -- email == manager ma password sbagliata
      if (err?.status === 401 && /manager errata/i.test(err?.message || '')) {
        setPasswordError(true);
        setPasswordErrorMessage('Password del manager errata');
        return;
      }

      // -- COMMENTO -- Credenziali errate (rider o altre 400/401)
      if (err?.status === 400 || err?.status === 401) {
        setPasswordError(true);
        setPasswordErrorMessage(err?.message || 'Email o password errati');
        return;
      }

      // -- COMMENTO -- Errori generici (rete/server)
      setPasswordError(true);
      setPasswordErrorMessage(err?.message || 'Errore di accesso');
    }
  };

  return {
    emailError, emailErrorMessage,
    passwordError, passwordErrorMessage,
    validateInputs,
    handleSubmit,
  };
}
