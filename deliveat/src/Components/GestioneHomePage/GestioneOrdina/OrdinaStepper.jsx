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
    <Box sx={{ maxWidth: "800px", width: "90%", mx: "auto", border: "1px solid #ccc", borderRadius: 2, p: 4, boxShadow: 3, mt: 6, mb: 6 }}>
      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={OrangeStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4, maxWidth: 700, mx: "auto" }}>
          {activeStep === 0 && (
            <Box>
              <TextField
                fullWidth
                label="Nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Cognome"
                name="cognome"
                value={formData.cognome}
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Numero di telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <TextField
                fullWidth
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                sx={{ mt: 2, width: "100%", flex: 1 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                type="time"
                name="ora"
                value={formData.ora}
                onChange={handleChange}
                sx={{ mt: 2, width: "100%", flex: 1 }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
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
              <Typography sx={{ mt: 2 }}>
                <strong>Data:</strong> {formData.data}
              </Typography>
              <Typography>
                <strong>Ora:</strong> {formData.ora}
              </Typography>
            </Box>
          )}
        </Box>     
      {/* Bottoni di navigazione */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button color="secondary" disabled={activeStep === 0} onClick={handleBack}>
          Indietro
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button color="secondary" variant="contained" onClick={handleNext}>
            Avanti
          </Button>
        ) : (
          <Button variant="contained" color="success">
            Conferma
          </Button>
        )}
      </Box>
    </Box>
  );
}