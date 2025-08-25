import { SitemarkIcon } from '../GestioneHomePage/CustomIcons.jsx';
import ColorModeSelect from '../../theme/ColorModeSelect.jsx';
import logo from '../../Images/DelivEat_logo2.png';
import MenuGallery from './MenuGallery.jsx';
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@mui/material';

export default function Home() {
  return (
    <Box>
      {/* Header */}
      <AppBar position="static" color="primaryHome" className="appbar-custom">
      <Toolbar className="toolbar-custom">
        {/* LOGO */}
        <Box className="logo-home">
            <SitemarkIcon />
          </Box>
        {/* LINKS */}
        <Box text="text" className="links-box">
          <Button component={Link} to="/" variant='contained' color="secondary">Home</Button>
          <Button variant='contained' color="secondary">Chi siamo</Button>
          <Button variant='contained' color="secondary">Come funziona</Button>
          <Button component={Link} to="/home/faq" variant='contained' color="secondary">FAQ</Button>
          <Button variant='contained' color="secondary">Contatti</Button>
          <Button variant='contained' color="secondary">Info Legali</Button>
        </Box>
        <Box className="color-switch-home">
            <ColorModeSelect/>
        </Box>
      </Toolbar>
     </AppBar>
     <Box className="menu-ordina">
  {/* Sezione sinistra: MenuGallery */}
       <Box className="flex-1">
        <MenuGallery />
      </Box>

    <Box className="logo-grande">
    <img src={logo} alt="Logo-body" className="logo-body"/>
    <Typography variant="h5" className="catchphrase" color="secondary" fontWeight={800}>
      Ordina in pochi click!
    </Typography>
    <Typography variant="body1" className="catchphrase2" color="secondary" fontWeight={800}>
      Scopri la comodità di ricevere il tuo cibo preferito direttamente a casa.
    </Typography>
  </Box>
</Box>
       {/* App Promotion */}
      <Box color="inherit" className="promotion-box">
        <Typography variant="h5">Scarica l'App</Typography>
        <Typography variant="body1">
          Ordina con la nostra App
        </Typography>
        <Button variant="contained" color="secondary" className="download">
          Download
        </Button>
      </Box>

      {/* Footer */}
      <Box className="footer-custom">
        <Typography variant="body2">© 2025 DelivEat. Tutti i diritti riservati.</Typography>
      </Box>
    </Box>
  );
}

