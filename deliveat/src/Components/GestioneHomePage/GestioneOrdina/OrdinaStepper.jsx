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

function OrangeStepIcon({ active, completed, icon }) {
  const [activeStep, setActiveStep] = useState(0);
  // Stato dei campi del form
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    telefono: "",
    data: "",
    ora: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };  
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
    data: dayjs(),
    ora: dayjs(),
  });

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