// -- COMMENTO -- Pagina Ordina: colori e card gestiti SOLO da GestioneOrdina.css
import React from 'react';
import { Box, Typography } from '@mui/material';

import AppTheme from '../../../theme/AppTheme.jsx';   // -- COMMENTO -- deve restare!!
import './GestioneOrdina.css';                         // -- COMMENTO -- import DOPO AppTheme

import logo from '../../../Images/D2.png';
import OrdinaStepper from './OrdinaStepper.jsx';

export default function Ordina(){
  return (
    <AppTheme>
      <Box className="page-container ordina-scope">
        <Box className="box-ordina">
          {/* -- COMMENTO -- Logo + titolo */}
          <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
            <img src={logo} alt="DelivEat" style={{ width:220, height:'auto', opacity:.9 }} />
            <Typography variant="h4" className="title-ordina">
              ORDINAZIONE DA ASPORTO
            </Typography>
          </Box>

          {/* -- COMMENTO -- unica CARD bianca: lo stepper */}
          <Box className="stepper-ordina" sx={{ width:'100%', maxWidth:700 }}>
            <OrdinaStepper />
          </Box>
        </Box>

        {/* -- COMMENTO -- footer (rimane come impostazioni attuali) */}
        <Box className="footer-custom">
          <Typography variant="body2">© 2025 DelivEat. All Rights Reserved.</Typography>
        </Box>
      </Box>
    </AppTheme>
  );
}
