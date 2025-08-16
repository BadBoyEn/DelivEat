import { useState } from 'react';

export function useSignUpLogic() {
  // Stati errori e messaggi
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
    const lastname = document.getElementById('lastname');
    const phone = document.getElementById('phone');
    const birthdate = document.getElementById('birthdate');
    const city = document.getElementById('city');
    const address = document.getElementById('address');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    // Nome e cognome: solo lettere, minimo 2 caratteri
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/;
    
    if (!nameRegex.test(firstname.value)) {
      setFirstNameError(true);
      setFirstNameErrorMessage('Inserisci un nome valido.');
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage('');
    }

    if (!nameRegex.test(lastname.value)) {
      setLastNameError(true);
      setLastNameErrorMessage('Inserisci un cognome valido.');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage('');
    }

    // Telefono: solo numeri, almeno 7 cifre
    if (!/^\d{7,}$/.test(phone.value)) {
      setPhoneError(true);
      setPhoneErrorMessage('Inserisci un numTel valido.');
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage('');
    }

    // Data di nascita: deve essere una data valida e non futura
    const birth = new Date(birthdate.value);
    if (isNaN(birth.getTime()) || birth > new Date()) {
      setBirthdateError(true);
      setBirthdateErrorMessage('Inserisci quando sei nato/a.');
      isValid = false;
    } else {
      setBirthdateError(false);
      setBirthdateErrorMessage('');
    }

    // Città
    if (!nameRegex.test(city.value)) {
      setCityError(true);
      setCityErrorMessage('Inserisci una città valida.');
      isValid = false;
    } else {
      setCityError(false);
      setCityErrorMessage('');
    }

    // Indirizzo: minimo 5 caratteri
    if (address.value.trim().length < 5) {
      setAddressError(true);
      setAddressErrorMessage('Inserisci un indirizzo valido.');
      isValid = false;
    } else {
      setAddressError(false);
      setAddressErrorMessage('');
    }

    if (!/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Inserisci un\'email valida.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    // Password: almeno 8 caratteri, una lettera e un numero
    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password.value)) {
      setPasswordError(true);
      setPasswordErrorMessage('8 caratteri, 1 lettera e 1 numero.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    if (!validateInputs()) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      occupation: data.get('occupation'),
      phone: data.get('phone'),
      birthdate: data.get('birthdate'),
      city: data.get('city'),
      address: data.get('address'),
      email: data.get('email'),
      password: data.get('password')
    });
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