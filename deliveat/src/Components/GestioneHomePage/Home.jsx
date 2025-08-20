import { SitemarkIcon } from '../GestioneHomePage/CustomIcons.jsx';
import ColorModeSelect from '../../theme/ColorModeSelect.jsx';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  ImageList,
  ImageListItem
} from '@mui/material';

const menuItems = [
  { img: 'pizza.jpg', title: 'Pizza' },
  { img: 'sushi.jpg', title: 'Sushi' },
  { img: 'burger.jpg', title: 'Burger' },
];
export default function Home() {
  return (
    <Box>
      {/* Header */}
      <AppBar position="static" color="primary" sx={{ height: "80px", justifyContent: 'center'}}>
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
        <Box className="color-switch-home">
            <ColorModeSelect/>
        </Box>
      </Toolbar>
    </AppBar>
    <Box sx={{ width: '100%', height: '100%', overflowY: 'auto', p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Esplora il Menù
      </Typography>
      <ImageList variant="masonry" cols={2} gap={12}>
        {menuItems.map((item) => (
          <ImageListItem key={item.img} sx={{ position: 'relative' }}>
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                color: '#fff',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '4px 8px',
                borderRadius: '4px',
              }}
            >
              {item.title}
            </Typography>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>

      {/* Frase + Logo a destra */}
      <Grid item xs={12} md={7} sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        p: 4
      }}>
        <Box className="logo-home">
            <SitemarkIcon />
          </Box>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ff5722' }}>
          DelivEat: il gusto che arriva da solo
        </Typography>
      </Grid>
      {/* App Promotion */}
      <Box sx={{ p: 4, textAlign: 'center', backgroundColor: 'rgba(13, 16, 18, 0.92)' }}>
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
