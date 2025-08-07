import * as React from 'react';
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography
} from '@mui/material';

import { SignInContainer, StyledCard } from './SignInContainer';
import { useSignInLogic } from './SignInLogic';
import { GoogleIcon, SitemarkIcon } from './CustomIcons';
import ColorModeSelect from '../../theme/ColorModeSelect';
import AppTheme from '../../theme/AppTheme';

import './GestionePersonale.css';

export default function SignIn(props) {
  const {
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    validateInputs,
    handleSubmit
  } = useSignInLogic();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="center" className="signin-card-container">
        <StyledCard variant="outlined" className="card">
          <Box className="logo-container">
            <SitemarkIcon />
          </Box>

          <Box className="color-switch">
            <ColorModeSelect />
          </Box>

          <Typography component="h1" variant="h4.5" className="title">
            Accedi
          </Typography>

          <Box component="form" onSubmit={handleSubmit} className="form">
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
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
              Registrati
            </Button>
          </Box>

          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>o</Typography>
          </Divider>

          <Box className="reg-button">
            <Button
              fullWidth
              variant="outlined"
            >
              REGISTRATI
            </Button>
          </Box>
        </StyledCard>
      </SignInContainer>
    </AppTheme>
  );
}
