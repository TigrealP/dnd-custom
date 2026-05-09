import useCharacterStore from '../../store/characterStore'

// Los 11 slots de equipo del Excel del Jefe Tejón
const EQUIPMENT_SLOTS = [
  { key: 'cabeza',          label: '🪖 CABEZA' },
  { key: 'torso',           label: '🥋 TORSO' },
  { key: 'espalda',         label: '🎒 ESPALDA' },
  { key: 'cuerpo',          label: '👕 CUERPO' },
  { key: 'piernas',         label: '👖 PIERNAS' },
  { key: 'pies',            label: '👢 PIES' },
  { key: 'accesorio1',      label: '💍 ACCESORIO 1' },
  { key: 'accesorio2',      label: '📿 ACCESORIO 2' },
  { key: 'armaPrincipal',   label: '⚔️ ARMA PRINCIPAL' },
  { key: 'armaSecundaria',  label: '🗡️ ARMA SECUNDARIA' },
  { key: 'escudo',          label: '🛡️ ESCUDO' },
]

function EquipmentSection() {
  const { character, updateEquipmentSlot } = useCharacterStore()

  const handleChange = (slotKey, field) => (e) => {
    updateEquipmentSlot(slotKey, {
      ...character.equipment[slotKey],
      [field]: e.target.value,
    })
  }

  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>🛡️ Equipo</h3>

      {/* Header */}
      <div style={styles.headerRow}>
        <span style={{ ...styles.colH, width: '130px' }}>PARTE</span>
        <span style={{ ...styles.colH, flex: 3 }}>NOMBRE</span>
        <span style={{ ...styles.colH, width: '60px' }}>AVERÍA</span>
        <span style={{ ...styles.colH, width: '55px' }}>PESO</span>
        <span style={{ ...styles.colH, flex: 3 }}>EFECTO</span>
        <span style={{ ...styles.colH, width: '65px' }}>PROTEC.</span>
        <span style={{ ...styles.colH, width: '60px' }}>DAÑO</span>
      </div>

      {/* Filas de equipo */}
      {EQUIPMENT_SLOTS.map(({ key, label }) => {
        const slot = character.equipment[key] || {}
        return (
          <div key={key} style={styles.row}>
            <span style={styles.slotLabel}>{label}</span>

            <input
              type="text"
              value={slot.nombre || ''}
              onChange={handleChange(key, 'nombre')}
              placeholder="—"
              style={{ ...styles.input, flex: 3 }}
            />
            <input
              type="number"
              value={slot.averia || ''}
              onChange={handleChange(key, 'averia')}
              placeholder="0"
              style={{ ...styles.input, width: '60px' }}
            />
            <input
              type="number"
              value={slot.peso || ''}
              onChange={handleChange(key, 'peso')}
              placeholder="0"
              style={{ ...styles.input, width: '55px' }}
            />
            <input
              type="text"
              value={slot.efecto || ''}
              onChange={handleChange(key, 'efecto')}
              placeholder="—"
              style={{ ...styles.input, flex: 3 }}
            />
            <input
              type="number"
              value={slot.proteccion || ''}
              onChange={handleChange(key, 'proteccion')}
              placeholder="0"
              style={{ ...styles.input, width: '65px' }}
            />
            <input
              type="text"
              value={slot.dano || ''}
              onChange={handleChange(key, 'dano')}
              placeholder="—"
              style={{ ...styles.input, width: '60px' }}
            />
          </div>
        )
      })}
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
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 8px',
    borderBottom: '1px solid #333',
    marginBottom: '4px',
  },
  colH: {
    color: '#555',
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 8px',
    borderRadius: '4px',
    marginBottom: '2px',
  },
  slotLabel: {
    width: '130px',
    color: '#aaa',
    fontSize: '0.78rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    flexShrink: 0,
  },
  input: {
    padding: '5px 8px',
    background: '#0d0d1a',
    border: '1px solid #2a2a3e',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '0.85rem',
    outline: 'none',
    minWidth: 0,
  },
}

export default EquipmentSection
