import { useEffect, useMemo, useState } from 'react';
import api from '../../api/client.js';
import { socket } from '../GestionePersonale/Socket.jsx';

/* -- COMMENTO -- Hook dati Dashboard: summary + recent orders + socket live update -- */
export function useDashboard(days = 30) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const [s, r] = await Promise.all([
        api.get(`/dashboard/summary?days=${days}`),
        // -- COMMENTO -- compat: alcuni BE usano /recent, altri /recent-orders
        api.get('/dashboard/recent-orders').catch(() => api.get('/dashboard/recent'))
      ]);
      setSummary(s.data);
      setRecent(r.data?.orders || r.data || []);
    } catch (e) {
      console.error('useDashboard load error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [days]);

  // -- COMMENTO -- socket live update (se server emette "order:new")
  useEffect(() => {
    if (!socket) return;
    const handler = (order) => setRecent((prev) => [order, ...prev].slice(0, 10));
    socket.on('order:new', handler);
    return () => socket.off('order:new', handler);
  }, []);

  // -- COMMENTO -- dati per grafico
  const chartData = useMemo(() => {
    if (!summary?.series || !summary?.seriesPrevious) return [];
    return summary.series.map((v, i) => ({
      day: summary.labels?.[i] ?? `D${i+1}`,
      current: v || 0,
      previous: summary.seriesPrevious[i] || 0,
    }));
  }, [summary]);

  const ordersDeltaPct = useMemo(() => {
    if (!summary) return 0;
    const { ordersLastNDays = 0, ordersPrevNDays = 0 } = summary;
    if (ordersPrevNDays === 0) return ordersLastNDays > 0 ? 100 : 0;
    return Math.round(((ordersLastNDays - ordersPrevNDays) / ordersPrevNDays) * 100);
  }, [summary]);

  return { loading, summary, recent, chartData, ordersDeltaPct, refresh: load };
}
