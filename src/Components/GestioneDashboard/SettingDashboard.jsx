import { useEffect, useMemo, useState } from 'react';
import api from '../../api/client.js';
import { socket } from '../GestionePersonale/Socket.jsx';

/* -- COMMENTO -- Hook dati Dashboard: summary + recent orders + socket live update -- */
export function useDashboard(days = 30) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);

  // -- COMMENTO -- Carica riepilogo + ultimi ordini con fallback /recent -> /recent-orders
  const load = async () => {
  setLoading(true);
  try {
    const [s, r] = await Promise.all([
      api.get(`/dashboard/summary?days=${days}`),
      api.get('/dashboard/recent-orders?limit=7'), // -- COMMENTO -- QUI il fix definitivo
    ]);
    setSummary(s.data);
    const rows = (r.data || []).map((o, i) => ({ idx: i + 1, ...o }));
    setRecent(rows);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { load(); }, [days]);

  // -- COMMENTO -- Socket: aggiorna stato nella tabella quando cambia dal Rider
  useEffect(() => {
    const onStatus = ({ token, status }) => {
      setRecent(prev => prev.map(o => (o.token === token || o.id === token) ? { ...o, status } : o));
    };
    if (!socket.connected) socket.connect();
    socket.on('order_status_updated', onStatus);
    return () => socket.off('order_status_updated', onStatus);
  }, []);

  // -- COMMENTO -- Dati per il grafico LineChart
  const chartData = useMemo(() => {
    if (!summary) return [];
    return summary.labels.map((label, i) => ({
      day: label,
      current: summary.seriesCurrent[i] || 0,
      previous: summary.seriesPrevious[i] || 0,
    }));
  }, [summary]);

  // -- COMMENTO -- % variazione ordini ultimi N giorni vs periodo precedente
  const ordersDeltaPct = useMemo(() => {
    if (!summary) return 0;
    const { ordersLastNDays, ordersPrevNDays } = summary;
    if (ordersPrevNDays === 0) return 100;
    return Math.round(((ordersLastNDays - ordersPrevNDays) / ordersPrevNDays) * 100);
  }, [summary]);

  return { loading, summary, recent, chartData, ordersDeltaPct, refresh: load };
}
