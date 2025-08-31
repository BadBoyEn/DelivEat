import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GestioneNavbar from './GestioneNavbar';
import './GestioneNavbar.css'; 

export default function FAQ() {
  return (
    <GestioneNavbar>
      <Box sx={{ py: 6, px: 6 }}>
        <Typography variant="h4" gutterBottom color="secondary" fontWeight={800}>
          Domande frequenti
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={700}>Come faccio a effettuare un ordine?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Vai su <strong>Ordina</strong>, scegli i piatti dal menù, inserisci indirizzo e metodo di pagamento e conferma.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={700}>In quali orari consegnate?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Consegniamo tutti i giorni dalle 11:30 alle 14:30 e dalle 18:30 alle 22:30.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={700}>Posso modificare o annullare un ordine?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Finché l’ordine non è stato preso in carico dalla cucina puoi modificarlo o annullarlo dalla sezione
              <strong> I miei ordini</strong>.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={700}>Come contatto l'assistenza?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Scrivici a <strong>info@deliveat.com</strong> oppure visita la pagina <strong>Contatti</strong>.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </GestioneNavbar>
  );
}
