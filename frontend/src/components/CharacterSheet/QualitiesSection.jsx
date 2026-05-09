import useCharacterStore from '../../store/characterStore'

// Lista completa de cualidades según el Excel del Jefe Tejón
const QUALITIES_LIST = [
  { key: 'actuacion',     label: '🎭 Actuación' },
  { key: 'acrobacias',    label: '🤸 Acrobacias' },
  { key: 'arte',          label: '🎨 Arte' },
  { key: 'atraccion',     label: '✨ Atracción' },
  { key: 'atletismo',     label: '🏃 Atletismo' },
  { key: 'cArcano',       label: '🔮 C. Arcano' },
  { key: 'calle',         label: '🗡️ Calle' },
  { key: 'ciencia',       label: '🔬 Ciencia' },
  { key: 'cultura',       label: '🏛️ Cultura' },
  { key: 'equilibrio',    label: '⚖️ Equilibrio' },
  { key: 'fauna',         label: '🦁 Fauna' },
  { key: 'flora',         label: '🌿 Flora' },
  { key: 'geografia',     label: '🗺️ Geografía' },
  { key: 'historia',      label: '📜 Historia' },
  { key: 'intimidacion',  label: '😠 Intimidación' },
  { key: 'investigacion', label: '🔍 Investigación' },
  { key: 'medicina',      label: '⚕️ Medicina' },
  { key: 'mentira',       label: '🤥 Mentira' },
  { key: 'monta',         label: '🐴 Monta' },
  { key: 'motivacion',    label: '💪 Motivación' },
  { key: 'negociacion',   label: '💼 Negociación' },
  { key: 'persuasion',    label: '🗣️ Persuasión' },
  { key: 'politica',      label: '🏰 Política' },
  { key: 'religion',      label: '🙏 Religión' },
  { key: 'sigilo',        label: '🥷 Sigilo' },
  { key: 'tratoAnimales', label: '🐕 Trato Animales' },
  { key: 'cLiteratura',   label: '📚 C. Literatura' },
  { key: 'cOcultismo',    label: '💀 C. Ocultismo' },
]

function QualitiesSection() {
  const { character, updateQuality } = useCharacterStore()

  const handleChange = (key, field) => (e) => {
    const val = parseInt(e.target.value) || 0
    updateQuality(key, { ...character.qualities[key], [field]: val })
  }

  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>📚 Cualidades</h3>

      {/* Header de columnas */}
      <div style={styles.tableHeader}>
        <span style={{ ...styles.colHeader, flex: 2 }}>CUALIDAD</span>
        <span style={styles.colHeader}>BASE</span>
        <span style={styles.colHeader}>IMPULSO</span>
        <span style={styles.colHeader}>MEJORA</span>
        <span style={styles.colHeader}>ITEM</span>
        <span style={{ ...styles.colHeader, color: '#d4af37' }}>TOTAL</span>
      </div>

      {/* Filas de cualidades */}
      {QUALITIES_LIST.map(({ key, label }) => {
        const q = character.qualities[key] || { base: 0, impulso: 0, mejora: 0, item: 0 }
        const total = (q.base || 0) + (q.impulso || 0) + (q.mejora || 0) + (q.item || 0)

        return (
          <div key={key} style={styles.row}>
            <span style={{ ...styles.qualLabel, flex: 2 }}>{label}</span>

            <NumInput value={q.base}    onChange={handleChange(key, 'base')} />
            <NumInput value={q.impulso} onChange={handleChange(key, 'impulso')} />
            <NumInput value={q.mejora}  onChange={handleChange(key, 'mejora')} />
            <NumInput value={q.item}    onChange={handleChange(key, 'item')} />

            {/* Total calculado automáticamente */}
            <span style={styles.totalCell}>{total}</span>
          </div>
        )
      })}

      {/* Campo libre "Otro" */}
      <div style={styles.otherRow}>
        <span style={styles.otherLabel}>Otro…</span>
        <input
          type="text"
          value={character.qualities.otro1Name || ''}
          onChange={(e) => updateQuality('otro1Name', e.target.value)}
          placeholder="Nombre"
          style={styles.otherNameInput}
        />
        <NumInput
          value={character.qualities.otro1 || 0}
          onChange={(e) => updateQuality('otro1', parseInt(e.target.value) || 0)}
        />
      </div>
      <div style={styles.otherRow}>
        <span style={styles.otherLabel}>Otro…</span>
        <input
          type="text"
          value={character.qualities.otro2Name || ''}
          onChange={(e) => updateQuality('otro2Name', e.target.value)}
          placeholder="Nombre"
          style={styles.otherNameInput}
        />
        <NumInput
          value={character.qualities.otro2 || 0}
          onChange={(e) => updateQuality('otro2', parseInt(e.target.value) || 0)}
        />
      </div>
    </section>
  )
}

// Input numérico compacto reutilizable
function NumInput({ value, onChange }) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      style={styles.numInput}
      min={0}
    />
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
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    marginBottom: '4px',
    borderBottom: '1px solid #333',
  },
  colHeader: {
    flex: 1,
    color: '#666',
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 12px',
    borderRadius: '4px',
    transition: 'background 0.15s',
    ':hover': { background: 'rgba(255,255,255,0.02)' },
  },
  qualLabel: {
    color: '#ccc',
    fontSize: '0.85rem',
    flex: 2,
  },
  numInput: {
    flex: 1,
    width: '48px',
    padding: '4px 6px',
    background: '#0d0d1a',
    border: '1px solid #2a2a3e',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '0.9rem',
    textAlign: 'center',
    outline: 'none',
  },
  totalCell: {
    flex: 1,
    textAlign: 'center',
    color: '#d4af37',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    minWidth: '48px',
  },
  otherRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 12px',
    marginTop: '4px',
  },
  otherLabel: {
    color: '#555',
    fontSize: '0.8rem',
    width: '60px',
    fontStyle: 'italic',
  },
  otherNameInput: {
    flex: 2,
    padding: '4px 8px',
    background: '#0d0d1a',
    border: '1px solid #2a2a3e',
    borderRadius: '4px',
    color: '#ccc',
    fontSize: '0.85rem',
    outline: 'none',
  },
}

export default QualitiesSection
