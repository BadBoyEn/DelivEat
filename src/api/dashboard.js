import client from './client';

export const getDashboardSummary = () =>
  client.get('/dashboard/summary').then(r => r.data);

export const getLast7Orders = () =>
  client.get('/dashboard/orders/last7').then(r => r.data);

export const getOrdersByDayLast30 = () =>
  client.get('/dashboard/orders/last30days').then(r => r.data);
