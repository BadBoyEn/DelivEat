import { useState } from 'react';
import { signupRider } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { socket } from '../GestionePersonale/Socket.jsx';

export function useSignUpLogic() {
  const navigate = useNavigate();

  const [FirstNameError, setFirstNameError] = useState(false);
  const [FirstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [LastNameError, setLastNameError] = useState(false);
  const [LastNameErrorMessage, setLastNameErrorMessage] = useState('');
  const [PhoneError, setPhoneError] = useState(false);
  const [PhoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [BirthdateError, setBirthdateError] = useState(false);
  const [BirthdateErrorMessage, setBirthdateErrorMessage] = useState('');
  const [CityError, setCityError] = useState(false);
  const [CityErrorMessage, setCityErrorMessage] = useState('');
  const [AddressError, setAddressError] = useState(false);
  const [AddressErrorMessage, setAddressErrorMessage] = useState('');
  const [EmailError, setEmailError] = useState(false);
  const [EmailErrorMessage, setEmailErrorMessage] = useState('');
  const [PasswordError, setPasswordError] = useState(false);
  const [PasswordErrorMessage, setPasswordErrorMessage] = useState('');

  const validateInputs = () => {
    const firstName = document.getElementById('firstName')?.value.trim() || '';
    const lastName  = document.getElementById('lastName')?.value.trim() || '';
    const phone     = document.getElementById('phone')?.value.trim() || '';
    const birthdate = document.getElementById('birthdate')?.value.trim() || '';
    const city      = document.getElementById('city')?.value.trim() || '';
    const address   = document.getElementById('address')?.value.trim() || '';
    const email     = document.getElementById('email')?.value.trim() || '';
    const password  = document.getElementById('password')?.value.trim() || '';

    let ok = true;

    // -- COMMENTO -- Reset errori
    setFirstNameError(false); setFirstNameErrorMessage('');
    setLastNameError(false);  setLastNameErrorMessage('');
    setPhoneError(false);     setPhoneErrorMessage('');
    setBirthdateError(false); setBirthdateErrorMessage('');
    setCityError(false);      setCityErrorMessage('');
    setAddressError(false);   setAddressErrorMessage('');
    setEmailError(false);     setEmailErrorMessage('');
    setPasswordError(false);  setPasswordErrorMessage('');

    if (firstName.length < 2) { setFirstNameError(true); setFirstNameErrorMessage('Inserisci un nome valido.'); ok = false; }
    if (lastName.length  < 2) { setLastNameError(true);  setLastNameErrorMessage('Inserisci un cognome valido.'); ok = false; }
    const cleanedPhone = String(phone).trim();
    if (!/^\d{7,15}$/.test(cleanedPhone)) { setPhoneError(true); setPhoneErrorMessage('Inserisci un telefono valido (solo cifre).'); ok = false; }
    if (!birthdate) { setBirthdateError(true); setBirthdateErrorMessage('Inserisci la data di nascita.'); ok = false; }
    if (city.length < 2) { setCityError(true); setCityErrorMessage('Inserisci una città valida.'); ok = false; }
    if (address.length < 3) { setAddressError(true); setAddressErrorMessage('Inserisci un indirizzo valido.'); ok = false; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { setEmailError(true); setEmailErrorMessage('Email non valida.'); ok = false; }
    if (password.length < 6) { setPasswordError(true); setPasswordErrorMessage('Minimo 6 caratteri.'); ok = false; }

    return ok;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/signup'); 
    }
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);

    const payload = {
      firstName: (data.get('firstName') || '').toString().trim(),
      lastName:  (data.get('lastName')  || '').toString().trim(),
      phone:     (data.get('phone')     || '').toString().trim(),
      birthdate: (data.get('birthdate') || '').toString().trim(),
      city:      (data.get('city')      || '').toString().trim(),
      address:   (data.get('address')   || '').toString().trim(),
      email:     (data.get('email')     || '').toString().trim(),
      password:  (data.get('password')  || '').toString().trim(),
    };

    try {
      const res = await signupRider(payload); // -- COMMENTO -- POST via Axios
      // -- COMMENTO -- opzionale: token/ruolo, in base alla API
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', 'rider');

      socket.emit('riderSignedUp', { email: payload.email });
      navigate('/rider', { replace: true, state: { nome: payload.firstName, cognome: payload.lastName, email: payload.email } });
    } catch (err) {
      const msg = (err?.message || '').toString();
      // -- COMMENTO -- errori campo-specifici
      if (msg.toLowerCase().includes('email')) {
        setEmailError(true); setEmailErrorMessage(msg);
      } else if (msg.toLowerCase().includes('nascita') || msg.toLowerCase().includes('anni')) {
        setBirthdateError(true); setBirthdateErrorMessage(msg);
      } else if (msg.toLowerCase().includes('telefono')) {
        setPhoneError(true); setPhoneErrorMessage(msg);
      } else {
        alert(msg || 'Errore iscrizione');
      }
    }
  };

  return {
    FirstNameError, FirstNameErrorMessage,
    LastNameError, LastNameErrorMessage,
    PhoneError, PhoneErrorMessage,
    BirthdateError, BirthdateErrorMessage,
    CityError, CityErrorMessage,
    AddressError, AddressErrorMessage,
    EmailError, EmailErrorMessage,
    PasswordError, PasswordErrorMessage,
    validateInputs,
    handleSubmit
  };
}
