import api from './client';

export async function getKpis() {
  const { data } = await api.get('/dashboard/kpis');
  return data;
}

export async function getLastOrders(limit = 7) {
  const { data } = await api.get('/dashboard/last-orders', { params: { limit } });
  return data;
}

export async function getSessions() {
  const { data } = await api.get('/dashboard/sessions');
  return data;
}
