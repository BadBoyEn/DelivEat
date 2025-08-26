import { SitemarkIcon } from '../../GestioneHomePage/CustomIcons.jsx';
import ColorModeSelect from '../../../theme/ColorModeSelect.jsx';
import logo from '../../../Images/DelivEat_logo2.png';
import OrdinaStepper from './OrdinaStepper.jsx';
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container  
} from '@mui/material';

export default function Ordina() {
  return (
    <Box>
        <Box className="color-switch-ordina">
            <ColorModeSelect/>
        </Box> 
      <Container maxWidth="md" className="box-ordina">
        <img src={logo} alt="Logo-body" className="logo-ordina" />
        <Typography variant="h4" className="text-ordina">
            ORDINAZIONE DA ASPORTO
        </Typography>
        <Box>
            <OrdinaStepper/>
        </Box>
      </Container>
      <Box className="footer-custom">
        <Typography variant="body2">© 2025 DelivEat. All Rights Reserved.</Typography>
      </Box>
    </Box>  
  )  
}