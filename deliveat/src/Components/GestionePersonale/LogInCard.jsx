import * as React from 'react';
import {
  Box,
  Button,
  CssBaseline,
  Link,
  FormControl,
  FormLabel,
  TextField,
  Typography
} from '@mui/material';

import { LogInContainer, StyledCard } from './LogInContainer';
import { useLogInLogic } from './LogInLogic';
import { SitemarkIcon } from './CustomIcons';
import ColorModeSelect from '../../theme/ColorModeSelect';
import AppTheme from '../../theme/AppTheme';

import './GestionePersonale.css';

export default function LogIn(props) {
  const {
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    validateInputs,
    handleSubmit
  } = useLogInLogic();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <LogInContainer direction="column" justifyContent="center">
        <StyledCard variant="outlined">
          <Box className="color-switch">
            <ColorModeSelect />
          </Box>

          <Box className="logo-container">
            <SitemarkIcon />
          </Box>

          <Typography component="h2" variant="h4.5" className="auth-title">
            Accesso Riservato
          </Typography>

          <Box component="form" onSubmit={handleSubmit} className="auth-form">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="tua@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
              Accedi
            </Button>
          </Box>

          <Typography sx={{ textAlign: 'center' }}>
              Non hai un account?{' '}
              <Link
                href="/signup"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Registrati
              </Link>
            </Typography>
        </StyledCard>
      </LogInContainer>
    </AppTheme>
  );
}
