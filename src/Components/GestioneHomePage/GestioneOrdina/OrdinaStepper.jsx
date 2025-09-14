import { useState, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  TextField,
  Typography,
  Tooltip,
} from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { io } from "socket.io-client";
const socket = io("http://localhost:5000", { 
  transports: ["websocket", "polling"], autoConnect: false
 });

import carbonara from '../../../Images/carbonara.jpg';
import panna from '../../../Images/panna.jpg';
import pesto from '../../../Images/pesto.jpg';
import cotoletta from '../../../Images/cotoletta.jpg';
import frittura from '../../../Images/frittura.jpg';
import insalata from '../../../Images/insalata.jpg';
import ciocco from '../../../Images/ciocco.jpg';
import tiramisu from '../../../Images/tiramisu.jpg';
import sorbetto from '../../../Images/sorbetto.jpg';

import './GestioneOrdina.css';


function OrangeStepIcon({ active, completed, icon }) {
  return (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: completed || active ? '#fe7f0d' : '#e0e0e0',
        color: 'var(--on-accent)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {completed ? '✓' : icon}
    </div>
  );
}

const steps = ['Contatti', 'Ordinazione', 'Conferma'];

export default function OrdinaStepper() {

  const [error, setError] = useState({
    nome: false,
    cognome: false,
    telefono: false,
    indirizzo: false,
  });

  const [errorStep2, setErrorStep2] = useState({
    data: false,
    ora: false,
  });

  const [activeStep, setActiveStep] = useState(0);

  // aggiungi questi stati all'inizio del componente
  const [orderStatus, setOrderStatus] = useState(null); // null finché non confermi

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [currentOrderToken, setCurrentOrderToken] = useState(null);

// funzione per conferma ordine
  const handleConfirm = async () => {
  try {
    // 1. Validazioni preliminari
    const nomeCompleto = `${formData.nome || ""} ${formData.cognome || ""}`.trim();
    if (!nomeCompleto) return alert("Inserisci nome e cognome");
    if (!formData.piatti || !Array.isArray(formData.piatti)  || formData.piatti.length === 0)
      return alert("Seleziona almeno un piatto");
    if (!formData.indirizzo || formData.indirizzo.trim() === "")
      return alert("Inserisci un indirizzo");
    if (!formData.telefono || !/^\d+$/.test(formData.telefono))
      return alert("Inserisci un numero di telefono valido (solo cifre)");
    if (!formData.data) return alert("Seleziona una data");
    if (!formData.ora) return alert("Seleziona un orario");

    const payload = {
      customerName: nomeCompleto,
      items: formData.piatti,
      address: formData.indirizzo,
      phone: formData.telefono,
      date: formData.data,
      time: formData.ora,
    };

    // 2. Salva ordine su DB tramite API
    const response = await axios.post('/api/orders', payload);

    // 3. Invia ordine in tempo reale ai rider con socket
    socket.emit('new_order', response.data);

    // 4. Aggiorna stato locale
    setOrderPlaced(true);
    setOrderStatus('In elaborazione');
    setCurrentOrderToken(response.data._id); // token/id dal DB

  } catch (err) {
    console.error("Errore nell'invio dell'ordine:", err.response?.data || err.message);
    alert("Errore nell'invio dell'ordine, riprova.");
  }
};

// funzione per annullare ordine
const handleCancelOrder = () => {
  if (orderStatus === 'Consegnato')
    return
  setOrderStatus(null);
  setOrderPlaced(false);
  setActiveStep(0); // opzionale: reset dello stepper
};

useEffect(() => {
  // Assicuriamoci che il socket sia connesso
  if (!socket.connected) socket.connect();

  socket.on("connect", () => console.log("📡 Connesso al server:", socket.id));

  const onStatusUpdated = ({ token, status }) => {
    if (!currentOrderToken) return;
    if (token === currentOrderToken) {
      setOrderStatus(status);
    }
  };

  socket.on("order_status_updated", onStatusUpdated);

  return () => {
    socket.off("order_status_updated", onStatusUpdated);
  };
}, [currentOrderToken]);

  // -- COMMENTO -- Stato dei campi del form
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    indirizzo: '',
    piatti: [],
    data: dayjs(),
    ora: dayjs(),
  });

  const piattiDisponibili = [
    { img: carbonara, title: 'Spaghetti alla carbonara' },
    { img: panna, title: 'Penne alla panna e speck' },
    { img: pesto, title: 'Fusilli al pesto' },
    { img: cotoletta, title: 'Cotoletta milanese' },
    { img: frittura, title: 'Frittura di pesce' },
    { img: insalata, title: 'Insalata' },
    { img: ciocco, title: 'Soufflè al cioccolato' },
    { img: tiramisu, title: 'Tiramisù' },
    { img: sorbetto, title: 'Sorbetto' },
  ];

  const categorie = [
    { titolo: 'Primi',   piatti: piattiDisponibili.slice(0, 3) },
    { titolo: 'Secondi', piatti: piattiDisponibili.slice(3, 6) },
    { titolo: 'Dolci',   piatti: piattiDisponibili.slice(6, 9) },
  ];

  const togglePiatto = (piattoTitle) => {
    setFormData((prev) => {
      const alreadySelected = prev.piatti.includes(piattoTitle);
      const newPiatti = alreadySelected
        ? prev.piatti.filter((p) => p !== piattoTitle)
        : [...prev.piatti, piattoTitle];
      return { ...prev, piatti: newPiatti };
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (activeStep === 0) {
      const newError = {
        nome: !formData.nome,
        cognome: !formData.cognome,
        telefono: !formData.telefono,
        indirizzo: !formData.indirizzo,
      };
      setError(newError);
      if (Object.values(newError).some(Boolean)) return;
      
    if (activeStep === 1) {
      if (formData.piatti.length === 0) {
        alert("Selezionare almeno un piatto");
        return;
      }

    }

    }

    if (activeStep === 1) {
      const isDataInvalid = !formData.data || dayjs(formData.data).isBefore(dayjs(), 'day');
      const isOraInvalid =
        !formData.ora ||
        dayjs(formData.data)
          .hour(formData.ora.hour())
          .minute(formData.ora.minute())
          .isBefore(dayjs());

      const newErrorStep2 = { data: isDataInvalid, ora: isOraInvalid };
      setErrorStep2(newErrorStep2);
      if (Object.values(newErrorStep2).some(Boolean)) return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          backgroundColor: 'var(--surface)',
          color: 'var(--text)',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: activeStep === 2 ? 400 : 500,
          minWidth: activeStep === 2 ? 300 : 'auto',
          mx: 'auto',
          border: '1px solid #dadada !important',
          borderRadius: 2,
          p: 4,
          boxShadow: 'var(--elevation-2)',
          mt: 6,
        }}
      >
        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel>
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel
        StepIconComponent={OrangeStepIcon}
        sx={{
          '& .MuiStepLabel-label': {
            color:
              label === 'Contatti'
                ? '#0d1018 !important'
                : activeStep >= steps.indexOf(label)
                ? '#0d1018'
                : '#aaa',
          },
        }}
      >
        {label}
      </StepLabel>
    </Step>
  ))}
