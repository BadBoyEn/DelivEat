import SitemarkIcon from '../../GestioneIcons/SistemarkIcon.jsx';
import ColorModeSelect from '../../../theme/ColorModeSelect.jsx';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import '../GestioneHomePage.css'; 

export default function InfoLegali() {
  return (
    <Box className="faq-custom">
      <AppBar elevation={0} position="relative" color="transparent" className="appbar-custom">
        <Toolbar className="toolbar-custom">
          <Box className="logo-home">
            <SitemarkIcon />
          </Box>

          <Box className="links-box">             
            <Button component={Link} to="/" variant="contained" color="secondary">Home</Button>
            <Button component={Link} to="/home/chisiamo" variant="contained" color="secondary">Chi Siamo</Button>
            <Button component={Link} to="/home/comefunziona" variant='contained' color="secondary">Come Funziona</Button>
            <Button component={Link} to="/home/contatti" variant="contained" color="secondary">Contatti</Button>
            <Button component={Link} to="/home/faq" variant='contained' color="secondary">FAQ</Button>
          </Box>

          <Box className="color-switch-home">
            <ColorModeSelect />
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom fontWeight={800}>Informazioni Legali</Typography>
        <Typography variant="body1" paragraph>
          Qui inserirai privacy policy, termini e condizioni, cookie policy, ecc.
        </Typography>
      </Container>

      <Box className="footer2-custom">
        <Typography variant="body2">© DelivEat. All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
}
