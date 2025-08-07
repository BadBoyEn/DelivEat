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

import { SignUpContainer, StyledCard } from './SignUpContainer';
import { useSignUpLogic } from './SignUpLogic';
import { GoogleIcon, SitemarkIcon } from './CustomIcons';
import ColorModeSelect from '../theme/ColorModeSelect';
import AppTheme from '../theme/AppTheme';

import './SignUpCard.css';

export default function SignUp(props) {
  const {
    emailError,
    emailErrorMessage,
    passwordError,
    passwordErrorMessage,
    validateInputs,
    handleSubmit
  } = useSignUpLogic();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <SignUpContainer direction="column" justifyContent="center" className="container">
        <StyledCard variant="outlined" className="card">
          <Box className="logo-container">
            <SitemarkIcon />
          </Box>

          <Box className="color-switch">
            <ColorModeSelect />
          </Box>

          <Typography component="h1" variant="h4.5" className="title">
            Registrati
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

          <Box className="google-buttons">
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
            >
              REGISTRATI CON GOOGLE
            </Button>

            <Typography className="link-container">
              Hai già un account?{' '}
              <Link href="/sign-in" variant="body2">
                Accedi subito
              </Link>
            </Typography>
          </Box>
        </StyledCard>
      </SignUpContainer>
    </AppTheme>
  );
}
