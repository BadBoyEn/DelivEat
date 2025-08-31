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
import { Link as RouterLink } from 'react-router-dom';

import { LogInContainer, StyledCard } from './LogInContainer';
import { useLogInLogic } from './LogInLogic';
import AppTheme from '../../theme/AppTheme';
import ColorModeSelect from '../../theme/ColorModeSelect';
import SitemarkIcon from '../GestioneIcons/SistemarkIcon.jsx';

export default function LogIn(props) {
  const {
    emailError, emailErrorMessage,
    passwordError, passwordErrorMessage,
    handleSubmit
  } = useLogInLogic();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <LogInContainer direction="column" justifyContent="center" alignItems="center">
        <StyledCard variant="outlined">

          {/* -- COLOR THEME -- */}
          <Box className="color-switch">
            <ColorModeSelect />
          </Box>

          {/* -- LOGO -- */}
          <Box className="logo-container">
            <SitemarkIcon className="logo-img" />
          </Box>

          {/* -- TITOLO -- */}
          <Typography component="h2" variant="h4" className="auth-title">
            Accesso Riservato
          </Typography>

          {/* -- Form: campi a colonna -- */}
          <Box component="form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field full">
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required
                    id="email"
                    name="email"
                    placeholder="tua@email.com"
                    variant="outlined"
                    error={emailError}
                    helperText={emailErrorMessage}
                    fullWidth
                  />
                </FormControl>
              </div>

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
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    fullWidth
                  />
                </FormControl>
              </div>

              <div className="field full auth-actions">
                <Button type="submit" variant="contained" className="btn-full">
                  ACCEDI
                </Button>
              </div>
            </div>
          </Box>

          {/* -- SEPARATORE E FOOTER --*/}
          <div className="auth-sep" role="separator" aria-label="oppure">
            <span>o</span>
          </div>

          <Typography sx={{ textAlign: 'center' }} className="auth-footer">
            Non hai un account?{' '}
            <Link component={RouterLink} to="/signup" variant="body2" sx={{ alignSelf: 'center' }}>
              Registrati
            </Link>
          </Typography>
        </StyledCard>
      </LogInContainer>
    </AppTheme>
  );
}
