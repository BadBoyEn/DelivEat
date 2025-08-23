import { SitemarkIcon } from '../CustomIcons.jsx';
import ColorModeSelect from '../../../theme/ColorModeSelect.jsx';
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography
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
          <Button component={Link} to="/faq" variant='contained' color="secondary">FAQ</Button>
          <Button variant='contained' color="secondary">Contatti</Button>
          <Button variant='contained' color="secondary">Info Legali</Button>
        </Box>
        <Box className="color-switch-home">
            <ColorModeSelect/>
        </Box>
      </Toolbar>
     </AppBar>
     <Box className="footer-custom">
        <Typography variant="body2">© 2025 DelivEat. Tutti i diritti riservati.</Typography>
      </Box>
    </Box>
  );
}  