import { useState } from 'react';

export function useSignUpLogic() {
  const [FirstNameError, setFirstNameError] = useState(false);
  const [FirstNameErrorMessage, setFirstNameErrorMessage] = useState('');
  const [LastNameError, setLastNameError] = useState(false);
  const [LastNameErrorMessage, setLastNameErrorMessage] = useState('');

  const validateInputs = () => {
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');

    let isValid = true;

    if (!firstname.value || !/\S+@\S+\.\S+/.test(firstname.value)) {
      setFirstNameError(true);
      setFirstNameErrorMessage('Please enter a valid First Name.');
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage('');
    }

    if (!lastname.value || !/\S+@\S+\.\S+/.test(lastname.value)) {
      setLastNameError(true);
      setLastNameErrorMessage('Please enter a valid Last Name.');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage('');
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
    });
  };

  return {
    FirstNameError, FirstNameErrorMessage,
    LastNameError, LastNameErrorMessage,
    validateInputs,
    handleSubmit
  };
}
