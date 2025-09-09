import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ColorModeSelect from "../../theme/ColorModeSelect";
import "./GestioneRider.css";

import { socket } from "../GestionePersonale/Socket.jsx";
import api from "../../api/client";
import RiderCard from "./RiderCard.jsx";

// -- COMMENTO -- Navbar minimale
function AppNavbar({ rider }) {
  return (
    <header className="gr-appbar">
      <div className="gr-appbar__left">
        <div className="gr-logo">{`${rider.nome} ${rider.cognome}`}</div>
      </div>
      <div className="gr-appbar__right">
        <ColorModeSelect />
      </div>
    </header>
  );
}

export default function GestioneRider() {
  const location = useLocation();
  const [rider, setRider] = useState({ nome: "", cognome: "", email: "", id: "" });
  const [orders, setOrders] = useState([]);

  // -- COMMENTO -- Normalizza sorgente rider: state.rider | state | localStorage
  useEffect(() => {
    let src = location?.state || null;
    if (src && src.rider) src = src.rider;

    if (!src) {
      try { src = JSON.parse(localStorage.getItem("Rider") || "null"); }
      catch { src = null; }
    }

    if (src) {
      const norm = {
        nome: src.nome ?? src.firstName ?? "",
        cognome: src.cognome ?? src.lastName ?? "",
        email: src.email ?? "",
        id: src.id ?? src._id ?? "",
      };
      setRider(norm);
      localStorage.setItem("Rider", JSON.stringify(norm));
    }
  }, [location?.state]);

  // -- COMMENTO -- Caricamento iniziale ordini 
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/orders"); // in_preparazione
        const mapped = (data || []).map((o) => ({
          token: o._id,
          customerName: o.customerName,
          items: o.items,
          status: o.status || "in_preparazione",
        }));
        setOrders(mapped);
      } catch (e) {
        console.error("❌ GET /orders fallita:", e);
      }
    })();
  }, []);

  // -- COMMENTO -- Socket: registra rider & listeners
  useEffect(() => {
    if (!rider.nome) return;

    // -- COMMENTO -- Handshake auth per il middleware del server
    socket.auth = { role: "rider", name: rider.nome, lastname: rider.cognome };
    socket.connect();

    const onAssigned = (payload) => {
      const order = {
        token: payload.token || payload._id,
        customerName: payload.customerName,
        items: payload.items || [],
        status: payload.status || "in_preparazione",
      };
      setOrders((prev) => {
        if (prev.some((o) => o.token === order.token)) return prev;
        return [order, ...prev];
      });
    };

    const onStatusUpdated = ({ token, status }) => {
      setOrders((prev) => prev.map((o) => (o.token === token ? { ...o, status } : o)));
    };

    socket.on("assigned_order", onAssigned);
    socket.on("order_status_updated", onStatusUpdated);

    return () => {
      socket.off("assigned_order", onAssigned);
      socket.off("order_status_updated", onStatusUpdated);
    };
  }, [rider]);

  // -- COMMENTO -- Azione: prendi in carico
  const handleTakeCharge = async (token, isTaken, isDelivered) => {
  try {
    if (!isTaken) {
      // Primo click → prendi in carico
      socket.emit("update_order_status", { token, status: "preso_in_carico" });
      setOrders((prev) =>
        prev.map((o) =>
          o.token === token ? { ...o, status: "preso_in_carico" } : o
        )
      );
    } else if (!isDelivered) {
      // Secondo click → consegna
      await api.put(`/orders/${token}/deliver`);
      setOrders((prev) =>
        prev.map((o) =>
          o.token === token ? { ...o, status: "consegnato" } : o
        )
      );

      // Rimuovi dopo 5s
      setTimeout(() => {
        setOrders((prev) => prev.filter((o) => o.token !== token));
      }, 5000);
    }
  } catch (err) {
    console.error("❌ Errore in handleTakeCharge:", err);
  }
};

  return (
    <div className="gr-page">
      <AppNavbar rider={rider} />

      <Box sx={{ p: 2 }}>
        {orders.length === 0 ? (
          <Typography sx={{ opacity: 0.7, mt: 4 }}>Nessun ordine disponibile</Typography>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", padding: "16px" }}>
            {orders.map((order) => (
              <RiderCard key={order.token} order={order} onTakeCharge={handleTakeCharge} />
            ))}
          </div>
        )}
      </Box>
    </div>
  );
}
