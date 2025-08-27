import { SitemarkIcon } from '../../GestioneHomePage/CustomIcons.jsx';
import logo from '../../../Images/D2.png';
import OrdinaStepper from './OrdinaStepper.jsx';
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container  
} from '@mui/material';

export default function Ordina() {
  return (
    <Box className="page-container">
      <Container maxWidth="md" className="box-ordina content">
        <img src={logo} alt="Logo-body" className="logo-ordina" />
        <Typography variant="h4" className="text-ordina">
          ORDINAZIONE DA ASPORTO
        </Typography>
        <Box>
          <OrdinaStepper />
        </Box>
      </Container>
      <Box className="footer2-custom">
        <Typography variant="body2">
          © 2025 DelivEat. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  )  
}