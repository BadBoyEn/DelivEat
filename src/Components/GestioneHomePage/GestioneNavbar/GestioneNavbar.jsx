import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
import SistemarkIcon from '../../GestioneIcons/SistemarkIcon.jsx';
import ColorModeSelect from '../../../theme/ColorModeSelect.jsx';

export default function GestioneNavbar({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const pages = [
    { label: "Home", to: "/" },
    { label: "Chi siamo", to: "/home/chisiamo" },
    { label: "Come funziona", to: "/home/comefunziona" },
    { label: "Contatti", to: "/home/contatti" },
    { label: "FAQ", to: "/home/faq" },
    { label: "Info legali", to: "/home/infolegali" }
  ];

  return (
    <Box className="layout">
      <AppBar position="static" color="transparent" elevation={0} className="navbar">
        <Toolbar className="toolbar">
          <Box className="left">
            <SistemarkIcon className="logo" />
          </Box>

          <Box className="center">
            {pages.map(p => (
              <Button key={p.to} component={Link} to={p.to} className="nav-btn">
                {p.label}
              </Button>
            ))}
          </Box>

          <Box className="right">
            <ColorModeSelect />
            <IconButton aria-label="menu" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem component={Link} to="/login" onClick={handleMenuClose}>Acced</MenuItem>
              <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>Registrati</MenuItem>
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