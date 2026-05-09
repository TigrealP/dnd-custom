import useCharacterStore from '../../store/characterStore'

const MAX_INVENTORY_SLOTS = 12

function InventorySection() {
  const { character, updateInventoryItem, updateCharacter } = useCharacterStore()
  const items = character.inventory?.items || Array(MAX_INVENTORY_SLOTS).fill(null).map(() => ({ nombre: '', descripcion: '', cantidad: 0, pesoUnd: 0 }))

  // Peso total llevado = suma de (cantidad * pesoUnd) de cada slot
  const pesoLlevado = items.reduce((acc, item) => {
    return acc + ((item.cantidad || 0) * (item.pesoUnd || 0))
  }, 0)

  const capacidad = character.inventory?.capacidad || 0
  const restante  = capacidad - pesoLlevado
  const sobrePeso = restante < 0

  const handleItemChange = (index, field) => (e) => {
    const newItems = items.map((item, i) => {
      if (i !== index) return item
      const val = (field === 'cantidad' || field === 'pesoUnd')
        ? parseFloat(e.target.value) || 0
        : e.target.value
      return { ...item, [field]: val }
    })
    updateCharacter('inventory', { ...character.inventory, items: newItems })
  }

  const handleCapacityChange = (e) => {
    updateCharacter('inventory', {
      ...character.inventory,
      capacidad: parseFloat(e.target.value) || 0,
    })
  }

  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>🎒 Mochila e Inventario</h3>

      {/* Barra de peso */}
      <div style={styles.weightBar}>
        <div style={styles.weightStat}>
          <span style={styles.weightLabel}>CAPACIDAD</span>
          <input
            type="number"
            value={capacidad}
            onChange={handleCapacityChange}
            style={styles.weightInput}
          />
        </div>
        <div style={styles.weightStat}>
          <span style={styles.weightLabel}>LLEVADO</span>
          <span style={{ ...styles.weightValue, color: sobrePeso ? '#e74c3c' : '#d4af37' }}>
            {pesoLlevado.toFixed(1)}
          </span>
        </div>
        <div style={styles.weightStat}>
          <span style={styles.weightLabel}>RESTANTE</span>
          <span style={{ ...styles.weightValue, color: sobrePeso ? '#e74c3c' : '#27ae60' }}>
            {restante.toFixed(1)}
          </span>
        </div>
        <div style={styles.weightStat}>
          <span style={styles.weightLabel}>SOBRE PESO</span>
          <span style={{ ...styles.weightValue, color: sobrePeso ? '#e74c3c' : '#555' }}>
            {sobrePeso ? Math.abs(restante).toFixed(1) : '—'}
          </span>
        </div>

        {/* Barra visual */}
        <div style={styles.progressBg}>
          <div style={{
            ...styles.progressFill,
            width: `${Math.min((pesoLlevado / Math.max(capacidad, 1)) * 100, 100)}%`,
            background: sobrePeso ? '#e74c3c' : '#d4af37',
          }} />
        </div>
      </div>

      {/* Tabla de ítems */}
      <div style={styles.tableHeader}>
        <span style={{ ...styles.col, width: '28px' }}>#</span>
        <span style={{ ...styles.col, flex: 2 }}>NOMBRE</span>
        <span style={{ ...styles.col, flex: 3 }}>DESCRIPCIÓN / EFECTO</span>
        <span style={{ ...styles.col, width: '55px' }}>CANT.</span>
        <span style={{ ...styles.col, width: '65px' }}>PESO Und.</span>
        <span style={{ ...styles.col, width: '65px', color: '#d4af37' }}>PESO TOT.</span>
      </div>

      {items.map((item, i) => {
        const pesoTotal = (item.cantidad || 0) * (item.pesoUnd || 0)
        return (
          <div key={i} style={styles.itemRow}>
            <span style={{ ...styles.indexCell }}>{i + 1}</span>
            <input
              type="text"
              value={item.nombre || ''}
              onChange={handleItemChange(i, 'nombre')}
              placeholder="—"
              style={{ ...styles.input, flex: 2 }}
            />
            <input
              type="text"
              value={item.descripcion || ''}
              onChange={handleItemChange(i, 'descripcion')}
              placeholder="—"
              style={{ ...styles.input, flex: 3 }}
            />
            <input
              type="number"
              value={item.cantidad || ''}
              onChange={handleItemChange(i, 'cantidad')}
              placeholder="0"
              style={{ ...styles.input, width: '55px' }}
              min={0}
            />
            <input
              type="number"
              value={item.pesoUnd || ''}
              onChange={handleItemChange(i, 'pesoUnd')}
              placeholder="0"
              step="0.1"
              style={{ ...styles.input, width: '65px' }}
              min={0}
            />
            <span style={styles.totalWeight}>
              {pesoTotal > 0 ? pesoTotal.toFixed(1) : '—'}
            </span>
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
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  weightBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '12px 16px',
    background: '#0d0d1a',
    borderRadius: '8px',
    border: '1px solid #2a2a3e',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  weightStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'center',
  },
  weightLabel: {
    color: '#555',
    fontSize: '0.6rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  weightValue: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  weightInput: {
    width: '70px',
    padding: '4px 8px',
    background: '#1a1a2e',
    border: '1px solid #333',
    borderRadius: '4px',
    color: '#d4af37',
    fontSize: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
    outline: 'none',
  },
  progressBg: {
    flex: 1,
    minWidth: '100px',
    height: '6px',
    background: '#1a1a2e',
    borderRadius: '3px',
    overflow: 'hidden',
    border: '1px solid #333',
    alignSelf: 'center',
  },
  progressFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease, background 0.3s ease',
  },
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 8px',
    borderBottom: '1px solid #333',
    marginBottom: '4px',
  },
  col: {
    color: '#555',
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '3px 8px',
    borderRadius: '4px',
    marginBottom: '2px',
  },
  indexCell: {
    width: '28px',
    color: '#444',
    fontSize: '0.75rem',
    textAlign: 'center',
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
  totalWeight: {
    width: '65px',
    textAlign: 'center',
    color: '#d4af37',
    fontSize: '0.85rem',
    flexShrink: 0,
  },
}

export default InventorySection
