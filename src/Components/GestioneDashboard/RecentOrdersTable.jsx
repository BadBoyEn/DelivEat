import React from 'react';

export default function RecentOrdersTable({ orders }) {
  return (
    <div className="db-panel db-col-9">
      <div className="db-panel__title">Ultimi ordini</div>
      <table className="db-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Ordine</th>
            <th>Cliente</th>
            <th>Stato</th>
          </tr>
        </thead>
        <tbody>
          {(orders || []).map((o) => (
            <tr key={o.id}>
              <td>{o.idx}</td>
              <td>{`ORD-${o.id.slice(-4)}`}</td>
              <td>{o.customerName || '—'}</td>
              <td>{o.status}</td>
            </tr>
          ))}
          {(!orders || orders.length === 0) && (
            <tr><td colSpan={4} style={{ opacity: .7, padding: '12px 8px' }}>Nessun ordine</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
