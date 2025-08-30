import { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  TextField,
  Typography
} from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

function OrangeStepIcon({ active, completed, icon }) {
  return (
    <div
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: completed || active ? "#FF6B00" : "#ccc", // secondary arancione
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {completed ? "✓" : icon}
    </div>
  );
}

const steps = ["Contatti", "Ordinazione", "Conferma"];

export default function OrdinaStepper() {
  const [error, setError] = useState({
    nome: false,
    cognome: false,
    telefono: false,
  });

  const [errorStep2, setErrorStep2] = useState({
  data: false,
  ora: false,
});

  const [activeStep, setActiveStep] = useState(0);

   // Stato dei campi del form
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    telefono: "",
    piatti: [],
    data: dayjs(),
    ora: dayjs(),
  });

  const piattiDisponibili = [
    "Primo1",
    "Primo2",
    "Primo3",
    "Secondo1",
    "Secondo2",
    "Secondo3",
    "Dolce1",
    "Dolce2",
    "Dolce3"
  ];

  const togglePiatto = (piatto) => {
    setFormData((prev) => {
      const alreadySelected = prev.piatti.includes(piatto);
      return {
        ...prev,
        piatti: alreadySelected
          ? prev.piatti.filter((p) => p !== piatto) // se già selezionato → lo tolgo
          : [...prev.piatti, piatto]               // se non c’è → lo aggiungo
      };
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
    };
    setError(newError);

    if (Object.values(newError).some(Boolean)) return; // blocca se almeno uno è vuoto
  }

  if (activeStep === 1) {
  const isDataInvalid = !formData.data || dayjs(formData.data).isBefore(dayjs(), 'day');
  const isOraInvalid = !formData.ora || dayjs(formData.data)
    .hour(formData.ora.hour())
    .minute(formData.ora.minute())
    .isBefore(dayjs());

  const newErrorStep2 = { data: isDataInvalid, ora: isOraInvalid };
  setErrorStep2(newErrorStep2);

  if (Object.values(newErrorStep2).some(Boolean)) return; // blocca lo step
}

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  const socket = socketIOClient('http://localhost:3000');
  const handleSubmit = async () => {
  try {
    const payload = { ...formData };
    const response = await axios.post("/api/ordini", payload);
    console.log("Ordine inviato:", response.data);
  } catch (error) {
    console.error("Errore nell'invio dell'ordine:", error);
  }
};
  socket.emit('new_order', ordineData);
  socket.on('order_token', (data) => {
    console.log('Token Ordine:', data.token); // Mostra il token ricevuto
  });
  socket.on('order_token', (data) => {
    console.log('Token Ordine:', data.status); // Mostra il token ricevuto
  });
  setActiveStep(steps.length);
  return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box sx={{ backgroundColor: "#fff", display: "flex", flexDirection: "column", maxWidth: activeStep === 2 ? 400 : 500, minWidth: activeStep === 2 ? 300 : "auto", mx: "auto", border: "1px solid #ccc", borderRadius: 2, p: 4, boxShadow: 3, mt: 6, mb: 6 }}>
      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={OrangeStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4, width: "100%", mx: "auto" }}>
          {activeStep === 0 && (
            <Box>
              <TextField
  fullWidth
  name="nome"
  placeholder="Nome"
  value={formData.nome}
  onChange={handleChange}
  onBlur={() => setError(prev => ({ ...prev, nome: !formData.nome }))} // solo il campo corrente
  error={error.nome}
  helperText={error.nome ? "Campo obbligatorio" : ""}
  sx={{
    mt: 2,
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: error.nome ? "red" : "#ccc",
      },
    },
  }}
/>

<TextField
  fullWidth
  name="cognome"
  placeholder="Cognome"
  value={formData.cognome}
  onChange={handleChange}
  onBlur={() => setError(prev => ({ ...prev, cognome: !formData.cognome }))}
  error={error.cognome}
  helperText={error.cognome ? "Campo obbligatorio" : ""}
  sx={{
    mt: 2,
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: error.cognome ? "red" : "#ccc",
      },
    },
  }}
