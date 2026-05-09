import { useEffect, useState } from 'react'
import useCharacterStore from '../../store/characterStore'
import VitalsSection from './VitalsSection'
import AttributesSection from './AttributesSection'
import QualitiesSection from './QualitiesSection'
import EquipmentSection from './EquipmentSection'
import InventorySection from './InventorySection'

// Tabs internos de la ficha
const SHEET_TABS = [
  { id: 'identity',   label: '📜 Identidad'  },
  { id: 'qualities',  label: '📚 Cualidades' },
  { id: 'equipment',  label: '🛡️ Equipo'    },
  { id: 'inventory',  label: '🎒 Inventario' },
]

function CharacterSheet() {
  const { character, updateCharacter, saveToLocal, loadFromLocal } = useCharacterStore()
  const [activeSection, setActiveSection] = useState('identity')

  useEffect(() => {
    loadFromLocal()
  }, [])

  const handleChange = (field) => (e) => {
    updateCharacter(field, e.target.value)
  }

  return (
    <div style={styles.sheet}>

      {/* CABECERA */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>✦ Ficha de Personaje ✦</h2>
          <p style={styles.charName}>{character.name || 'Sin nombre'}</p>
        </div>
        <button onClick={saveToLocal} style={styles.saveBtn}>
          💾 Guardar
        </button>
      </div>

      {/* TABS INTERNOS */}
      <div style={styles.tabsRow}>
        {SHEET_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              ...styles.sheetTab,
              ...(activeSection === tab.id ? styles.sheetTabActive : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENIDO SEGÚN TAB */}
      {activeSection === 'identity' && (
        <>
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
              <Field label="Descendencia" value={character.descendencia || ''} onChange={handleChange('descendencia')} />
            </div>
          </section>

          {/* DATOS PERSONALES */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>📜 Datos Personales</h3>
            <div style={styles.grid3}>
              <Field label="Estatura"    value={character.height}    onChange={handleChange('height')} />
              <Field label="Peso"        value={character.weight}    onChange={handleChange('weight')} type="number" />
              <Field label="Piel"        value={character.skin}      onChange={handleChange('skin')} />
              <Field label="Ojos"        value={character.eyes}      onChange={handleChange('eyes')} />
              <Field label="Pelo"        value={character.hair}      onChange={handleChange('hair')} />
              <Field label="Actitud"     value={character.attitude}  onChange={handleChange('attitude')} />
              <Field label="Alineación"  value={character.alignment} onChange={handleChange('alignment')} />
            </div>
            <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <TextArea label="Rasgo Distintivo" value={character.trait}    onChange={handleChange('trait')} />
              <TextArea label="Gustos"           value={character.likes}    onChange={handleChange('likes')} />
              <TextArea label="Disgustos"        value={character.dislikes} onChange={handleChange('dislikes')} />
              <TextArea label="Notas"            value={character.notes}    onChange={handleChange('notes')} />
            </div>
          </section>

          {/* VITALES */}
          <VitalsSection character={character} onChange={handleChange} />

          {/* ATRIBUTOS */}
          <AttributesSection />
        </>
      )}

      {activeSection === 'qualities'  && <QualitiesSection />}
      {activeSection === 'equipment'  && <EquipmentSection />}
      {activeSection === 'inventory'  && <InventorySection />}

    </div>
  )
}

// ─── Componentes helper ───────────────────────────────────────────────────────

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <input type={type} value={value} onChange={onChange} style={styles.input} />
    </div>
  )
}

function TextArea({ label, value, onChange }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        rows={3}
        style={{ ...styles.input, resize: 'vertical', fontFamily: 'inherit' }}
      />
    </div>
  )
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = {
  sheet: {
    maxWidth: '960px',
    margin: '0 auto',
    background: '#1a1a2e',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #d4af37',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  title: {
    color: '#d4af37',
    fontSize: '1.4rem',
    letterSpacing: '3px',
    margin: 0,
  },
  charName: {
    color: '#888',
    fontSize: '0.9rem',
    margin: '4px 0 0 0',
    fontStyle: 'italic',
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
  tabsRow: {
    display: 'flex',
    gap: '4px',
    marginBottom: '20px',
    borderBottom: '1px solid #333',
    paddingBottom: '0',
  },
  sheetTab: {
    padding: '8px 18px',
    background: 'transparent',
    border: '1px solid transparent',
    borderBottom: 'none',
    borderRadius: '6px 6px 0 0',
    color: '#777',
    cursor: 'pointer',
    fontSize: '0.88rem',
    transition: 'all 0.15s',
    marginBottom: '-1px',
  },
  sheetTabActive: {
    background: '#1a1a2e',
    border: '1px solid #333',
    borderBottom: '1px solid #1a1a2e',
    color: '#d4af37',
    fontWeight: 'bold',
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
