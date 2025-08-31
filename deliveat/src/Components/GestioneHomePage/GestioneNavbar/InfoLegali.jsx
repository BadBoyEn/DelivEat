import { Typography, Box } from '@mui/material';
import GestioneNavbar from './GestioneNavbar';
import './GestioneNavbar.css'; 

export default function InfoLegali() {
  return (
    <GestioneNavbar>
      <Box sx={{ py: 6, px: 6 }}>
        <Typography variant="h4" gutterBottom color="secondary" fontWeight={800}>
          Informazioni Legali
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Termini e condizioni d'uso
        </Typography>
        <Typography variant="body2" paragraph>
          L’uso della piattaforma DelivEat implica l’accettazione delle presenti condizioni generali
          di utilizzo. L’utente si impegna a fornire dati veritieri e a non utilizzare il servizio per scopi illeciti.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Limitazioni di responsabilità
        </Typography>
        <Typography variant="body2" paragraph>
          DelivEat non è responsabile di ritardi o inadempienze dovuti a cause di forza maggiore.
          Il servizio viene offerto "così com’è" senza garanzie implicite o esplicite.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Normativa sulla privacy
        </Typography>
        <Typography variant="body2" paragraph>
          Il trattamento dei dati personali avviene nel rispetto del Regolamento Europeo 2016/679 (GDPR).
          Per ulteriori dettagli si invita a consultare la sezione <a href="/privacy">Privacy Policy</a>.
        </Typography>
      </Box>
    </GestioneNavbar>
  );
}
