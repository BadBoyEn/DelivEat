import { useState } from 'react';
import { signupRider } from '../../api/auth';

export function useSignUpLogic() {
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
    const firstname = document.getElementById('firstname');
    const lastname  = document.getElementById('lastname');
    const phone     = document.getElementById('phone');
    const birthdate = document.getElementById('birthdate');
    const city      = document.getElementById('city');
    const address   = document.getElementById('address');
    const email     = document.getElementById('email');
    const password  = document.getElementById('password');

    let isValid = true;
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/;

    if (!nameRegex.test(firstname.value)) {
      setFirstNameError(true); setFirstNameErrorMessage('Inserisci un nome valido.'); isValid = false;
    } else { setFirstNameError(false); setFirstNameErrorMessage(''); }

    if (!nameRegex.test(lastname.value)) {
      setLastNameError(true); setLastNameErrorMessage('Inserisci un cognome valido.'); isValid = false;
    } else { setLastNameError(false); setLastNameErrorMessage(''); }

    if (!/^\d{7,}$/.test(phone.value)) {
      setPhoneError(true); setPhoneErrorMessage('Inserisci un numTel valido.'); isValid = false;
    } else { setPhoneError(false); setPhoneErrorMessage(''); }

    const birth = new Date(birthdate.value);
    if (isNaN(birth.getTime()) || birth > new Date()) {
      setBirthdateError(true); setBirthdateErrorMessage('Inserisci quando sei nato/a.'); isValid = false;
    } else { setBirthdateError(false); setBirthdateErrorMessage(''); }

    if (!nameRegex.test(city.value)) {
      setCityError(true); setCityErrorMessage('Inserisci una città valida.'); isValid = false;
    } else { setCityError(false); setCityErrorMessage(''); }

    if (address.value.trim().length < 5) {
      setAddressError(true); setAddressErrorMessage('Inserisci un indirizzo valido.'); isValid = false;
    } else { setAddressError(false); setAddressErrorMessage(''); }

    if (!/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true); setEmailErrorMessage("Inserisci un'email valida."); isValid = false;
    } else { setEmailError(false); setEmailErrorMessage(''); }

    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password.value)) {
      setPasswordError(true); setPasswordErrorMessage('8 caratteri, 1 lettera e 1 numero.'); isValid = false;
    } else { setPasswordError(false); setPasswordErrorMessage(''); }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // evita reload
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);

    const payload = {
      firstName:   (data.get('firstname') || '').toString().trim(),
      lastName:    (data.get('lastname')  || '').toString().trim(),
      numCell:     (data.get('phone')     || '').toString().trim(),
      dataNascita: (data.get('birthdate') || '').toString().trim(), // "YYYY-MM-DD"
      citta:       (data.get('city')      || '').toString().trim(),
      indirizzo:   (data.get('address')   || '').toString().trim(),
      email:       (data.get('email')     || '').toString().trim(),
      password:    (data.get('password')  || '').toString().trim(),
    };

    try {
      await signupRider(payload);
      // -- APPENA SI REGISTRA IL RIDER, REINDIRIZZAMENTO AL LOGIN --
      window.location.assign('/login');
    } catch (err) {
      // -- ERRORI --
      const msg = err?.message || 'Errore registrazione';
      if (msg.toLowerCase().includes('email')) {
        setEmailError(true); setEmailErrorMessage(msg);
      } else if (msg.toLowerCase().includes('nascita') || msg.toLowerCase().includes('anni')) {
        setBirthdateError(true); setBirthdateErrorMessage(msg);
      } else if (msg.toLowerCase().includes('telefono')) {
        setPhoneError(true); setPhoneErrorMessage(msg);
      } else {
        // fallback
        alert(msg);
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
