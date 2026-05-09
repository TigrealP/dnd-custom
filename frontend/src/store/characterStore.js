import { create } from 'zustand'

// Genera el estado inicial de una cualidad con sus 4 sub-campos
const emptyQuality = () => ({ base: 0, impulso: 0, mejora: 0, item: 0 })

// Genera un slot de equipo vacío
const emptySlot = () => ({ nombre: '', averia: 0, peso: 0, efecto: '', proteccion: 0, dano: '' })

// Genera un ítem de inventario vacío
const emptyItem = () => ({ nombre: '', descripcion: '', cantidad: 0, pesoUnd: 0 })

const useCharacterStore = create((set) => ({

  // ─────────────────────────────────────────────
  //  ESTADO INICIAL DEL PERSONAJE
  // ─────────────────────────────────────────────
  character: {
    // Identidad
    name: '',
    race: '',
    level: 1,
    profession: '',
    professionB: '',
    origin: '',
    deity: '',

    // Vitales
    hp: 5,
    hpMax: 5,
    hpRes: 1,
    mana: 5,
    manaMax: 5,
    manaRes: 1,
    initiative: 0,
    money: 0,
    karma: 0,
    bajas: 0,
    experience: 0,

    // Sistema de supervivencia
    energia: 100,
    alimentacion: 100,
    hidratacion: 100,
    hambre: 0,
    sed: 0,

    // Estadísticas base
    attack: 0,
    shield: 0,
    evasion: 0,
    resistance: 0,
    aim: 0,
    magic: 0,
    rElemental: 0,
    rMagica: 0,

    // Datos personales
    height: '',
    weight: 0,
    skin: '',
    eyes: '',
    hair: '',
    attitude: '',
    alignment: '',
    descendencia: '',
    trait: '',
    likes: '',
    dislikes: '',
    notes: '',

    // Atributos (14) — cada uno con sub-campos: raza, inicio, item1, item2, mejora, bendicion, maldicion, hs, total
    attributes: {
      fineMotor:         0,
      intuition:         0,
      perception:        0,
      charisma:          0,
      willpower:         0,
      luck:              0,
      constitution:      0,
      strength:          0,
      reflexes:          0,
      intelligence:      0,
      elementalAffinity: 0,
      concentration:     0,
      wisdom:            0,
      faith:             0,
    },

    // Cualidades (28 + 2 libres) — cada una con base/impulso/mejora/item → total calculado en UI
    qualities: {
      actuacion:     emptyQuality(),
      acrobacias:    emptyQuality(),
      arte:          emptyQuality(),
      atraccion:     emptyQuality(),
      atletismo:     emptyQuality(),
      cArcano:       emptyQuality(),
      calle:         emptyQuality(),
      ciencia:       emptyQuality(),
      cultura:       emptyQuality(),
      equilibrio:    emptyQuality(),
      fauna:         emptyQuality(),
      flora:         emptyQuality(),
      geografia:     emptyQuality(),
      historia:      emptyQuality(),
      intimidacion:  emptyQuality(),
      investigacion: emptyQuality(),
      medicina:      emptyQuality(),
      mentira:       emptyQuality(),
      monta:         emptyQuality(),
      motivacion:    emptyQuality(),
      negociacion:   emptyQuality(),
      persuasion:    emptyQuality(),
      politica:      emptyQuality(),
      religion:      emptyQuality(),
      sigilo:        emptyQuality(),
      tratoAnimales: emptyQuality(),
      cLiteratura:   emptyQuality(),
      cOcultismo:    emptyQuality(),
      // Campos libres
      otro1Name: '',
      otro1: 0,
      otro2Name: '',
      otro2: 0,
    },

    // Equipo (11 slots)
    equipment: {
      cabeza:         emptySlot(),
      torso:          emptySlot(),
      espalda:        emptySlot(),
      cuerpo:         emptySlot(),
      piernas:        emptySlot(),
      pies:           emptySlot(),
      accesorio1:     emptySlot(),
      accesorio2:     emptySlot(),
      armaPrincipal:  emptySlot(),
      armaSecundaria: emptySlot(),
      escudo:         emptySlot(),
    },

    // Inventario
    inventory: {
      capacidad: 0,
      items: Array(12).fill(null).map(() => emptyItem()),
    },
  },

  // ─────────────────────────────────────────────
  //  ACCIONES
  // ─────────────────────────────────────────────

  // Campo simple del personaje (name, race, level, etc.)
  updateCharacter: (field, value) =>
    set((state) => ({
      character: { ...state.character, [field]: value }
    })),

  // Atributo numérico (fuerza, inteligencia, etc.)
  updateAttribute: (attr, value) =>
    set((state) => ({
      character: {
        ...state.character,
        attributes: { ...state.character.attributes, [attr]: value }
      }
    })),

  // Cualidad — key puede ser una string ('actuacion') o un campo libre ('otro1Name')
  // value puede ser un objeto {base,impulso,mejora,item} o un valor primitivo
  updateQuality: (key, value) =>
    set((state) => ({
      character: {
        ...state.character,
        qualities: { ...state.character.qualities, [key]: value }
      }
    })),

  // Slot de equipo
  updateEquipmentSlot: (slotKey, slotData) =>
    set((state) => ({
      character: {
        ...state.character,
        equipment: { ...state.character.equipment, [slotKey]: slotData }
      }
    })),

  // Guardar en localStorage
  saveToLocal: () =>
    set((state) => {
      localStorage.setItem('dnd-character', JSON.stringify(state.character))
      return state
    }),

  // Cargar desde localStorage
  loadFromLocal: () =>
    set(() => {
      const saved = localStorage.getItem('dnd-character')
      if (!saved) return {}
      return { character: JSON.parse(saved) }
    }),

}))

export default useCharacterStore
