import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ColorModeSelect from "../../theme/ColorModeSelect";
import "./GestioneRider.css";

import { socket } from "../GestionePersonale/Socket.jsx";
import api from "../../api/client";
import RiderCard from "./RiderCard.jsx";

function AppNavbar({ rider }) {
  return (
    <header className="gr-appbar">
      <div className="gr-appbar__left">
        <div className="gr-logo">{`${rider?.nome ?? ''} ${rider?.cognome ?? ''}`.trim() || 'Rider'}</div>
      </div>
      <div className="gr-appbar__right">
        <ColorModeSelect />
      </div>
    </header>
  );
}

export default function GestioneRider() {
  const location = useLocation();
  const [rider, setRider] = useState(location.state?.rider || null);

  useEffect(() => {
    socket?.connect();
    return () => socket?.disconnect();
  }, []);

  return (
    <Box className="gr-root">
      <AppNavbar rider={rider} />
      <Box className="gr-content">
        <Typography variant="h5" sx={{ mb: 2 }}>Area Rider</Typography>
        <RiderCard />
      </Box>
    </Box>
  );
}
