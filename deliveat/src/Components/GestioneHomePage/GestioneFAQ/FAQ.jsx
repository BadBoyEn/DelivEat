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
  Grid
} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ() {
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
      question: "How do I contact support?",
      answer: "We offer support over email, and the best way to contact us is via the in-app help menu.",
    },
  ];
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
          <Button variant='contained' color="secondary">Info Legali</Button>
        </Box>
        <Box className="color-switch-home">
            <ColorModeSelect/>
        </Box>
      </Toolbar>
     </AppBar>
     <Container maxWidth="md" sx={{ mt: 5, ml: 12 }} >
       <Typography variant="h4" gutterBottom color="secondary" fontWeight={800}>
         Frequently asked questions
       </Typography>
        <Grid container spacing={2}>
        {faqs.map((faq, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>  
     </Container>
     <Box className="footer-custom">
        <Typography variant="body2">© 2025 DelivEat. Tutti i diritti riservati.</Typography>
      </Box>
    </Box>
  );
}