/>

<TextField
  fullWidth
  name="telefono"
  placeholder="Numero di telefono"
  value={formData.telefono}
  onChange={handleChange}
  onBlur={() => setError(prev => ({ ...prev, telefono: !formData.telefono }))}
  error={error.telefono}
  helperText={error.telefono ? "Campo obbligatorio" : ""}
  sx={{
    mt: 2,
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: error.telefono ? "red" : "#ccc",
      },
    },
  }}
/>
            </Box>
          )}

           {activeStep === 1 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            mt: 0.8,
            mb: 3,
          }}
        >
          {piattiDisponibili.map((piatto) => (
            <Box
              key={piatto}
              onClick={() => togglePiatto(piatto)}
              sx={{
                border: formData.piatti.includes(piatto)
                  ? "2px solid #FF6B00"
                  : "1px solid #ccc",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)"
                },
              }}
            >
              <Typography variant="body1">{piatto}</Typography>
            </Box>
          ))}
        </Box>
      )}

          {activeStep === 1 && (
             <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
              <DatePicker
    label="Data"
    value={formData.data}
    onChange={(newValue) => setFormData({ ...formData, data: newValue })}
    onBlur={() => {
      const isEmpty = !formData.data;
      const isPast = formData.data && dayjs(formData.data).isBefore(dayjs(), 'day');
      setErrorStep2(prev => ({ ...prev, data: isEmpty || isPast }));
    }}
    slotProps={{
      textField: {
        fullWidth: true,
        error: errorStep2.data,
        helperText: errorStep2.data ? "Campo obbligatorio o Data precedente a oggi" : "",
        sx: {
          mt: 2,
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: errorStep2.data ? "red" : "#ccc",
            },
          },
        },
      },
    }}
  />

  {/* TimePicker */}
  <TimePicker
    label="Ora"
    value={formData.ora}
    onChange={(newValue) => setFormData({ ...formData, ora: newValue })}
    onBlur={() => {
      const isEmpty = !formData.ora;
      const isPast = formData.ora && dayjs(formData.data)
        .hour(formData.ora.hour())
        .minute(formData.ora.minute())
        .isBefore(dayjs());
      setErrorStep2(prev => ({ ...prev, ora: isEmpty || isPast }));
    }}
    slotProps={{
      textField: {
        fullWidth: true,
        error: errorStep2.ora,
        helperText: errorStep2.ora ? "Campo obbligatorio o Orario passato" : "",
        sx: {
          mt: 2,
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: errorStep2.ora ? "red" : "#ccc",
            },
          },
        },
      },
    }}
  />
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography sx={{ mt: 2 }}><strong>Nome:</strong> {formData.nome}</Typography>
              <Typography><strong>Cognome:</strong> {formData.cognome}</Typography>
              <Typography><strong>Telefono:</strong> {formData.telefono}</Typography>
              <Typography sx={{ mt: 2 }}>
                <Typography sx={{ mt: 2 }}>
      <strong>Piatti selezionati:</strong>
    </Typography>
    {formData.piatti.length > 0 ? (
      <ul>
        {formData.piatti.map((piatto, idx) => (
          <li key={idx}>{piatto}</li>
        ))}
      </ul>
    ) : (
      <Typography sx={{ mb: 2 }}>Nessun piatto selezionato</Typography>
    )}
  <strong>Data:</strong> {formData.data ? dayjs(formData.data).format("DD/MM/YYYY") : ""}
</Typography>
<Typography>
  <strong>Ora:</strong> {formData.ora ? dayjs(formData.ora).format("HH:mm") : ""}
</Typography>
            </Box>
          )}
        </Box>   
      {/* Bottoni di navigazione */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button color="primary" disabled={activeStep === 0} onClick={handleBack}>
          Indietro
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button color="primary" variant="contained" onClick={handleNext}>
            Avanti
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Conferma
          </Button>
        )}
      </Box>
    </Box>
  </LocalizationProvider>
  );
}