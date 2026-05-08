// Las props son como parámetros de función — datos que el padre le pasa al hijo
function Navbar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'character', label: '⚔️ Personaje' },
    { id: 'dice',      label: '🎲 Dados' },
  ]

  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>D&D Custom</span>
      <div style={styles.tabs}>
        {/* Esto es un .map() — como un foreach que retorna HTML */}
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              ...styles.tab,
              // Si la tab está activa, agrega estilos extra
              ...(activeTab === tab.id ? styles.activeTab : {})
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    background: '#1a1a2e',
    borderBottom: '2px solid #d4af37',
  },
  logo: {
    color: '#d4af37',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  tabs: {
    display: 'flex',
    gap: '8px',
  },
  tab: {
    padding: '8px 20px',
    background: 'transparent',
    border: '1px solid #444',
    borderRadius: '6px',
    color: '#ccc',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  activeTab: {
    background: '#d4af37',
    color: '#1a1a2e',
    border: '1px solid #d4af37',
    fontWeight: 'bold',
  },
}

export default Navbar