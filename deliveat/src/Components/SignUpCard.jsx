import * as React from 'react';
import { Box, Button, Checkbox, CssBaseline, Divider, FormControl, FormControlLabel, FormLabel, Link, TextField, Typography } from '@mui/material';
import { Card, SignUpContainer } from './SignUpContainer';
import { useSignUpLogic } from './SignUpLogic';
import { GoogleIcon, SitemarkIcon } from './CustomIcons';
import ColorModeSelect from '../theme/ColorModeSelect';
import AppTheme from '../theme/AppTheme';

export default function SignUp(props) { 
  const {
    emailError, emailErrorMessage,
    passwordError, passwordErrorMessage,
    validateInputs, handleSubmit
  } = useSignUpLogic();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="center">
      <Card variant="outlined" sx={{ p: 3, position: 'relative', overflow: 'visible' }}>  
          <SitemarkIcon />
          <Box sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'background.paper' }}>
            <ColorModeSelect />
          </Box>
          <Typography component="h1" variant="h4.5" sx={{  }}>
            Registrati
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button fullWidth variant="outlined" onClick={() => alert('Sign up with Google')} startIcon={<GoogleIcon />}>
              Registrati con Google
            </Button>
            <Typography sx={{ textAlign: 'center', marginTop: 1}}>
              Hai già un account?{' '}
              <Link href="/sign-in" variant="body2">
                Accedi subito
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}