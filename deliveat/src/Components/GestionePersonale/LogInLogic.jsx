import { useState } from 'react';
import { loginManager, loginRider } from '../../api/auth';

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

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const email = (data.get('email') || '').toString().trim();
    const password = (data.get('password') || '').toString().trim();

    // 1) -- MANAGER --
    try {
      const mg = await loginManager({ email, password });
      localStorage.setItem('token', mg.token);
      localStorage.setItem('role', 'manager');
      window.location.assign('/dashboard');
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

    // 2) -- RIDER [IN CASO NON FOSSE MANAGER] --
    try {
      const rd = await loginRider({ email, password });
      localStorage.setItem('token', rd.token);
      localStorage.setItem('role', 'rider');

      if (rd.user) {
        localStorage.setItem("rider", JSON.stringify(rd.user));
      }
      window.location.assign("/rider");
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
