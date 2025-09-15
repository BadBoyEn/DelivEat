import { Box, Button, Typography } from '@mui/material';

export default function OrderStatus({ orderStatus, onCancel }) {
  const label =
    orderStatus === 'in_preparazione'
      ? 'In elaborazione'
      : orderStatus === 'preso_in_carico'
      ? 'Preso in carico'
      : orderStatus === 'consegnato'
      ? 'Consegnato'
      : (orderStatus || '—');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '100%',
      }}
    >
      <Typography variant="h6">Stato ordine: {label}</Typography>

      {orderStatus !== 'consegnato' && (
        <Button variant="outlined" color="error" onClick={onCancel}>
          Annulla Ordine
        </Button>
      )}
    </Box>
  );
}
