import React from 'react';
import './Dashboard.css';
import ColorModeSelect from '../../theme/ColorModeSelect';
import { useDashboard } from './SettingDashboard';
import SessionsChart from './SessionsChart';
import RecentOrdersTable from './RecentOrdersTable';
import { Link } from 'react-router-dom';   

/* -- HEADER-BAR -- */
function AppNavbar() {
  return (
    <header className="db-appbar">
      <div className="db-appbar__left"><div className="db-logo">Dashboard</div></div>
      <div className="db-appbar__right"><ColorModeSelect /></div>
    </header>
  );
}

/* -- CARD METRICA -- */
function StatCard({ title, value, hint }) {
  return (
    <div className="db-panel db-col-3">
      <div className="db-panel__title">{title}</div>
      <div className="db-metric">{value}</div>
      {hint && <div className="db-hint">{hint}</div>}
    </div>
  );
}

/* -- CARD TESTO (senza evidenziato) -- */
function TextCard({ title, children }) {
  return (
    <div className="db-panel db-col-3">
      <div className="db-panel__title">{title}</div>
      <div style={{ opacity: .9 }}>{children}</div>
    </div>
  );
}

/* -- MENU LATERALE -- */
function MenuPanel() {
  // -- COMMENTO -- metto la voce HomePage come Link
  const voci = [
    { label: 'Overview', path: '#' },
    { label: 'HomePage', path: '/' },        // ⬅️ collegata a /
    { label: 'Clienti', path: '#' },
    { label: 'Rider', path: '#' },
    { label: 'Report', path: '#' },
    { label: 'Impostazioni', path: '#' },
  ];

  return (
    <div className="db-panel db-col-3">
      <div className="db-panel__title">Menu</div>
      <ul className="db-menu">
        {voci.map(v => (
          <li key={v.label}>
            {v.path === '#' ? (
              v.label
            ) : (
              <Link to={v.path}>{v.label}</Link>   {/* ⬅️ Link a HomePage */}
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -- GRIGLIA PRINCIPALE -- */
function MainGrid() {
  const { loading, summary, chartData, recent, ordersDeltaPct } = useDashboard(30);

  const itNum = (n) => Number(n || 0).toLocaleString('it-IT');

  const ordini30    = summary?.ordersLastNDays ?? 0;
  const riderAttivi = summary?.ridersActive ?? summary?.ridersTotal ?? 0;
  const riderPct    = summary?.ridersDeltaPct ?? 0;

  return (
    <>
      {/* Statistiche in alto */}
      <section className="db-grid__row">
        <StatCard title="Ordini (30 gg)" value={loading ? '—' : itNum(ordini30)} hint={`${ordersDeltaPct >= 0 ? '+' : ''}${ordersDeltaPct}% vs prec.`} />
        <StatCard title="Rider attivi" value={loading ? '—' : itNum(riderAttivi)} hint={`${riderPct >= 0 ? '+' : ''}${riderPct}% vs prec.`} />
        <StatCard title="Tempo medio consegna" value="27 min" hint="-2 min vs prec." />
        <TextCard title="Esplora i tuoi dati">Scopri insight su performance e visite.</TextCard>
      </section>

      {/* Grafici */}
      <section className="db-grid__row">
        <div className="db-panel db-col-6">
          <div className="db-panel__title">Sessioni</div>
          <SessionsChart data={chartData} />
          <div className="db-legend">
            <span className="legend current"></span> arancio: ordini 30 giorni &nbsp;&nbsp;
            <span className="legend previous"></span> verde: ordini mese precedente
          </div>
        </div>
        <div className="db-panel db-col-6">
          <div className="db-panel__title">Page Views</div>
          <div style={{opacity:.8}}>Inserisci qui il tuo bar chart.</div>
        </div>
      </section>

      {/* Dettagli */}
      <section className="db-grid__row">
        <RecentOrdersTable orders={recent} />
        <MenuPanel />
      </section>
    </>
  );
}

export default function Dashboard() {
  return (
    <div className="db-root">
      <AppNavbar />
      <div className="db-shell db-shell--no-aside">
        <main className="db-content">
          <MainGrid />
        </main>
      </div>
    </div>
  );
}
