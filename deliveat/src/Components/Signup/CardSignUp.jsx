import React, { useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import ActionSignUp from './ActionSignUp';
import SignupForm from './SignupForm';
import TitleSignUp from './TitleSignUp';
import './CardSignUp.css';

function CardSignUp () {

    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    //CONTROLLER: validazioni
    const validateInputs = () => {
    let valid = true;

    if (!document.getElementById('email').value.includes('@')) {
      setEmailError(true);
      setEmailErrorMessage('Enter a valid email');
      valid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('KALIFANO');
    }

    if (document.getElementById('password').value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('SAN PIETRO');
    }

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      alert('Form submitted successfully!');
    }
  };

    return (
        <div className="card-container">
        <TitleSignUp />

        <SignupForm
            emailError={emailError}
            emailErrorMessage={emailErrorMessage}
            passwordError={passwordError}
            passwordErrorMessage={passwordErrorMessage}
            handleSubmit={handleSubmit}
        />
        <ActionSignUp validateInputs={validateInputs} />
    </div>
  );
}

export default CardSignUp;