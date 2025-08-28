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
export default function ComeFunziona () {
    return(
        <Box>
            <AppBar elevation={0} position="relative" color="primaryHome" className="appbar-custom">
                <Toolbar className="toolbar-custom">
                    <Box className="logo-home">
                        <SitemarkIcon/>
                    </Box>
                    <Box test="text" className="links-box">
                        <Button component={Link} to="/" variant='contained' color="secondary">Home</Button>
                        <Button component={Link} to="/home/chisiamo" variant='contained' color="secondary">Chi Siamo</Button>
                        <Button component={Link} to="/home/faq" variant='contained' color="secondary">FAQ</Button>
                        <Button component={Link} to="/home/contatti" variant='contained' color="secondary">Contatti</Button>
                        <Button component={Link} to="/home/info" variant='contained' color="secondary">Info Legali</Button>
                    </Box>
                    <Box className="color-switch-home">
                        <ColorModeSelect/>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box maxWidth="md" sx={{ py: 6, mb: 5.9, px: 6, textAlign: "left" }} className="comefun-custom">
                <Typography variant="h4" gutterBottom color="secondary" fontWeight={800}>
                    Come funziona DelivEat
                </Typography>
                <Box sx={{ mt: 4 }}>
                     <Typography variant="body1" paragraph>
                        <strong>
                            Ordina come vuoi, dove vuoi. Noi cuciniamo e consegnamo.
                        </strong>
                     </Typography>
                     <Typography variant="body1" paragraph>
                        La nostra è una dark kitchen: niente sala, solo cucina e delivery. Questo ci permette di offrirti piatti di
                        qualità, preparati al momento e consegnati in tempi record.
                     </Typography>
                     <Typography variant="body1" paragraph>
                        <strong>Ecco come funziona: </strong>
                     </Typography>
                     <Typography variant="body1" paragraph>
                        1. <strong>Scegli dal menù</strong><br/>
                        Scopri le nostre specialità online: piatti freschi, gustosi e pensati per il delivery.
                     </Typography>
                     <Typography variant="body1" paragraph>
                        2. <strong>Ordina dal tuo dispositivo</strong><br/>
                        Ordina direttamente dal nostro sito o tramite le app di delivery partner
                     </Typography>
                     <Typography variant="body1" paragraph>
                        3. <strong>Noi cuciniamo al momento</strong><br/>
                        Ogni piatto è preparato espresso nella nostra cucina professionale
                     </Typography>
                     <Typography variant="body1" paragraph>
                        4. <strong>Tu ricevi, gusti e ripeti!</strong><br/>
                        La consegna è veloce, sicura e fatta per mantenere il gusto intatto.
                     </Typography>
                     <Typography variant="body1" paragraph>
                        <strong>Facile, veloce, buonissimo. Prova ora!</strong>
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
            <Box className="footer2-custom">
                <Typography variant="body2">© DelivEat. Tutti i diritti riservati.</Typography>
            </Box>
        </Box>
    );
}