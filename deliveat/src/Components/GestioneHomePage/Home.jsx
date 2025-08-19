import { SitemarkIcon } from '../GestionePersonale/CustomIcons';
import ColorModeSelect from '../../theme/ColorModeSelect.jsx';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Container,
} from '@mui/material';
export default function Home() {
  return (
    <Box>
      {/* Header */}
      <AppBar position="static" color="primary" sx={{ height: "68px", justifyContent: "center" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LOGO */}
        <Box className="logo-home">
            <SitemarkIcon />
          </Box>
        {/* LINKS */}
        <Box sx={{ mr: 2.5 }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Chi siamo</Button>
          <Button color="inherit">Come funziona</Button>
          <Button color="inherit">Supporto</Button>
          <Button color="inherit">Contatti</Button>
          <Button color="inherit">Info Legali</Button>
        </Box>
        <Box className="color-switch">
            <ColorModeSelect/>
        </Box>
      </Toolbar>
    </AppBar>
      {/* App Promotion */}
      <Box sx={{ p: 4, textAlign: 'center', backgroundColor: '#e0f7fa' }}>
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
