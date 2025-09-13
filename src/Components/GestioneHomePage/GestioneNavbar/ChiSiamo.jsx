import { Typography, Box } from '@mui/material';
import GestioneNavbar from './GestioneNavbar';
import cibo from '../../../Images/pietanze_2-750x500.jpg';
import rider from '../../../Images/fattorino.jpg'
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
      <Box sx={{ display: 'flex', flexDirection: "row", gap: "20px" }}>
        <Box>
          <img src={cibo} alt="cibo" style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: 8,
        }}
          />
        </Box>
        <Box>
          <img src={rider} alt="rider" style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: 8,
        }}
          />
        </Box>
      </Box>
    </GestioneNavbar>
  );
}
