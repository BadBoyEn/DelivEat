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
import { SitemarkIcon } from './CustomIcons';

export default function SignUp(props) {
  const {
    FirstNameError, FirstNameErrorMessage,
    LastNameError,  LastNameErrorMessage,
    PhoneError,     PhoneErrorMessage,
    BirthdateError, BirthdateErrorMessage,
    CityError,      CityErrorMessage,
    AddressError,   AddressErrorMessage,
    EmailError,     EmailErrorMessage,
    PasswordError,  PasswordErrorMessage,
    handleSubmit,
  } = useSignUpLogic();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="center" alignItems="center">
        <StyledCard variant="outlined">

          <Box className="color-switch">
            <ColorModeSelect />
          </Box>

          <Box className="logo-container">
            <SitemarkIcon className="logo-img" />
          </Box>

          <Typography component="h2" variant="h4.5" className="auth-title">
            Registrazione Staff
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <div className="form-grid">

              {/* Nome / Cognome */}
              <div className="field">
                <FormControl fullWidth>
                  <FormLabel htmlFor="firstname">Nome</FormLabel>
                  <TextField
                    required id="firstname" name="firstname" placeholder="Mario"
                    variant="outlined" error={FirstNameError} helperText={FirstNameErrorMessage}
                  />
                </FormControl>
              </div>

              <div className="field">
                <FormControl fullWidth>
                  <FormLabel htmlFor="lastname">Cognome</FormLabel>
                  <TextField
                    required id="lastname" name="lastname" placeholder="Rossi"
                    variant="outlined" error={LastNameError} helperText={LastNameErrorMessage}
                  />
                </FormControl>
              </div>

              {/* Telefono / Data di nascita */}
              <div className="field">
                <FormControl fullWidth>
                  <FormLabel htmlFor="phone">Numero di telefono</FormLabel>
                  <TextField
                    required id="phone" name="phone" placeholder="+39 123 456 7890"
                    variant="outlined" error={PhoneError} helperText={PhoneErrorMessage}
                  />
                </FormControl>
              </div>

              <div className="field">
                <FormControl fullWidth>
                  <FormLabel htmlFor="birthdate">Data di nascita</FormLabel>
                  <TextField
                    required id="birthdate" name="birthdate" type="date"
                    variant="outlined" InputLabelProps={{ shrink: true }}
                    error={BirthdateError} helperText={BirthdateErrorMessage}
                  />
                </FormControl>
              </div>

              {/* Città / Indirizzo */}
              <div className="field">
                <FormControl fullWidth>
                  <FormLabel htmlFor="city">Città</FormLabel>
                  <TextField
                    required id="city" name="city" placeholder="Roma"
                    variant="outlined" error={CityError} helperText={CityErrorMessage}
                  />
                </FormControl>
              </div>

              <div className="field">
                <FormControl fullWidth>
                  <FormLabel htmlFor="address">Indirizzo</FormLabel>
                  <TextField
                    required id="address" name="address" placeholder="Via Roma 10"
                    variant="outlined" error={AddressError} helperText={AddressErrorMessage}
                  />
                </FormControl>
              </div>

              {/* Email (full) */}
              <div className="field full">
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required id="email" name="email" placeholder="tua@email.com"
                    variant="outlined" error={EmailError} helperText={EmailErrorMessage}
                  />
                </FormControl>
              </div>

              {/* Password (full) */}
              <div className="field full">
                <FormControl fullWidth>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    required id="password" name="password" type="password" placeholder="••••••••"
                    variant="outlined" error={PasswordError} helperText={PasswordErrorMessage}
                  />
                </FormControl>
              </div>

              {/* Bottone (full) */}
              <div className="field full auth-actions">
                <Button type="submit" variant="contained" className="btn-full">
                  REGISTRATI
                </Button>
              </div>

            </div>
          </Box>

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
