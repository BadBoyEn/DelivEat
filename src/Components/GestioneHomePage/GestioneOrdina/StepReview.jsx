import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

export default function StepReview({ formData }) {
  return (
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
        <strong>Data:</strong> {formData.data ? dayjs(formData.data).format('DD/MM/YYYY') : ''}
      </Typography>
      <Typography>
        <strong>Ora:</strong> {formData.ora ? dayjs(formData.ora).format('HH:mm') : ''}
      </Typography>
    </Box>
  );
}
