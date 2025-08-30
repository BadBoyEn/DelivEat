import logo from '../../../Images/D2.png';
import socketIOClient from 'socket.io-client';
import React, {useState } from 'react';
import OrdinaStepper from './OrdinaStepper.jsx';
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button  
} from '@mui/material';

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B00", // arancione personalizzato
    },
    secondary: {
      main: "#ccc", // esempio grigio
    },
  },
});

export default function Ordina() {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  const socket = socketIOClient('http://localhost: 3000'); //Creo la connessione Socket.IO al server
  const inviaOrdine = (ordineData) => {
    socket.emit('nuovo_ordine', ordineData);
    //Resto in ascolto della risposta
    socket.on('order_token', (data) => {
      setToken(data.token);
    });
    //Resto in ascolto degli aggiornamenti sullo stato dell'ordine
    socket.on('order_status', (data) => {
      setStatus(data.status);
    });
  };
  return (
    <Box className="page-container">
      <Container maxWidth="md" className="box-ordina content">
        <img src={logo} alt="Logo-body" className="logo-ordina" />
        <Typography variant="h4" className="text-ordina">
          ORDINAZIONE DA ASPORTO
        </Typography>
        <ThemeProvider theme={theme}>
          <OrdinaStepper inviaOrdine ={inviaOrdine} />
        </ThemeProvider>
      </Container>
      <Box className="footer-custom">
        <Typography variant="body2">
          © 2025 DelivEat. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  )  
}