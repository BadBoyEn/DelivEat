import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { SitemarkIcon } from '../CustomIcons.jsx';
import ColorModeSelect from '../../../theme/ColorModeSelect.jsx';
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  TextField,
  InputAdornment
} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ() {
  const [search, setSearch] = useState("");
  const faqs = [
    {
      question: "How do I upgrade / downgrade my workspace plan?",
      answer: "Go to your account settings and choose the plan you want.",
    },
    {
      question: "Can I add other information be added to an invoice?",
      answer: "Yes, you can customize invoice fields in the billing settings.",
    },
    {
      question: "When should I use a new table vs. a view?",
      answer: "Use a new table when the data is different, and a view for filtering/sorting.",
    },
    {
      question: "How can I transfer data from one base to another?",
      answer: "You can export data to CSV and then re-import it into the new base.",
    },
    {
      question: "How do I change my account email address?",
      answer: "You can change your email at airtable.com/account from a laptop or desktop.",
    },
    {
      question: "How does billing work?",
      answer: "Billing is handled per workspace and you’ll be charged monthly or yearly.",
    },
    {
      question: "Can I share an individual app?",
      answer: "Yes, apps can be shared separately from bases.",
    },
    {
      question: "Can I export a list of all collaborators?",
      answer: "Yes, you can export collaborators from the workspace settings.",
    },
    {
      question: "Can invoices be sent to other collaborators?",
      answer: "Yes, invoice emails can be redirected to billing contacts.",
    },
    {
      question: "Come posso contattare l'assistenza?",
      answer: "Se hai bisogno di aiuto, clicca sul pulsante 'Contatti' nella barra di navigazione e scrivici: ti risponderemo al più presto.",
    },
  ];
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) || faq.answer.toLowerCase().includes(search.toLowerCase())
  );
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
          <Button component={Link} to="/home/faq" variant='contained' color="secondary">FAQ</Button>
          <Button variant='contained' color="secondary">Contatti</Button>
          <Button component={Link} to="/home/info" variant='contained' color="secondary">Info Legali</Button>
        </Box>
        <Box className="color-switch-home">
            <ColorModeSelect/>
        </Box>
      </Toolbar>
     </AppBar>
     <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
       <Typography variant="h4" gutterBottom color="secondary" fontWeight={800} align='center'>
         Frequently asked questions
       </Typography>
       <TextField
         fullWidth
         variant="outlined"
         placeholder="Cerca domande o risposte..."
         value={search}
         onChange={(e) =>
         setSearch(e.target.value)}
           sx={{ mb: 3, backgroundColor: "rgba(0,0,0,0.04)", borderRadius: 2, "& .MuiOutlinedInput-root" : {"& fieldset": { border: "none", }} }}
           InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon color="action" />
      </InputAdornment>
    ),
  }}
         />
        <Grid container spacing={3} justifyContent={"center"} >
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <Grid item xs={12} sm={12} key={index}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "#FF6B00", fontWeight: "bold" }}>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 3 }}>
            No results found.
          </Typography>
        )}
      </Grid>
    </Container>
    <Box className="footer-custom">
        <Typography variant="body2">© 2025 DelivEat. Tutti i diritti riservati.</Typography>
      </Box>
   </Box> 
  );
}