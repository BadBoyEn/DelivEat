import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
import SitemarkIcon from '../../GestioneIcons/SistemarkIcon.jsx';
import ColorModeSelect from '../../../theme/ColorModeSelect.jsx';

export default function GestioneNavbar({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const pages = [
    { label: "Home", to: "/" },
    { label: "Chi Siamo", to: "/home/chisiamo" },
    { label: "Come Funziona", to: "/home/comefunziona" },
    { label: "FAQ", to: "/home/faq" },
    { label: "Contatti", to: "/home/contatti" },
    { label: "Info Legali", to: "/home/infolegali" },
  ];

  return (
    <Box className="page">
      <AppBar elevation={0} position="relative" color="primaryHome" className="appbar-custom">
        <Toolbar className="toolbar-custom">
          {/* -- COMMENTO -- Switch tema fissato a SINISTRA */}
          <ColorModeSelect className="color-switch-home" />

          {/* -- COMMENTO -- Menu desktop al centro */}
          <Box className="links-box desktop-menu">
            {pages.map((page) => (
              <Button
                key={page.to}
                component={Link}
                to={page.to}
                variant="contained"
                color="secondary"
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* -- COMMENTO -- Tre pallini spinti a DESTRA (solo mobile) */}
          <Box className="mobile-menu right-menu">
            <IconButton
              aria-label="menu"
              aria-controls={open ? 'nav-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="nav-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.to}
                  component={Link}
                  to={page.to}
                  onClick={handleMenuClose}
                >
                  {page.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenuto pagina */}
      <Box className="page-main">{children}</Box>

      {/* Footer */}
      <Box className="footer-custom">
        <Typography variant="body2">© DelivEat. All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
}