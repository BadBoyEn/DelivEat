// -- COMMENTO -- Home: "Sfoglia il menù" apre overlay in-page (no route)
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GestioneNavbar from './GestioneNavbar/GestioneNavbar';
import './GestioneNavbar/GestioneNavbar.css';
import './GestioneHomePage.css';
import DelivEat from "../../Images/DelivEat_logo2.png";
import MenuGallery from './MenuGallery';

export default function Home() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // -- COMMENTO -- stato overlay

  return (
    <GestioneNavbar>
      <Box className="home-hero">
        <Box className="hero-left">
          <img src={DelivEat} alt="DelivEat" width={280} height={222} />

          <Typography variant="h5" className="catchphrase">
            Ordina in pochi click!
          </Typography>

          <Typography variant="body2" className="subtitle">
            Scopri la comodità di ricevere il tuo cibo preferito direttamente a casa.
          </Typography>

          <Box className="home-cta">
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => navigate('/home/ordina')}
            >
              Ordina ora
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => setShowMenu(true)}     // -- COMMENTO -- apre overlay
              className="open-menu-btn"
            >
              Sfoglia il menù
            </Button>
          </Box>
        </Box>
      </Box>

      {/* -- COMMENTO -- Overlay MenuGallery in-page */}
      {showMenu && <MenuGallery onClose={() => setShowMenu(false)} />}
    </GestioneNavbar>
  );
}
