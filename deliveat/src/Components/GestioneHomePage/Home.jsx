import { SitemarkIcon } from '../GestioneHomePage/CustomIcons.jsx';
import ColorModeSelect from '../../theme/ColorModeSelect.jsx';
import logo from '../../Images/DelivEat_logo.png';
import MenuGallery from './MenuGallery.jsx';
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
      <AppBar position="static" color="primaryHome" sx={{ height: "80px", justifyContent: 'center'}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LOGO */}
        <Box className="logo-home">
            <SitemarkIcon />
          </Box>
        {/* LINKS */}
        <Box text="text" sx={{ mr: 3.4, display: 'flex', gap: 1.5 }}>
          <Button variant='contained' color="secondary">Home</Button>
          <Button variant='contained' color="secondary">Chi siamo</Button>
          <Button variant='contained' color="secondary">Come funziona</Button>
          <Button variant='contained' color="secondary">FAQ</Button>
          <Button variant='contained' color="secondary">Contatti</Button>
          <Button variant='contained' color="secondary">Info Legali</Button>
        </Box>
        <Box className="color-switch-home">
            <ColorModeSelect/>
        </Box>
      </Toolbar>
     </AppBar>
     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 4 }}>
  {/* Sezione sinistra: MenuGallery */}
  <Box sx={{ flex: 1 }}>
    <MenuGallery />
  </Box>

  <Box sx={{ flex: 1, textAlign: 'center' }}>
    <img src={logo} alt="Logo-body" className="logo-body"/>
    <Typography variant="h5" sx={{ mb: 1 }}>
      Ordina in pochi click!
    </Typography>
    <Typography variant="body1">
      Scopri la comodità di ricevere il tuo cibo preferito direttamente a casa.
    </Typography>
  </Box>
</Box>
       {/* App Promotion */}
      <Box color="inherit" sx={{ p: 4, textAlign: 'center', boxShadow: "0 6px 18px rgba(0, 0, 0, 0.8)"}}>
        <Typography variant="h5">Scarica l'App</Typography>
        <Typography variant="body1">
          Ordina con la nostra App
        </Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
          Download
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 4, backgroundColor: '#212121', color: '#fff', textAlign: 'center' }}>
        <Typography variant="body2">© 2025 DelivEat. All rights reserved.</Typography>
      </Box>
    </Box>
  );
}
