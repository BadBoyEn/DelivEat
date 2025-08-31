import { Typography, Box } from '@mui/material';
import GestioneNavbar from './GestioneNavbar';
import './GestioneNavbar.css'; 

export default function ChiSiamo() {
  return (
    <GestioneNavbar>
      <Box sx={{ py: 6, px: 6 }}>
        <Typography variant="h4" gutterBottom color="secondary" fontWeight={800}>
          Chi siamo
        </Typography>
        <Typography variant="body1" paragraph>
          DelivEat è una dark kitchen innovativa, nata per offrire un servizio di ristorazione veloce,
          di qualità e accessibile a tutti. Il nostro team lavora ogni giorno per garantire esperienze culinarie uniche.
        </Typography>
      </Box>
    </GestioneNavbar>
  );
}
