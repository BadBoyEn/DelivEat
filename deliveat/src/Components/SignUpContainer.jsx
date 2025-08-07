import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

import './SignUpContainer.css';

export const SignUpContainer = styled(Stack)`
  height: 100vh;
`;

export const StyledCard = styled(MuiCard)`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-self: center;
`;