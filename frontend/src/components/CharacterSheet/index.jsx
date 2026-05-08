import { useEffect } from 'react'
import useCharacterStore from '../../store/characterStore'
import VitalsSection from './VitalsSection'
import AttributesSection from './AttributesSection'

function CharacterSheet() {
  // Esto es como inyectar el Singleton — cualquier cambio aquí
  // se refleja en todos los componentes que usen el mismo store
  const { character, updateCharacter, saveToLocal, loadFromLocal } = useCharacterStore()

  // useEffect con [] vacío = "ejecuta esto UNA sola vez al montar el componente"
  // Equivale al constructor o al onInit de otros frameworks
  useEffect(() => {
    loadFromLocal()
  }, [])

  // Función reutilizable para manejar cualquier input de texto
  const handleChange = (field) => (e) => {
    updateCharacter(field, e.target.value)
  }

  return (
    <div style={styles.sheet}>

      {/* CABECERA */}
      <div style={styles.header}>
        <h2 style={styles.title}>✦ Ficha de Personaje ✦</h2>
        <button onClick={saveToLocal} style={styles.saveBtn}>
          💾 Guardar
        </button>
      </div>

      {/* IDENTIDAD */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Identidad</h3>
        <div style={styles.grid3}>
          <Field label="Nombre"      value={character.name}        onChange={handleChange('name')} />
          <Field label="Raza"        value={character.race}        onChange={handleChange('race')} />
          <Field label="Nivel"       value={character.level}       onChange={handleChange('level')} type="number" />
          <Field label="Profesión A" value={character.profession}  onChange={handleChange('profession')} />
          <Field label="Profesión B" value={character.professionB} onChange={handleChange('professionB')} />
          <Field label="Origen"      value={character.origin}      onChange={handleChange('origin')} />
          <Field label="Deidad"      value={character.deity}       onChange={handleChange('deity')} />
        </div>
      </section>

      {/* VITALES */}
      <VitalsSection character={character} onChange={handleChange} />

      {/* ATRIBUTOS */}
      <AttributesSection />

    </div>
  )
}

// Componente pequeño reutilizable — un input con su label
// Nota: esto va en el mismo archivo porque es solo para CharacterSheet
function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={styles.input}
      />
    </div>
  )
}

const styles = {
  sheet: {
    maxWidth: '900px',
    margin: '0 auto',
    background: '#1a1a2e',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #d4af37',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  title: {
    color: '#d4af37',
    fontSize: '1.4rem',
    letterSpacing: '3px',
  },
  saveBtn: {
    padding: '8px 20px',
    background: '#d4af37',
    color: '#1a1a2e',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
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
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    color: '#888',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  input: {
    padding: '8px 12px',
    background: '#0d0d1a',
    border: '1px solid #333',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
  },
}

export default CharacterSheet