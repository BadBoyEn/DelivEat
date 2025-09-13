import { Typography, Box } from '@mui/material';
import GestioneNavbar from './GestioneNavbar';
import './GestioneNavbar.css'; 

export default function Contatti() {
  return (
    <GestioneNavbar>
      <Box sx={{ py: 6, px: 6 }}>
        <Typography variant="h4" gutterBottom color="secondary" fontWeight={800}>
          Resta in contatto con noi
        </Typography>

        <Typography variant="body1" paragraph>
          Di seguito trovi i nostri contatti per ricevere assistenza in tempo reale
        </Typography>
        <Typography variant="body1" paragraph><strong>Email:</strong> info@deliveat.com</Typography>
        <Typography variant="body1" paragraph><strong>Telefono:</strong> +39 09 6787708</Typography>
        <Typography variant="body1"><strong>Sede legale:</strong> Via Milano 45, 20121 Milano (Mi), Italia</Typography>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" gutterBottom>Termini di utilizzo</Typography>
          <Typography variant="body2" paragraph>
            L'accesso e l'utilizzo della piattaforma DelivEat implicano l'accettazione dei termini e condizioni di servizio.
          </Typography>

          <Typography variant="h6" gutterBottom>Privacy</Typography>
          <Typography variant="body2">
            DelivEat tratta i dati personali degli utenti nel rispetto del regolamento europeo 2016/679 (GDPR).
            Per maggiori dettagli consultare la nostra <a href="/privacy">Privacy Policy</a>.
          </Typography>
        </Box>
      </Box>
    </GestioneNavbar>
  );
}
