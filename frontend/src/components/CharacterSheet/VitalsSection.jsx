function VitalsSection({ character, onChange }) {
  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>⚔️ Vitales</h3>

      <div style={styles.grid4}>
        <StatBox
          label="❤️ Vida"
          value={character.hp}
          max={character.hpMax}
          onChange={onChange('hp')}
          onChangeMax={onChange('hpMax')}
          color="#e74c3c"
        />
        <StatBox
          label="✦ Mana"
          value={character.mana}
          max={character.manaMax}
          onChange={onChange('mana')}
          onChangeMax={onChange('manaMax')}
          color="#3498db"
        />
        <Simplestat label="Iniciativa" value={character.initiative} onChange={onChange('initiative')} />
        <Simplestat label="Dinero"     value={character.money}      onChange={onChange('money')} />
        <Simplestat label="Karma"      value={character.karma}      onChange={onChange('karma')} />
        <Simplestat label="EXP"        value={character.experience} onChange={onChange('experience')} />
      </div>

      {/* Barra visual de vida */}
      <div style={styles.barContainer}>
        <label style={styles.barLabel}>Vida</label>
        <div style={styles.barBg}>
          <div style={{
            ...styles.barFill,
            width: `${(character.hp / character.hpMax) * 100}%`,
            background: '#e74c3c',
          }} />
        </div>
        <span style={styles.barText}>{character.hp} / {character.hpMax}</span>
      </div>

      <div style={styles.barContainer}>
        <label style={styles.barLabel}>Mana</label>
        <div style={styles.barBg}>
          <div style={{
            ...styles.barFill,
            width: `${(character.mana / character.manaMax) * 100}%`,
            background: '#3498db',
          }} />
        </div>
        <span style={styles.barText}>{character.mana} / {character.manaMax}</span>
      </div>

    </section>
  )
}

// Stat con valor actual y máximo (vida, mana)
function StatBox({ label, value, max, onChange, onChangeMax, color }) {
  return (
    <div style={{ ...styles.statBox, borderColor: color }}>
      <span style={{ ...styles.statLabel, color }}>{label}</span>
      <div style={styles.statInputs}>
        <input type="number" value={value} onChange={onChange} style={styles.statInput} />
        <span style={styles.statSep}>/</span>
        <input type="number" value={max} onChange={onChangeMax} style={styles.statInput} />
      </div>
    </div>
  )
}

// Stat simple (un solo número)
function Simplestat({ label, value, onChange }) {
  return (
    <div style={styles.simpleStat}>
      <label style={styles.statLabel}>{label}</label>
      <input type="number" value={value} onChange={onChange} style={styles.statInput} />
    </div>
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
  grid4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '16px',
  },
  statBox: {
    padding: '12px',
    background: '#0d0d1a',
    borderRadius: '8px',
    border: '2px solid',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  statLabel: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#888',
  },
  statInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  statInput: {
    width: '56px',
    padding: '6px 8px',
    background: '#1a1a2e',
    border: '1px solid #333',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '1.1rem',
    textAlign: 'center',
    outline: 'none',
  },
  statSep: {
    color: '#555',
    fontSize: '1.1rem',
  },
  simpleStat: {
    padding: '12px',
    background: '#0d0d1a',
    borderRadius: '8px',
    border: '1px solid #333',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  barContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  barLabel: {
    color: '#888',
    fontSize: '0.75rem',
    width: '40px',
    textTransform: 'uppercase',
  },
  barBg: {
    flex: 1,
    height: '8px',
    background: '#0d0d1a',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid #333',
  },
  barFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  barText: {
    color: '#888',
    fontSize: '0.8rem',
    width: '60px',
    textAlign: 'right',
  },
}

export default VitalsSection