import { Box, Typography, Tooltip } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { CATEGORIE } from './MenuData';

export default function StepMenu({ formData, setFormData, errorStep2, setErrorStep2 }) {
  const togglePiatto = (piattoTitle) => {
    setFormData((prev) => {
      const already = prev.piatti.includes(piattoTitle);
      const piatti = already ? prev.piatti.filter((p) => p !== piattoTitle) : [...prev.piatti, piattoTitle];
      return { ...prev, piatti };
    });
  };

  return (
    <>
      {CATEGORIE.map((cat) => (
        <Box key={cat.titolo} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: 'var(--text)' }}>
            {cat.titolo}
          </Typography>
          <ImageList sx={{ mt: 0.5 }} cols={3}>
            {cat.piatti.map((piatto) => {
              const selected = formData.piatti.includes(piatto.title);
              return (
                <ImageListItem
                  key={piatto.title}
                  onClick={() => togglePiatto(piatto.title)}
                  sx={{
                    border: selected ? '3px solid var(--accent)' : '1px solid var(--border-weak)',
                    borderRadius: 2,
                    p: 1,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': { boxShadow: 'var(--elevation-2)' },
                  }}
                >
                  <Tooltip title={piatto.title} arrow>
                    <img
                      src={piatto.img}
                      alt={piatto.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        display: 'block',
                        borderRadius: 8,
                      }}
                    />
                  </Tooltip>
                </ImageListItem>
              );
            })}
          </ImageList>
        </Box>
      ))}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <DatePicker
            label="Data"
            value={formData.data}
            onChange={(newValue) => setFormData((prev) => ({ ...prev, data: newValue }))}
            onBlur={() => {
              const isEmpty = !formData.data;
              const isPast = formData.data && formData.data.isBefore(undefined, 'day'); // -- COMMENTO -- check nel contenitore
              setErrorStep2((prev) => ({ ...prev, data: isEmpty || isPast }));
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: errorStep2.data,
                helperText: errorStep2.data ? 'Campo obbligatorio o data nel passato' : '',
                className: 'campi-picker',
                sx: {
                  mt: 2,
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: errorStep2.data ? 'var(--accent-2)' : 'var(--border-weak)',
                  },
                },
              },
            }}
          />
          <TimePicker
            label="Ora"
            value={formData.ora}
            onChange={(newValue) => setFormData((prev) => ({ ...prev, ora: newValue }))}
            onBlur={() => {
              const isEmpty = !formData.ora;
              setErrorStep2((prev) => ({ ...prev, ora: isEmpty }));
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: errorStep2.ora,
                helperText: errorStep2.ora ? 'Campo obbligatorio o orario passato' : '',
                className: 'campi-picker',
                sx: {
                  mt: 2,
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: errorStep2.ora ? 'var(--accent-2)' : 'var(--border-weak)',
                  },
                },
              },
            }}
          />
        </Box>
      </LocalizationProvider>
    </>
  );
}
