import { useState } from 'react';
import { signupRider } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { socket } from '../GestionePersonale/Socket.jsx';

export function useSignUpLogic() {
  const navigate = useNavigate();

  // -- COMMENTO -- Errori campo-per-campo
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

  // -- COMMENTO -- Normalizza telefono: rimuove non-digit e taglia alle ultime 10 (gestisce +39)
  const normalizePhone = (raw) => {
    const digits = (raw || '').toString().replace(/\D/g, '');
    if (digits.startsWith('39') && digits.length > 10) return digits.slice(-10);
    return digits;
  };

  // -- COMMENTO -- Valida telefono italiano (10 cifre dopo normalizzazione)
  const isValidPhone = (raw) => /^\d{10}$/.test(normalizePhone(raw));

  // -- COMMENTO -- Validazione lato client
  const validateInputs = (values) => {
    let ok = true;

    // reset
    setFirstNameError(false); setFirstNameErrorMessage('');
    setLastNameError(false);  setLastNameErrorMessage('');
    setPhoneError(false);     setPhoneErrorMessage('');
    setBirthdateError(false); setBirthdateErrorMessage('');
    setCityError(false);      setCityErrorMessage('');
    setAddressError(false);   setAddressErrorMessage('');
    setEmailError(false);     setEmailErrorMessage('');
    setPasswordError(false);  setPasswordErrorMessage('');

    const { firstName, lastName, phone, birthdate, city, address, email, password } = values;

    if (!firstName || firstName.trim().length < 2) {
      setFirstNameError(true); setFirstNameErrorMessage('Inserisci un nome valido.'); ok = false;
    }
    if (!lastName || lastName.trim().length < 2) {
      setLastNameError(true); setLastNameErrorMessage('Inserisci un cognome valido.'); ok = false;
    }
    if (!isValidPhone(phone)) {
      setPhoneError(true); setPhoneErrorMessage('Numero di cellulare non valido'); ok = false;
    }
    if (!birthdate) {
      setBirthdateError(true); setBirthdateErrorMessage('La data di nascita è obbligatoria'); ok = false;
    } else {
      const d = new Date(birthdate);
      if (Number.isNaN(d.getTime())) {
        setBirthdateError(true); setBirthdateErrorMessage('Data di nascita non valida'); ok = false;
      } else {
        const today = new Date();
        let anni = today.getFullYear() - d.getFullYear();
        const m = today.getMonth() - d.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < d.getDate())) anni--;
        if (anni < 18) { setBirthdateError(true); setBirthdateErrorMessage('Devi avere almeno 18 anni'); ok = false; }
      }
    }
    if (!city || city.trim().length < 2) {
      setCityError(true); setCityErrorMessage('Città non valida'); ok = false;
    }
    if (!address || address.trim().length < 5) {
      setAddressError(true); setAddressErrorMessage('Indirizzo troppo corto'); ok = false;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError(true); setEmailErrorMessage('Email non valida'); ok = false;
    }
    if (!password || password.length < 8) {
      setPasswordError(true); setPasswordErrorMessage('Password troppo corta (minimo 8 caratteri)'); ok = false;
    }

    return ok;
  };

  // -- COMMENTO -- Submit con mapping FE->BE
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const values = {
      firstName: (form.get('firstName') || '').toString().trim(),
      lastName:  (form.get('lastName')  || '').toString().trim(),
      phone:     (form.get('phone')     || '').toString().trim(),
      birthdate: (form.get('birthdate') || '').toString().trim(),
      city:      (form.get('city')      || '').toString().trim(),
      address:   (form.get('address')   || '').toString().trim(),
      email:     (form.get('email')     || '').toString().trim(),
      password:  (form.get('password')  || '').toString(),
    };

    if (!validateInputs(values)) return;

    const payload = {
      firstName:   values.firstName,
      lastName:    values.lastName,
      numCell:     normalizePhone(values.phone), // <-- mapping telefono
      dataNascita: values.birthdate,             // <-- mapping
      citta:       values.city,                  // <-- mapping
      indirizzo:   values.address,               // <-- mapping
      email:       values.email,
      password:    values.password,
    };

    try {
      await signupRider(payload);
      // socket.connect(); socket.emit('rider:signup', { email: payload.email }); // opzionale
      navigate('/login');
    } catch (err) {
      const msg = (err?.message || '').toString().toLowerCase();

      if (msg.includes('email')) {
        setEmailError(true); setEmailErrorMessage(err.message);
      } else if (msg.includes('nascita') || msg.includes('anni')) {
        setBirthdateError(true); setBirthdateErrorMessage(err.message);
      } else if (msg.includes('telefono') || msg.includes('cellulare') || msg.includes('cell')) {
        setPhoneError(true); setPhoneErrorMessage(err.message);
      } else if (msg.includes('indirizzo')) {
        setAddressError(true); setAddressErrorMessage(err.message);
      } else if (msg.includes('citt')) {
        setCityError(true); setCityErrorMessage(err.message);
      } else if (msg.includes('password')) {
        setPasswordError(true); setPasswordErrorMessage(err.message);
      } else if (!err?.message) {
        alert('Errore di registrazione. Riprova.');
      } else {
        alert(err.message);
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
