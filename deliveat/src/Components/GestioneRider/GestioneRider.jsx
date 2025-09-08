import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../GestionePersonale/Socket.jsx";
import { Box, Typography, Button } from "@mui/material";

import ColorModeSelect from "../../theme/ColorModeSelect";
import "./GestioneRider.css";

// Navbar del rider
function AppNavbar({ rider }) {
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

// Card singolo ordine
function RiderCard({ order }) {
  return (
    <Box className="order-card">
      <Typography className="order-title" variant="subtitle1">
        Ordine - {order.token || "N/A"}
      </Typography>
      <Typography>
        <strong>Cliente:</strong> {order.nome} {order.cognome}
      </Typography>
      <Typography>
        <strong>Telefono:</strong> {order.telefono}
      </Typography>
      <Typography>
        <strong>Piatti:</strong> {order.piatti?.join(", ")}
      </Typography>
      <Typography>
        <strong>Data:</strong> {order.data}
      </Typography>
      <Typography>
        <strong>Ora:</strong> {order.ora}
      </Typography>
      <Box className="order-actions" sx={{ mt: 1 }}>
        <Button variant="contained" color="secondary" size="small">
          Prendi in carico
        </Button>
      </Box>
    </Box>
  );
}

// Componente principale
export default function GestioneRider() {
  const location = useLocation();
  const [rider, setRider] = useState({ nome: "", cognome: "", email: "" });
  const [orders, setOrders] = useState([]);

  // Recupera rider da location o localStorage
  useEffect(() => {
    if (location.state) {
      setRider(location.state);
      localStorage.setItem("Rider", JSON.stringify(location.state));
    } else {
      const savedRider = localStorage.getItem("Rider");
      if (savedRider) setRider(JSON.parse(savedRider));
    }
  }, [location.state]);

  // Fetch ordini iniziali dal backend (autenticati con token)
  useEffect(() => {
    if (!rider.nome) return;

    const token = localStorage.getItem("token"); // JWT salvato al login
    if (!token) return;

    fetch("http://localhost:5000/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore autenticazione");
        return res.json();
      })
      .then((data) => {
        setOrders(data.orders || []);
      })
      .catch((err) => console.error("Fetch ordini fallito:", err));
  }, [rider]);

  // Gestione socket
  useEffect(() => {
    if (!rider.nome) return;

    const token = localStorage.getItem("token");
    socket.auth = { name: rider.nome, lastName: rider.cognome, token };
    socket.connect();

    socket.emit("riderConnected", { nome: rider.nome, cognome: rider.cognome });

    socket.on("assigned_order", (order) => {
      setOrders((prev) => [...prev, order]);
    });

    socket.on("order_status_updated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o.token === updatedOrder.token ? updatedOrder : o))
      );
    });

    return () => {
      socket.off("assigned_order");
      socket.off("order_status_updated");
    };
  }, [rider]);

  return (
    <div className="gr-root">
      <AppNavbar rider={rider} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          padding: "16px",
        }}
      >
        {orders.map((order) => (
          <RiderCard key={order.token} order={order} />
        ))}
      </div>
    </div>
  );
}