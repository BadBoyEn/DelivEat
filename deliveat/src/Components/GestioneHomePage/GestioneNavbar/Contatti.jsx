import SitemarkIcon from '../../GestioneIcons/SistemarkIcon.jsx';
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

export default function Contatti () {
    return(
        <Box>
            <AppBar elevation={0} position="relative" color="primaryHome" className="appbar-custom">
                <Toolbar className="toolbar-custom">
                    <Box className="logo-home">
                        <SitemarkIcon/>
                    </Box>
                    <Box text="text" classname="links-box">             
                        <Button component={Link} to="/" variant='contained' color="secondary">Home</Button>
                        <Button component={Link} to="/home/chisiamo" variant='contained' color="secondary">Chi Siamo</Button>
                        <Button component={Link} to="/home/comefunziona" variant='contained' color="secondary">Come Funziona</Button>
                        <Button component={Link} to="/home/faq" variant='contained' color="secondary">FAQ</Button>
                        <Button component={Link} to="/home/infolegali" variant='contained' color="secondary">Info Legali</Button>
                    </Box>
                    <Box className="color-switch-home">
                        <ColorModeSelect/>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box maxWidth="md" sx={{ py: 6, mb: 5.9, px: 6, textAlign: "left" }}>
                <Typography variant="h4" gutterBottom color="secondary" fontWeight={800}>
                    Resta in contatto con noi
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="body1" paragraph>
                        Di seguito trovi i nostri contatti per ricevere assistenza in tempo reale
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Indirizzo email:</strong> info@deliveat.com
                    </Typography>
                    <Typography>
                        <strong>Telefono:</strong> +39 09 6787708
                    </Typography>
                    <Typography>
                        <strong>Sede legale:</strong> Via Milano 45, 20121 Milano (Mi), Italia
                    </Typography>
                </Box>
                <Box sx={{ mt: 5 }}>
                    <Typography variant="h6" gutterBottom>
                        Termini di utilizzo
                    </Typography>
                    <Typography variant="body2" paragraph>
                        L'accesso e l'utilizzo della piattaforma DelivEat implicano l'accettazione dei termini e condizioni di servizio
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Privacy
                    </Typography>
                    <Typography variant="body2">
                        DelivEat tratta i dati personali degli utenti nel rispetto del regolamento europeo 2016/679 (GDPR). Per maggiori dettagli consultare la nostra <a href="/privacy">Privacy Policy</a>
                    </Typography>
                </Box>
            </Box>
            <Box className="footer-custom">
                <Typography variant="body2">© DelivEat. All Rights Reserved.</Typography>
            </Box>
        </Box>
    );
}
