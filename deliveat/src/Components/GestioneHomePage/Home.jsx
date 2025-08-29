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
      <AppBar elevation={0} position="relative" color="primaryHome" className="appbar-custom">
      <Toolbar className="toolbar-custom">
        {/* LOGO */}
        <Box className="logo-home">
            <SitemarkIcon />
          </Box>
        {/* LINKS */}
        <Box text="text" className="links-box">
          <Button component={Link} to="/" variant='contained' color="secondary">Home</Button>
          <Button component={Link} to="/home/chisiamo" variant='contained' color="secondary">Chi Siamo</Button>
          <Button component={Link} to="/home/comefunziona" variant='contained' color="secondary">Come Funziona</Button>
          <Button component={Link} to="/home/faq" variant='contained' color="secondary">FAQ</Button>
          <Button component={Link} to="/home/contatti" variant='contained' color="secondary">Contatti</Button>
          <Button component={Link} to="/home/info" variant='contained' color="secondary">Info Legali</Button>
        </Box>
        <Box className="color-switch-home">
            <ColorModeSelect/>
        </Box>
      </Toolbar>
     </AppBar>
     <Box className="menu-ordina">
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
       {/*    
        <div className="triangle-top"></div>
        <div className="triangle-bottom"></div>
       */}
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
        <Typography variant="body2">© 2025 DelivEat. All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
}

