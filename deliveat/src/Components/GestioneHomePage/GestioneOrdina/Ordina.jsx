import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

import './GestioneOrdina.css';

import AppTheme from '../../../theme/AppTheme.jsx';                   
import logo from '../../../Images/D2.png';
import OrdinaStepper from './OrdinaStepper.jsx';

export default function Ordina() {

  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    // -- COMMENTO -- connessione Socket.IO al BACKEND (porta 5000)
    socketRef.current = io('http://localhost:5000', { withCredentials: true });

    // -- COMMENTO -- listener standard per eventuali notifiche globali
    socketRef.current.on('order_token', (data) => setToken(data?.token || ''));
    socketRef.current.on('order_status', (data) => setStatus(data?.status || ''));

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const inviaOrdineViaSocket = (ordineData) => {
    socketRef.current?.emit('new_order', ordineData);
  };

  return (
    <AppTheme>
      <Box className="page-container">
        <Container maxWidth="md" className="box-ordina content">
          <img src={logo} alt="Logo-body" className="logo-ordina" />
          <Typography variant="h4" className="text-ordina">
            ORDINAZIONE DA ASPORTO
          </Typography>
          <OrdinaStepper/>
        </Container>

        <Box className="footer-custom">
          <Typography variant="body2">
            © 2025 DelivEat. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </AppTheme>
  );
}
