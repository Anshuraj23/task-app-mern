const StatsBar = ({ stats }) => {
  const items = [
    { label: 'Total', value: stats.total, color: '#4f46e5' },
    { label: 'Completed', value: stats.completed, color: '#10b981' },
    { label: 'Pending', value: stats.pending, color: '#f59e0b' },
    { label: 'Overdue', value: stats.overdue, color: '#ef4444' },
  ];

  return (
    <div style={styles.container}>
      {items.map(item => (
        <div key={item.label} style={styles.card}>
          <div style={{...styles.value, color: item.color}}>{item.value}</div>
          <div style={styles.label}>{item.label}</div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' },
  card: { background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', flex: 1, minWidth: '120px', textAlign: 'center' },
  value: { fontSize: '32px', fontWeight: 'bold' },
  label: { fontSize: '14px', color: '#666', marginTop: '4px' }
};

export default StatsBar;