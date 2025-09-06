import * as React from 'react';
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { SignUpContainer, StyledCard } from './SignUpContainer';
import { useSignUpLogic } from './SignUpLogic';
import AppTheme from '../../theme/AppTheme';
import ColorModeSelect from '../../theme/ColorModeSelect';
import SitemarkIcon from '../GestioneIcons/SistemarkIcon.jsx';

export default function SignUp() {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/signup');
    }
  }, []);

  const {
    FirstNameError, FirstNameErrorMessage,
    LastNameError,  LastNameErrorMessage,
    PhoneError,     PhoneErrorMessage,
    BirthdateError, BirthdateErrorMessage,
    CityError,      CityErrorMessage,
    AddressError,   AddressErrorMessage,
    EmailError,     EmailErrorMessage,
    PasswordError,  PasswordErrorMessage,
    handleSubmit
  } = useSignUpLogic();

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />

      <SignUpContainer direction="column" justifyContent="center" alignItems="center">
        <StyledCard variant="outlined">
          {/* -- COMMENTO -- Selettore tema */}
          <Box className="color-switch">
            <ColorModeSelect />
          </Box>

          {/* -- COMMENTO -- Logo */}
          <Box className="logo-container">
            <SitemarkIcon className="logo-img" />
          </Box>

          {/* -- COMMENTO -- Titolo */}
          <Typography component="h2" variant="h4" className="auth-title">
            Crea il tuo account Rider
          </Typography>

          {/* -- COMMENTO -- FORM */}
          <Box component="form" method="post" noValidate onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* -- COMMENTO -- Nome */}
              <div className="field">
                <FormControl fullWidth>
                  <FormLabel htmlFor="firstName">Nome</FormLabel>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    placeholder="Mario"
                    variant="outlined"
                    error={FirstNameError}
                    helperText={FirstNameErrorMessage}
                    fullWidth
                    autoComplete="given-name"
                  />
                </FormControl>
              </div>

              {/* -- COMMENTO -- Cognome */}
              <div className="field">
                <FormControl fullWidth>
                  <FormLabel htmlFor="lastName">Cognome</FormLabel>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    placeholder="Rossi"
                    variant="outlined"
                    error={LastNameError}
                    helperText={LastNameErrorMessage}
                    fullWidth
                    autoComplete="family-name"
                  />
                </FormControl>
              </div>

              {/* -- COMMENTO -- Telefono */}
              <div className="field">
                <FormControl fullWidth>
                  <FormLabel htmlFor="phone">Telefono</FormLabel>
                  <TextField
                    required
                    id="phone"
                    name="phone"
                    placeholder="3331234567"
                    variant="outlined"
                    error={PhoneError}
                    helperText={PhoneErrorMessage}
                    fullWidth
                    autoComplete="tel"
                  />
                </FormControl>
              </div>

              {/* -- COMMENTO -- Data di nascita */}
              <div className="field">
                <FormControl fullWidth>
                  <FormLabel htmlFor="birthdate">Data di nascita</FormLabel>
                  <TextField
                    required
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    variant="outlined"
                    error={BirthdateError}
                    helperText={BirthdateErrorMessage}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </div>

              {/* -- COMMENTO -- Città */}
              <div className="field">
                <FormControl fullWidth>
                  <FormLabel htmlFor="city">Città</FormLabel>
                  <TextField
                    required
                    id="city"
                    name="city"
                    placeholder="Bari"
                    variant="outlined"
                    error={CityError}
                    helperText={CityErrorMessage}
                    fullWidth
                    autoComplete="address-level2"
                  />
                </FormControl>
              </div>

              {/* -- COMMENTO -- Indirizzo */}
              <div className="field">
                <FormControl fullWidth>
                  <FormLabel htmlFor="address">Indirizzo</FormLabel>
                  <TextField
                    required
                    id="address"
                    name="address"
                    placeholder="Via Roma 1"
                    variant="outlined"
                    error={AddressError}
                    helperText={AddressErrorMessage}
                    fullWidth
                    autoComplete="street-address"
                  />
                </FormControl>
              </div>

              {/* -- COMMENTO -- Email */}
              <div className="field full">
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required
                    id="email"
                    name="email"
                    placeholder="mario.rossi@email.com"
                    variant="outlined"
                    error={EmailError}
                    helperText={EmailErrorMessage}
                    fullWidth
                    autoComplete="email"
                  />
                </FormControl>
              </div>

              {/* -- COMMENTO -- Password */}
              <div className="field full">
                <FormControl fullWidth>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    required
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    variant="outlined"
                    error={PasswordError}
                    helperText={PasswordErrorMessage}
                    fullWidth
                    autoComplete="new-password"
                  />
                </FormControl>
              </div>

              {/* -- COMMENTO -- Azioni */}
              <div className="actions">
                <Button type="submit" variant="contained" className="btn-full">
                  CREA ACCOUNT
                </Button>
              </div>
            </div>
          </Box>

          {/* -- COMMENTO -- Footer */}
          <Typography sx={{ textAlign: 'center' }} className="auth-footer">
            Hai già un account?{' '}
            <Link component={RouterLink} to="/login" variant="body2" sx={{ alignSelf: 'center' }}>
              Accedi
            </Link>
          </Typography>
        </StyledCard>
      </SignUpContainer>
    </AppTheme>
  );
}