</Stepper>

        <Box sx={{ mt: 2, width: '100%', mx: 'auto' }}>
          {activeStep === 0 && (
            <Box>
              <TextField
                fullWidth
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
                onBlur={() => setError((prev) => ({ ...prev, nome: !formData.nome }))}
                error={error.nome}
                helperText={error.nome ? 'Campo obbligatorio' : ''}
                sx={{
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: error.nome ? 'var(--danger)' : 'var(--border-weak)' },
                  },
                }}
              />
              <TextField
                fullWidth
                name="cognome"
                placeholder="Cognome"
                value={formData.cognome}
                onChange={handleChange}
                onBlur={() => setError((prev) => ({ ...prev, cognome: !formData.cognome }))}
                error={error.cognome}
                helperText={error.cognome ? 'Campo obbligatorio' : ''}
                sx={{
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: error.cognome ? 'var(--danger)' : 'var(--border-weak)' },
                  },
                }}
              />
              <TextField
                fullWidth
                name="telefono"
                placeholder="Numero di telefono"
                value={formData.telefono}
                onChange={handleChange}
                onBlur={() => setError((prev) => ({ ...prev, telefono: !formData.telefono }))}
                error={error.telefono}
                helperText={error.telefono ? 'Campo obbligatorio' : ''}
                sx={{
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: error.telefono ? 'var(--danger)' : 'var(--border-weak)' },
                  },
                }}
              />
              <TextField
                fullWidth
                name="indirizzo"
                placeholder="Indirizzo di consegna"
                value={formData.indirizzo}
                onChange={handleChange}
                onBlur={() => setError((prev) => ({ ...prev, indirizzo: !formData.indirizzo }))}
                error={error.indirizzo}
                helperText={error.indirizzo ? 'Campo obbligatorio' : ''}
                sx={{
                  mt: 2,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: error.indirizzo ? 'var(--danger)' : 'var(--border-weak)' },
                  },
                }}
              />
            </Box>
          )}

          {activeStep === 1 && (
            <>
              {categorie.map((cat) => (
                <Box key={cat.titolo} sx={{ mb: 2, color: "#0d1018" }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {cat.titolo}
                  </Typography>
                  <ImageList sx={{ mt: 0.5 }} cols={3}>
                    {cat.piatti.map((piatto) => (
                      <ImageListItem
                        key={piatto.img}
                        onClick={() => togglePiatto(piatto.title)}
                        sx={{
                          border: formData.piatti.includes(piatto.title)
                            ? '3px solid var(--accent)'
                            : '1px solid #dadada',
                          borderRadius: 2,
                          p: 1,
                          textAlign: 'center',
                          cursor: 'pointer',
                          '&:hover': { boxShadow: 'var(--elevation-2)' },
                        }}
                      >
                        <Tooltip title={piatto.title} arrow>
                          <img
                            srcSet={`${piatto.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${piatto.img}?w=164&h=164&fit=crop&auto=format`}
                            alt={piatto.title}
                            loading="lazy"
                            style={{
                              width: '100%',
                              aspectRatio: '1 / 1',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                        </Tooltip>
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
              ))}

              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <DatePicker
                  label="Data"
                  value={formData.data}
                  onChange={(newValue) => setFormData({ ...formData, data: newValue })}
                  onBlur={() => {
                    const isEmpty = !formData.data;
                    const isPast = formData.data && dayjs(formData.data).isBefore(dayjs(), 'day');
                    setErrorStep2((prev) => ({ ...prev, data: isEmpty || isPast }));
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: errorStep2.data,
                      helperText: errorStep2.data ? 'Campo obbligatorio o Data precedente a oggi' : '',
                      className: "campi-picker",
                      sx: {
                        mt: 2,
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: errorStep2.data ? 'var(--danger)' : 'var(--border-weak)',
                          },
                        },
                      },
                    },
                  }}
                />
                <TimePicker
                  label="Ora"
                  value={formData.ora}
                  onChange={(newValue) => setFormData({ ...formData, ora: newValue })}
                  onBlur={() => {
                    const isEmpty = !formData.ora;
                    const isPast =
                      formData.ora &&
                      dayjs(formData.data)
                        .hour(formData.ora.hour())
                        .minute(formData.ora.minute())
                        .isBefore(dayjs());
                    setErrorStep2((prev) => ({ ...prev, ora: isEmpty || isPast }));
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: errorStep2.ora,
                      helperText: errorStep2.ora ? 'Campo obbligatorio o Orario passato !important' : '',
                      className: "campi-picker",
                      sx: {
                        mt: 2,
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: errorStep2.ora ? 'var(--danger)' : 'var(--border-weak)',
                          },
                        },
                      },
                    },
                  }}
                />
              </Box>
            </>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography sx={{ mt: 2 }}>
                <strong>Nome:</strong> {formData.nome}
              </Typography>
              <Typography>
                <strong>Cognome:</strong> {formData.cognome}
              </Typography>
              <Typography>
                <strong>Telefono:</strong> {formData.telefono}
              </Typography>
              <Typography>
                <strong>Indirizzo di consegna:</strong> {formData.indirizzo}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography sx={{ mt: 2 }}>
                  <strong>Piatti selezionati:</strong>
                </Typography>
                {formData.piatti.length > 0 ? (
                  <ul className="font-cibo">
                    {formData.piatti.filter(Boolean).map((piatto, idx) => (
                      <li key={idx}>{piatto}</li>
                    ))}
                  </ul>
                ) : (
                  <Typography sx={{ mb: 2 }}>Nessun piatto selezionato</Typography>
                )}
              </Box>

              <Typography>
                <strong>Data:</strong>{' '}
                {formData.data ? dayjs(formData.data).format('DD/MM/YYYY') : ''}
              </Typography>
              <Typography>
                <strong>Ora:</strong> {formData.ora ? dayjs(formData.ora).format('HH:mm') : ''}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Bottoni di navigazione */}
        <Box sx={{ display: 'flex', mt: 4, width: '100%' }}>
  {!orderPlaced ? (
    // layout normale dei bottoni di navigazione
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack} color="secondary">
        Indietro
      </Button>
      {activeStep < steps.length - 1 ? (
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ backgroundColor: 'var(--accent)', color: '#FF6B00' }}
        >
          Avanti
        </Button>
      ) : (
        <Button variant="contained" onClick={handleConfirm} color="success">
          Conferma
        </Button>
      )}
    </Box>
  ) : (
    // layout centrato per lo stato e annulla ordine
    <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    width: "100%",
  }}
>
  <Typography variant="h6">
    Stato ordine:{" "}
    {orderStatus === "in_preparazione"
      ? "In elaborazione"
      : orderStatus === "preso_in_carico"
      ? "Preso in carico"
      : orderStatus === "consegnato"
      ? "Consegnato"
      : orderStatus}
  </Typography>

  {orderStatus !== "consegnato" && (
    <Button variant="outlined" color="error" onClick={handleCancelOrder}>
      Annulla Ordine
    </Button>
  )}
</Box>
  )}
   </Box>
      </Box>
    </LocalizationProvider>
  );
}
