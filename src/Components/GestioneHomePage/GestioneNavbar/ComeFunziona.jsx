import { Typography, Box } from '@mui/material';
import GestioneNavbar from './GestioneNavbar';
import './GestioneNavbar.css'; 

export default function ComeFunziona() {
  return (
    <GestioneNavbar>
      <Box sx={{ py: 6, px: 6 }}>
        <Typography variant="h4" gutterBottom color="secondary" fontWeight={800}>
          Come funziona
        </Typography>
        <Typography variant="body1" paragraph>
          Il funzionamento di DelivEat è semplice: scegli i tuoi piatti preferiti dal menu, conferma l’ordine
          e un rider dedicato te lo consegnerà direttamente a casa tua nel minor tempo possibile.
        </Typography>
      </Box>
    </GestioneNavbar>
  );
}
