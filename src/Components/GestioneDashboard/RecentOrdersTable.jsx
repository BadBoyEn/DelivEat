import React from 'react';

export default function RecentOrdersTable({ orders }) {
  const rows = Array.isArray(orders) ? orders : [];

  const safe = (v) => (v ?? '').toString();

  return (
    <div className="db-panel db-col-9">
      <div className="db-panel__title">Ultimi ordini</div>
      <div className="db-table">
        <table className="db-table__table">
          <thead className="db-table__thead">
            <tr>
              <th className="db-table__th">#</th>
              <th className="db-table__th">Ordine</th>
              <th className="db-table__th">Cliente</th>
              <th className="db-table__th">Stato</th>
            </tr>
          </thead>
          <tbody className="db-table__tbody">
            {rows.map((o, i) => (
              <tr key={o._id || o.id || i}>
                <td className="db-table__td">{i + 1}</td>
                <td className="db-table__td">{safe(o.code || o.orderCode || o._id || o.id)}</td>
                <td className="db-table__td">{safe(o.customer?.name || o.cliente || o.customerName)}</td>
                <td className="db-table__td">{safe(o.status || o.stato || '—')}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="db-table__td" colSpan={4} style={{ opacity: .7, padding: '12px 8px' }}>
                  Nessun ordine
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
