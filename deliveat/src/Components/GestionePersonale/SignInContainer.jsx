import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';

import './GestionePersonale.css';

export const SignInContainer = (props) => (
  <Stack className="auth-page" {...props} />
);

export const StyledCard = (props) => (
  <MuiCard className="auth-card" {...props} />
);
