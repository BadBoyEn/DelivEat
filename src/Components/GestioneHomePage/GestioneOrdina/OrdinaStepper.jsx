import { useEffect, useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import api from '../../../api/client.js';
import { socket } from '../../GestionePersonale/Socket.jsx';
import './GestioneOrdina.css';

import StepContacts from './StepContacts.jsx';
import StepMenu from './StepMenu.jsx';
import StepReview from './StepReview.jsx';
import OrderStatus from './OrderStatus.jsx';

// -- COMMENTO -- Icona step personalizzata (usa tema)
function OrangeStepIcon({ active, completed, icon }) {
  return (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: completed || active ? 'var(--accent)' : 'var(--border-weak)',
        color: 'var(--on-accent)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 600
      }}
    >
      {completed ? '✓' : icon}
    </div>
  );
}

const steps = ['Contatti', 'Ordinazione', 'Conferma'];

export default function OrdinaStepper() {
  // -- COMMENTO -- Errori step 0
  const [error, setError] = useState({ nome: false, cognome: false, telefono: false, indirizzo: false });
  // -- COMMENTO -- Errori step 1
  const [errorStep2, setErrorStep2] = useState({ data: false, ora: false });

  const [activeStep, setActiveStep] = useState(0);
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [currentOrderToken, setCurrentOrderToken] = useState(null);

  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    indirizzo: '',
    piatti: [],
    data: dayjs(),
    ora: dayjs(),
  });

  // -- COMMENTO -- Validazioni e navigazione
  const handleNext = () => {
    if (activeStep === 0) {
      const newError = {
        nome: !formData.nome.trim(),
        cognome: !formData.cognome.trim(),
        telefono: !formData.telefono.trim(),
        indirizzo: !formData.indirizzo.trim(),
      };
      setError(newError);
      if (Object.values(newError).some(Boolean)) return;
    }

    if (activeStep === 1) {
      if (formData.piatti.length === 0) {
        alert('Seleziona almeno un piatto');
        return;
      }
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

  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  // -- COMMENTO -- Invio ordine
  const handleConfirm = async () => {
    try {
      // -- COMMENTO -- Validazioni minime finali
      if (!formData.nome?.trim() || !formData.cognome?.trim()) return alert('Inserisci nome e cognome');
      if (!formData.piatti?.length) return alert('Seleziona almeno un piatto');
      if (!formData.indirizzo?.trim()) return alert('Inserisci un indirizzo');
      if (!formData.telefono?.trim() || !/^\d+$/.test(formData.telefono)) return alert('Inserisci un numero di telefono valido (solo cifre)');
      if (!formData.data) return alert('Seleziona una data');
      if (!formData.ora) return alert('Seleziona un orario');

      const payload = {
        nome: formData.nome.trim(),
        cognome: formData.cognome.trim(),
        telefono: formData.telefono.trim(),
        indirizzo: formData.indirizzo.trim(),
        data: dayjs(formData.data).format('YYYY-MM-DD'),
        ora: dayjs(formData.ora).format('HH:mm'),
        piatti: formData.piatti,
      };

      const { data } = await api.post('/orders', payload);
      socket?.emit('new_order', data);

      setOrderPlaced(true);
      setOrderStatus('in_preparazione');
      setCurrentOrderToken(data?._id || data?.id || null);
    } catch (err) {
      console.error('Errore nell\'invio dell\'ordine:', err);
      alert(err?.message || 'Errore nell\'invio dell\'ordine, riprova.');
    }
  };

  const handleCancelOrder = () => {
    if (orderStatus === 'consegnato') return;
    setOrderStatus(null);
    setOrderPlaced(false);
    setCurrentOrderToken(null);
    setActiveStep(0);
  };

  // -- COMMENTO -- Socket: aggiorna stato ordine in tempo reale
  useEffect(() => {
    if (!socket?.connected) socket?.connect();

    const onStatusUpdated = ({ token, status }) => {
      if (!currentOrderToken) return;
      if (token === currentOrderToken) setOrderStatus(status);
    };

    socket?.on('order_status_updated', onStatusUpdated);
    return () => socket?.off('order_status_updated', onStatusUpdated);
  }, [currentOrderToken]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          backgroundColor: 'var(--surface)',
          color: 'var(--text)',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: activeStep === 2 ? 480 : 720,
          mx: 'auto',
          border: '1px solid var(--border-weak)',
          borderRadius: 2,
          p: 4,
          boxShadow: 'var(--elevation-2)',
          mt: 6,
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={OrangeStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 2, width: '100%', mx: 'auto' }}>
          {activeStep === 0 && (
            <StepContacts
              formData={formData}
              setFormData={setFormData}
              error={error}
              setError={setError}
            />
          )}

          {activeStep === 1 && (
            <StepMenu
              formData={formData}
              setFormData={setFormData}
              errorStep2={errorStep2}
              setErrorStep2={setErrorStep2}
            />
          )}

          {activeStep === 2 && <StepReview formData={formData} />}
        </Box>

        <Box sx={{ display: 'flex', mt: 4, width: '100%' }}>
          {!orderPlaced ? (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack} color="secondary">
                Indietro
              </Button>

              {activeStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ backgroundColor: 'var(--accent)', color: 'var(--on-accent)' }}
                >
                  Avanti
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleConfirm}
                  sx={{ backgroundColor: 'var(--accent)', color: 'var(--on-accent)' }}
                >
                  Conferma
                </Button>
              )}
            </Box>
          ) : (
            <OrderStatus orderStatus={orderStatus} onCancel={handleCancelOrder} />
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
