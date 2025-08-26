import { SitemarkIcon } from '../CustomIcons.jsx';
import ColorModeSelect from '../../../theme/ColorModeSelect.jsx';
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';

export default function InfoLegali() {
  return (
    <Box>
      {/* Header */}
      <AppBar position="static" color="primaryHome" className="appbar-custom">
      <Toolbar className="toolbar-custom">
        {/* LOGO */}
        <Box className="logo-home">
            <SitemarkIcon />
          </Box>
        {/* LINKS */}
        <Box text="text" className="links-box">
          <Button component={Link} to="/" variant='contained' color="secondary">Home</Button>
          <Button variant='contained' color="secondary">Chi siamo</Button>
          <Button component={Link} to="/home/faq" variant='contained' color="secondary">FAQ</Button>
          <Button variant='contained' color="secondary">Contatti</Button>
          <Button component={Link} to="/home/info" variant='contained' color="secondary">Info Legali</Button>
        </Box>
        <Box className="color-switch-home">
            <ColorModeSelect/>
        </Box>
      </Toolbar>
     </AppBar>
     <Box maxWidth="md" sx={{ py: 6, mb: 5.9, px: 6, textAlign: "left" }}>
     <Typography variant="h4" gutterBottom color="secondary" fontWeight={800}>
         Informazioni Legali
       </Typography>
       <Box sx={{ mt: 4 }}>
        <Typography variant="body1" paragraph>
          Ai sensi dell’art. 2250 del Codice Civile e delle normative vigenti, si riportano di seguito i dati identificativi della società:
        </Typography>

        <Typography variant="body2" paragraph>
          <strong>Denominazione sociale:</strong> DelivEat S.r.l.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Sede legale:</strong> Via Milano 45, 20121 Milano (Mi), Italia
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Partita IVA:</strong> 10356780965
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Codice Fiscale:</strong> 10455867504
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>REA:</strong> MI - 5768572
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Capitale sociale:</strong> € 25.000,00 i.v.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>PEC:</strong> deliveat@pec.it
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Email:</strong> info@deliveat.it
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Telefono:</strong> +39 09 6787708
        </Typography>
      </Box>

      {/* Altre sezioni utili */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" gutterBottom>
          Termini di utilizzo
        </Typography>
        <Typography variant="body2" paragraph>
          L’accesso e l’utilizzo della piattaforma DelivEat implicano l’accettazione dei Termini e Condizioni di Servizio.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Privacy
        </Typography>
        <Typography variant="body2" paragraph>
          DelivEat tratta i dati personali degli utenti nel rispetto del Regolamento Europeo 2016/679 (GDPR). Per maggiori dettagli consultare la nostra <a href="/privacy">Privacy Policy</a>.
        </Typography>
      </Box>
     </Box>
     <Box className="footer-custom">
        <Typography variant="body2">© 2025 DelivEat. Tutti i diritti riservati.</Typography>
      </Box>  
    </Box>
  );
}     