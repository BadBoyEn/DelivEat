import { Box, TextField } from '@mui/material';

export default function StepContacts({ formData, setFormData, error, setError }) {
  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <Box>
      <TextField
        fullWidth
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleChange}
        onBlur={() => setError((prev) => ({ ...prev, nome: !formData.nome.trim() }))}
        error={error.nome}
        helperText={error.nome ? 'Campo obbligatorio' : ''}
        sx={{
          mt: 2,
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: error.nome ? 'var(--accent-2)' : 'var(--border-weak)',
          },
        }}
      />
      <TextField
        fullWidth
        name="cognome"
        placeholder="Cognome"
        value={formData.cognome}
        onChange={handleChange}
        onBlur={() => setError((prev) => ({ ...prev, cognome: !formData.cognome.trim() }))}
        error={error.cognome}
        helperText={error.cognome ? 'Campo obbligatorio' : ''}
        sx={{
          mt: 2,
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: error.cognome ? 'var(--accent-2)' : 'var(--border-weak)',
          },
        }}
      />
      <TextField
        fullWidth
        name="telefono"
        placeholder="Numero di telefono"
        value={formData.telefono}
        onChange={handleChange}
        onBlur={() => setError((prev) => ({ ...prev, telefono: !formData.telefono.trim() }))}
        error={error.telefono}
        helperText={error.telefono ? 'Campo obbligatorio' : ''}
        sx={{
          mt: 2,
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: error.telefono ? 'var(--accent-2)' : 'var(--border-weak)',
          },
        }}
      />
      <TextField
        fullWidth
        name="indirizzo"
        placeholder="Indirizzo di consegna"
        value={formData.indirizzo}
        onChange={handleChange}
        onBlur={() => setError((prev) => ({ ...prev, indirizzo: !formData.indirizzo.trim() }))}
        error={error.indirizzo}
        helperText={error.indirizzo ? 'Campo obbligatorio' : ''}
        sx={{
          mt: 2,
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: error.indirizzo ? 'var(--accent-2)' : 'var(--border-weak)',
          },
        }}
      />
    </Box>
  );
}
