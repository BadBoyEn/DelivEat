import React from 'react';
import './Dashboard.css';
import ColorModeSelect from '../../theme/ColorModeSelect';

/* -- HEADER-BAR -- */

function AppNavbar() {
  return (
    <header className="db-appbar">
      <div className="db-appbar__left"><div className="db-logo">Dashboard</div></div>
      <div className="db-appbar__right"><ColorModeSelect /></div>
    </header>
  );
}

/* -- MENU -- */
function MenuList() {
  return (
    <>
      <div className="db-nav__section">Menu</div>
      <ul className="db-nav__list">
        <li className="db-nav__item db-nav__item--active">Overview</li>
        <li className="db-nav__item">Ordini</li>
        <li className="db-nav__item">Clienti</li>
        <li className="db-nav__item">Rider</li>
        <li className="db-nav__item">Report</li>
        <li className="db-nav__item">Impostazioni</li>
      </ul>
    </>
  );
}

/* -- VERSIONE TELEFONO -- */
function SideMenuInline() {
  return (
    <div className="db-menu-box">
      <MenuList />
    </div>
  );
}

/* -- UTILS CARDS -- */
function StatCard({ title, value, hint }) {
  return (
    <div className="db-card">
      <div className="db-card__title">{title}</div>
      <div className="db-card__value">{value}</div>
      {hint && <div className="db-card__hint">{hint}</div>}
    </div>
  );
}
function HighlightedCard() {
  return (
    <div className="db-card db-card--highlight">
      <div className="db-card__title">Esplora i tuoi dati</div>
      <div className="db-card__hint">Scopri insight su performance e visite.</div>
    </div>
  );
}

/* -- GRAFICI -- */
function SessionsChart() {
  return (
    <div className="db-panel">
      <div className="db-card__title">Sessioni</div>
      <div className="db-card__hint">Inserisci qui il tuo grafico.</div>
    </div>
  );
}
function PageViewsBarChart() { /* DA CAPIRE SE HA SENSO LASCIARLA */
  return (
    <div className="db-panel">
      <div className="db-card__title">Page Views</div>
      <div className="db-card__hint">Inserisci qui il tuo bar chart.</div>
    </div>
  );
}

/* -- TABELLA -- */
/* ERA DI PROVA QUESTA */
function CustomizedDataGrid() {
  const rows = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    order: `ORD-${1000 + i}`,
    customer: 'Mario Rossi',
    status: 'Consegnato',
  }));

  return (
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
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="db-table__td">{r.id}</td>
              <td className="db-table__td">{r.order}</td>
              <td className="db-table__td">{r.customer}</td>
              <td className="db-table__td"><span className="status--ok">{r.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -- GRIGLIA PRINCIPALE -- */
function MainGrid() {
  return (
    <div className="db-grid">
      {/* Cards */}
      <section className="db-grid__row">
        <StatCard title="Ordini (30 gg)" value="1.240" hint="+12% vs prec." />
        <StatCard title="Clienti attivi" value="431" hint="+5% vs prec." />
        <StatCard title="Tempo medio consegna" value="27 min" hint="-2 min vs prec." />
        <HighlightedCard />
      </section>

      {/* Grafici */}
      <section className="db-grid__row">
        <div className="db-panel db-col-6"><SessionsChart /></div>
        <div className="db-panel db-col-6"><PageViewsBarChart /></div>
      </section>

      {/* Dettagli: tabella + menu */}
      <section className="db-grid__row">
        <div className="db-panel db-col-9">
          <CustomizedDataGrid />
        </div>
        <div className="db-col-3">
          <SideMenuInline />
        </div>
      </section>
    </div>
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
