import { Card, CardContent, CardActions, Button, Typography, Chip, Stack } from '@mui/material';

export default function RiderCard({ order, onTakeCharge }) {
  const isTaken = order.status === 'preso_in_carico';

  return (
    <Card sx={{ width: 340, borderRadius: 3, boxShadow: 'var(--elevation-2)' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Ordine #{order.token?.slice?.(0, 6) || order.token}
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Cliente: <strong>{order.customerName || 'N/D'}</strong>
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>Articoli:</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {(order.items || []).map((it, i) => (
            <Chip key={i} label={String(it)} />
          ))}
        </Stack>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Stato:
          <strong style={{ marginLeft: 8 }}>
            {isTaken ? 'preso già in carico' : 'prendi in carico'}
          </strong>
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          disabled={isTaken}
          onClick={() => onTakeCharge(order.token)}
        >
          {isTaken ? 'In gestione' : 'Prendi in carico'}
        </Button>
      </CardActions>
    </Card>
  );
}
