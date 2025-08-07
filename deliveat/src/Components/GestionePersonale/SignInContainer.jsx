import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

import './GestionePersonale.css';

export const SignInContainer = (props) => (
  <Stack className="signin-container" {...props} />
);

export const StyledCard = (props) => (
  <MuiCard className="signin-card" {...props} />
);

