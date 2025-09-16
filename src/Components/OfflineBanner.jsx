export default function OfflineBanner({ reason }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: 'var(--surface-2,#f7f7f7)',
      borderBottom: '1px solid var(--border-weak,#dadada)',
      padding: '10px 14px', fontSize: 14
    }}>
      <strong>Backend non raggiungibile.</strong>
      <span style={{ opacity: .8, marginLeft: 8 }}>
        Alcune sezioni (es. Dashboard) sono disabilitate {reason === 'static-gh-pages' ? 'su GitHub Pages.' : '' }
      </span>
    </div>
  );
}
