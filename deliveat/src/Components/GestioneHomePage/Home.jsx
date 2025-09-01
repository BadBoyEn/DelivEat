import { Box, Typography, Button } from '@mui/material';
import GestioneNavbar from './GestioneNavbar/GestioneNavbar';
import './GestioneNavbar/GestioneNavbar.css';   // layout navbar & footer
import './GestioneHomePage.css';
import MenuGallery from './MenuGallery.jsx';                // layout home + gallery

export default function Home() {
  return (
    <GestioneNavbar>
      <Box className="home-hero">
        {/* -- COLONNA SINISTRA: titolo + CTA -- */}
        <Box>
          <Typography variant="h2" className="catchphrase" sx={{ fontWeight: 900, mb: 1 }}>
            DelivEat
          </Typography>
          <Typography variant="h5" color="secondary" fontWeight={800} sx={{ mb: 1 }}>
            Ordina in pochi click!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Scopri la comodità di ricevere il tuo cibo preferito direttamente a casa.
          </Typography>

          <Box className="home-cta">
            <Button size="large" variant="contained" color="secondary" href="/home/ordina">
              Ordina ora
            </Button>
            <Button size="large" variant="outlined" color="secondary" href="/home/chisiamo">
              Scopri di più
            </Button>
          </Box>
        </Box>

        {/* -- COLONNA DESTRA -- */}
        <Box className="news-card">
          <Typography className="news-title" variant="subtitle1">
            Novità del menù
          </Typography>

          <ul className="news-list">
            <li>Carbonara</li>
            <li>Cotoletta milanese</li>
            <li>Tiramisù</li>
          </ul>

          <Box className="news-actions">
            <Button variant="contained" color="secondary" size="small" href="/ordina">
              Ordina
            </Button>
          </Box>
        </Box>
        
      </Box>
    </GestioneNavbar>
  );
}
