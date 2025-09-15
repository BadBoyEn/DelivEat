import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export default function SessionsChart({ data }) {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          {/* -- COMMENTO -- Colori dal tema */}
          <Line type="monotone" dataKey="current"  name="Ordini 30 giorni"       stroke="var(--chart-current)"  strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="previous" name="Ordini mese precedente" stroke="var(--chart-previous)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
