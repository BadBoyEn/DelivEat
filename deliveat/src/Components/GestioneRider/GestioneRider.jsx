import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Button } from '@mui/material';

import ColorModeSelect from '../../theme/ColorModeSelect';
import './GestioneRider.css';

function AppNavbar() {
  const location = useLocation();
  const [rider, setRider] = useState({ nome: '', cognome: '', email: '' });

  useEffect(() => {
    if (location.state) {
      setRider(location.state);
    } else {
      // Fallback: se vuoi usare localStorage
      const savedRider = localStorage.getItem("Rider");
      if (savedRider)
        setRider(JSON.parse(savedRider));
    }
  }, [location.state]);

  return (
    <header className="gr-appbar">
      <div className="gr-appbar__left">
        <div className="gr-logo">
          {`${rider.nome} ${rider.cognome}`}
        </div>
      </div>
      <div className="gr-appbar__right">
        <ColorModeSelect />
      </div>
    </header>
  );
}

function RiderCard({ order }) {
  return (
    <Box className="order-card">
      <Typography className="order-title" variant="subtitle1">
        Ordine - {order.id || "N/A"}
      </Typography>

      <Typography><strong>Cliente:</strong> {order.nome} {order.cognome}</Typography>
      <Typography><strong>Telefono:</strong> {order.telefono}</Typography>
      <Typography><strong>Piatti:</strong> {order.piatti?.join(", ")}</Typography>
      <Typography><strong>Data:</strong> {order.data}</Typography>
      <Typography><strong>Ora:</strong> {order.ora}</Typography>

      <Box className="order-actions" sx={{ mt: 1 }}>
        <Button variant="contained" color="secondary" size="small">
          Prendi in carico
        </Button>
      </Box>
    </Box>
  );
}

export default function GestioneRider() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulazione ordini
    setOrders([
      { id: "001", nome: "Mario", cognome: "Rossi", telefono: "3331234567", piatti: ["Carbonara", "Tiramisù"], data: "2025-08-30", ora: "20:30" },
      { id: "002", nome: "Giulia", cognome: "Verdi", telefono: "3339876543", piatti: ["Cotoletta", "Sorbetto"], data: "2025-08-30", ora: "21:00" }
    ]);
  }, []);

  return (
    <div className="gr-root">
      <AppNavbar />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", padding: "16px" }}>
        {orders.map((order) => (
          <RiderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}