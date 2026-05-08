import useCharacterStore from '../../store/characterStore'

// Mapeo legible de los nombres internos a español
const ATTRIBUTE_LABELS = {
  fineMotor:          'Motora Fina',
  intuition:          'Intuición',
  perception:         'Percepción',
  charisma:           'Carisma',
  willpower:          'Voluntad',
  luck:               'Suerte',
  constitution:       'Constitución',
  strength:           'Fuerza',
  reflexes:           'Reflejos',
  intelligence:       'Inteligencia',
  elementalAffinity:  'Afinidad Elemental',
  concentration:      'Concentración',
  wisdom:             'Sabiduría',
  faith:              'Fe',
}

function AttributesSection() {
  const { character, updateAttribute } = useCharacterStore()

  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>🌟 Atributos</h3>
      <div style={styles.grid}>

        {/* Object.entries convierte el objeto en pares [clave, valor]
            — como .entrySet() en Java o .items() en Python */}
        {Object.entries(character.attributes).map(([key, value]) => (
          <div key={key} style={styles.attrRow}>
            <span style={styles.attrLabel}>{ATTRIBUTE_LABELS[key]}</span>
            <div style={styles.attrControls}>
              {/* Botón - */}
              <button
                onClick={() => updateAttribute(key, Math.max(0, value - 1))}
                style={styles.btn}
              >
                −
              </button>
              <span style={styles.attrValue}>{value}</span>
              {/* Botón + */}
              <button
                onClick={() => updateAttribute(key, value + 1)}
                style={styles.btn}
              >
                +
              </button>
            </div>
            {/* Barra visual del atributo */}
            <div style={styles.miniBarBg}>
              <div style={{
                ...styles.miniBarFill,
                width: `${Math.min(value * 5, 100)}%`,
              }} />
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

const styles = {
  section: {
    marginBottom: '24px',
    padding: '16px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '8px',
    border: '1px solid #333',
  },
  sectionTitle: {
    color: '#d4af37',
    fontSize: '1rem',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
  },
  attrRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    background: '#0d0d1a',
    borderRadius: '6px',
    border: '1px solid #222',
  },
  attrLabel: {
    flex: 1,
    color: '#ccc',
    fontSize: '0.85rem',
  },
  attrControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  attrValue: {
    color: '#d4af37',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    width: '28px',
    textAlign: 'center',
  },
  btn: {
    width: '24px',
    height: '24px',
    background: '#1a1a2e',
    border: '1px solid #444',
    borderRadius: '4px',
    color: '#d4af37',
    cursor: 'pointer',
    fontSize: '1rem',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniBarBg: {
    width: '60px',
    height: '4px',
    background: '#222',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  miniBarFill: {
    height: '100%',
    background: '#d4af37',
    borderRadius: '2px',
    transition: 'width 0.2s ease',
  },
}

export default AttributesSection