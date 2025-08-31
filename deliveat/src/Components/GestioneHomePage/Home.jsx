import SitemarkIcon from '../GestioneIcons/SistemarkIcon.jsx';
import ColorModeSelect from '../../theme/ColorModeSelect.jsx';
import logo from '../../Images/DelivEat_logo2.png';
import MenuGallery from './MenuGallery.jsx';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import './GestioneHomePage.css';

export default function Home() {
  return (
    <Box>
      {/* AppBar */}
      <AppBar position="static" className="appbar-custom">
        <Toolbar className="toolbar-custom">

          {/* Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SitemarkIcon className="logo-home" />
            <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
              DelivEat
            </Typography>
          </Box>

          {/* Link destra */}
          <Box className="links-box">
            <Button component={Link} to="/home/chisiamo" color="inherit">Chi siamo</Button>
            <Button component={Link} to="/home/comefunziona" color="inherit">Come funziona</Button>
            <Button component={Link} to="/home/contatti" color="inherit">Contatti</Button>
            <Button component={Link} to="/home/faq" color="inherit">FAQ</Button>
            <Button component={Link} to="/home/infolegali" color="inherit">Info legali</Button>
            <Button component={Link} to="/login" variant="outlined" color="inherit">Accedi</Button>
          </Box>

          {/* Switch tema */}
          <Box className="color-switch-home">
            <ColorModeSelect />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sezione “Ordina” */}
      <Box className="menu-ordina">
        <Box className="flex-1">
          <MenuGallery />
        </Box>

        <Box className="logo-grande">
          <img src={logo} alt="Logo-body" className="logo-body" />
          <Typography variant="h5" className="catchphrase" color="secondary" fontWeight={800}>
            Ordina in pochi click!
          </Typography>
          <Typography variant="body1" className="catchphrase2" color="secondary" fontWeight={800}>
            Scopri la comodità di ricevere il tuo cibo preferito direttamente a casa.
          </Typography>

          {/* CTA */}
          <Box sx={{ mt: 2 }}>
            <Button
              component={Link}
              to="/home/ordina"
              variant="contained"
              color="secondary"
              className="download"
            >
              Ordina ora
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box className="footer-custom">
        <Typography variant="body2">© 2025 DelivEat. All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
}
