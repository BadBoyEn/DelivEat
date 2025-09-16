import { useEffect, useMemo, useState } from 'react';
import api from '../../api/client.js';
import { socket } from '../GestionePersonale/Socket.jsx';

/* -- COMMENTO -- Utility -- */
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

/* -- COMMENTO -- Normalizzo la summary del backend in un formato unico -- */
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

  let ordersLastNDays = pick(raw, ['ordersLastNDays', 'ordersLast30Days', 'ordersLastMonth', 'orders_count_last_period']);
  let ordersPrevNDays = pick(raw, ['ordersPrevNDays', 'ordersPreviousNDays', 'ordersLastNDaysPrev', 'ordersPrev30Days']);

  if (!Number.isFinite(+ordersLastNDays)) ordersLastNDays = sum(series.slice(-days));
  if (!Number.isFinite(+ordersPrevNDays)) ordersPrevNDays = sum(seriesPrevious.slice(-days));

  let ridersActive  = pick(raw, ['ridersActive', 'activeRiders', 'ridersOnline', 'ridersTotal', 'ridersCount'], 0);
  let ridersPrev    = pick(raw, ['ridersPrev', 'prevRidersActive', 'ridersPrevious'], undefined);
  let ridersDeltaPct= pick(raw, ['ridersDeltaPct', 'ridersChangePct'], undefined);

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

/* -- COMMENTO -- Hook principale usato dalla Dashboard -- */
export function useDashboard(days = 30) {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(normalizeSummary(null, days));
  const [recent, setRecent]   = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      // -- COMMENTO -- Backend reale:
      //   /api/dashboard/kpis        -> { ordersLast30, ridersActive, ... }
      //   /api/dashboard/sessions    -> { days[], current[], previous[] }
      //   /api/dashboard/last-orders -> { orders: [...] }
      const [kpisRes, sessionsRes, lastOrdersRes] = await Promise.all([
        api.get('/dashboard/kpis'),
        api.get('/dashboard/sessions'),
        api.get('/dashboard/last-orders')
      ]);

      const kpis     = kpisRes?.data || {};
      const sessions = sessionsRes?.data || {};

      // -- COMMENTO -- Unifico nel formato atteso dal componente
      const raw = {
        // KPI
        ordersLast30Days: kpis.ordersLast30,
        ridersActive: kpis.ridersActive,
        avgDeliveryMins: kpis.avgDeliveryMins,
        // Serie per il grafico
        labels: sessions.days,
        series: sessions.current,
        seriesPrevious: sessions.previous,
      };

      setSummary(normalizeSummary(raw, days));

      const ordersData = lastOrdersRes?.data;
      setRecent(Array.isArray(ordersData?.orders) ? ordersData.orders : []);
    } catch (e) {
      console.error('useDashboard load error', e);
      setSummary(normalizeSummary(null, days));
      setRecent([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [days]);

  // -- COMMENTO -- socket live update (solo in locale quando socket !== null)
  useEffect(() => {
    if (!socket) return;
    try { socket.connect(); } catch {}
    const handler = (order) => setRecent((prev) => [order, ...prev].slice(0, 10));
    socket.on('order:new', handler);
    return () => socket.off('order:new', handler);
  }, []);

  const chartData = useMemo(() => {
    if (!summary?.series || !summary?.seriesPrevious) return [];
    return summary.series.map((v, i) => ({
      day: summary.labels?.[i] ?? `D${i + 1}`,
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
