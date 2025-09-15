import { useEffect, useMemo, useState } from 'react';
import api from '../../api/client.js';
import { socket } from '../GestionePersonale/Socket.jsx';

/* -- COMMENTO -- Utility */
const num = (v, d = 0) => {
  const n = Number.isFinite(+v) ? +v : 0;
  return d ? n : Math.round(n);
};
const sum = (arr) => (Array.isArray(arr) ? arr.reduce((a, b) => a + (Number(b) || 0), 0) : 0);
const pick = (obj, keys, def = undefined) => {
  for (const k of keys) if (obj?.[k] !== undefined && obj?.[k] !== null) return obj[k];
  return def;
};
const arrPick = (obj, keys, def = []) => {
  const v = pick(obj, keys, def);
  return Array.isArray(v) ? v : def;
};

/* -- COMMENTO -- Normalizzo la summary del backend in un formato unico */
function normalizeSummary(raw, days) {
  if (!raw || typeof raw !== 'object') {
    return {
      ordersLastNDays: 0,
      ordersPrevNDays: 0,
      ridersActive: 0,
      ridersDeltaPct: 0,
      series: [],
      seriesPrevious: [],
      labels: [],
    };
  }

  const series          = arrPick(raw, ['series', 'ordersSeries', 'currentSeries', 'seriesCurrent'], []);
  const seriesPrevious  = arrPick(raw, ['seriesPrevious', 'ordersSeriesPrevious', 'prevSeries', 'seriesPrev'], []);
  const labels          = arrPick(raw, ['labels', 'days', 'x', 'dates'], []);

  // -- COMMENTO -- Ordini periodo corrente / precedente
  let ordersLastNDays = pick(raw, ['ordersLastNDays', 'ordersLast30Days', 'ordersLastMonth', 'orders_count_last_period']);
  let ordersPrevNDays = pick(raw, ['ordersPrevNDays', 'ordersPreviousNDays', 'ordersLastNDaysPrev', 'ordersPrev30Days']);

  if (!Number.isFinite(+ordersLastNDays)) {
    ordersLastNDays = sum(series.slice(-days));
  }
  if (!Number.isFinite(+ordersPrevNDays)) {
    ordersPrevNDays = sum(seriesPrevious.slice(-days));
  }

  // -- COMMENTO -- Rider attivi (o totali come fallback)
  let ridersActive = pick(raw, ['ridersActive', 'activeRiders', 'ridersOnline', 'ridersTotal', 'ridersCount'], 0);
  let ridersPrev   = pick(raw, ['ridersPrev', 'prevRidersActive', 'ridersPrevious'], undefined);
  let ridersDeltaPct = pick(raw, ['ridersDeltaPct', 'ridersChangePct'], undefined);

  if (!Number.isFinite(+ridersDeltaPct)) {
    if (Number.isFinite(+ridersPrev) && +ridersPrev !== 0) {
      ridersDeltaPct = Math.round(((ridersActive - ridersPrev) / Math.abs(ridersPrev)) * 100);
    } else {
      ridersDeltaPct = ridersActive > 0 ? 100 : 0;
    }
  }

  return {
    ordersLastNDays: num(ordersLastNDays),
    ordersPrevNDays: num(ordersPrevNDays),
    ridersActive: num(ridersActive),
    ridersDeltaPct: num(ridersDeltaPct),
    series,
    seriesPrevious,
    labels,
  };
}

/* -- COMMENTO -- Hook dati Dashboard: summary + recent orders + socket live update -- */
export function useDashboard(days = 30) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      // -- COMMENTO -- Summary con fallback / dashboard recent con due possibili endpoint
      const [s, r] = await Promise.all([
        api.get(`/dashboard/summary?days=${days}`).catch(() => api.get('/dashboard/summary')),
        api.get('/dashboard/recent-orders').catch(() => api.get('/dashboard/recent')),
      ]);

      const normalized = normalizeSummary(s?.data, days);
      setSummary(normalized);
      setRecent(Array.isArray(r?.data?.orders) ? r.data.orders : (Array.isArray(r?.data) ? r.data : []));
    } catch (e) {
      console.error('useDashboard load error', e);
      setSummary(normalizeSummary(null, days));
      setRecent([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [days]);

  // -- COMMENTO -- socket live update (se il server emette "order:new")
  useEffect(() => {
    if (!socket) return;
    try {
      socket.connect();
    } catch {}
    const handler = (order) => setRecent((prev) => [order, ...prev].slice(0, 10));
    socket.on('order:new', handler);
    return () => socket.off('order:new', handler);
  }, []);

  // -- COMMENTO -- dati per grafico
  const chartData = useMemo(() => {
    if (!summary?.series || !summary?.seriesPrevious) return [];
    return summary.series.map((v, i) => ({
      day: summary.labels?.[i] ?? `D${i + 1}`,
      current: v || 0,
      previous: summary.seriesPrevious[i] || 0,
    }));
  }, [summary]);

  // -- COMMENTO -- delta % ordini periodo corrente vs precedente
  const ordersDeltaPct = useMemo(() => {
    if (!summary) return 0;
    const { ordersLastNDays = 0, ordersPrevNDays = 0 } = summary;
    if (ordersPrevNDays === 0) return ordersLastNDays > 0 ? 100 : 0;
    return Math.round(((ordersLastNDays - ordersPrevNDays) / ordersPrevNDays) * 100);
  }, [summary]);

  return { loading, summary, recent, chartData, ordersDeltaPct, refresh: load };
}
