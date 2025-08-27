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
export default function ChiSiamo () {
    return(
    <Box>
        <AppBar elevation={0} position="relative" color="primaryHome" className="appbar-custom">
            <Toolbar className="toolbar-custom">
                <Box className="logo-home">
                    <SitemarkIcon/>
                </Box>
                <Box test="text" className="links-box">
                    <Button component={Link} to="/" variant='contained' color="secondary">Home</Button>
                    <Button component={Link} to="/home/comefunziona" variant='contained' color="secondary">Come Funziona</Button>
                    <Button component={Link} to="/home/faq" variant='contained' color="secondary">FAQ</Button>
                    <Button component={Link} to="/home/contatti" variant='contained' color="secondary">Contatti</Button>
                    <Button component={Link} to="/home/info" variant='contained' color="secondary">Info Legali</Button>
                </Box>
                <Box className="color-switch-home">
                    <ColorModeSelect/>
                </Box>
            </Toolbar>
        </AppBar>
        <Box maxWidth="md" sx={{ py: 6, mb: 5.9, px: 6, textAlign: "left" }}>
            <Typography variant="h4" gutterBottom color="secondary" fontWeight={800}>
                Chi siamo
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Typography variant="body1" paragraph>
                    DelivEat nasce con un obiettivo semplice: portare la qualità del ristorante direttamente a casa tua, con efficienza, cura e 
                    varieta. Siamo una dark kitchen moderna, progettata per offrire un'esperienza gastronomica completa esclusivamente tramite
                    delivery.
                </Typography>
                <Typography variant="body1" paragraph>
                    Non ci limitiamo a un solo tipo di cucina: il nostro team di chef specializzati lavora ogni giorno per creare piatti 
                    ispirati alle tradizioni culinarie di tutto il mondo, con un'attenzione costante alla freschezza delle materie prime
                    e alla qualità del servizio.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Velocita, sicurezza e gusto</strong> sono i pilastri su cui costruiamo ogni ordine. Perchè crediamo che mangiare
                    bene debba essere semplice, anche quando si sceglie la comodità della consegna
                </Typography>
                <Typography variant="body1" paragraph>
                    Scegli <strong>DelivEat</strong> : il meglio della cucina, ovunque tu sia.
                </Typography>
            </Box>
            <Box sx={{ mt: 5 }}>
                <Typography variant="h6" gutterbottom>
                    Termini di utilizzo
                </Typography>
                <Typography variant="body2" paragraph>
                    L'accesso e l'utilizzo della piattaforma DelivEat implicano l'accettazione dei termini e condizioni di servizio
                </Typography>
                <Typography variant="h6" gutterbottom>
                    Privacy
                </Typography>
                <Typography variant="body2" paragraph>
                    DelivEat tratta i dati personali degli utenti nel rispetto del regolamento europeo 2016/679 (GDPR). Per maggiori dettagli consultare la nostra <a href="/privacy">Privacy Policy</a>
                </Typography>
            </Box>
        </Box>
        <Box className="footer-custom">
            <Typography variant="body2">© DelivEat. Tutti i diritti riservati.</Typography>
        </Box>
    </Box>
    );
}