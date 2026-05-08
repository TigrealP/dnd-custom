import { create } from 'zustand'

// create() es como definir una clase Singleton con estado reactivo.
// Cualquier componente que lo use se re-renderiza automáticamente
// cuando alguno de estos valores cambia.

const useCharacterStore = create((set) => ({

  // --- ESTADO INICIAL DEL PERSONAJE ---
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
    mana: 5,
    manaMax: 5,
    initiative: 0,
    money: 0,
    karma: 0,
    experience: 0,

    // Estadísticas base
    attack: 0,
    shield: 0,
    evasion: 0,
    resistance: 0,
    aim: 0,
    magic: 0,

    // Atributos (los 14 del sistema)
    attributes: {
      fineMotor: 0,
      intuition: 0,
      perception: 0,
      charisma: 0,
      willpower: 0,
      luck: 0,
      constitution: 0,
      strength: 0,
      reflexes: 0,
      intelligence: 0,
      elementalAffinity: 0,
      concentration: 0,
      wisdom: 0,
      faith: 0,
    },

    // Cualidades (las 30 del sistema)
    qualities: {
      acting: 0,
      acrobatics: 0,
      art: 0,
      athletics: 0,
      arcaneLore: 0,
      streetwise: 0,
      science: 0,
      culture: 0,
      balance: 0,
      fauna: 0,
      flora: 0,
      geography: 0,
      history: 0,
      intimidation: 0,
      investigation: 0,
      medicine: 0,
      deception: 0,
      riding: 0,
      motivation: 0,
      negotiation: 0,
      persuasion: 0,
      politics: 0,
      religion: 0,
      stealth: 0,
      animalHandling: 0,
      literature: 0,
      occultism: 0,
    },

    // Datos personales
    height: '',
    weight: '',
    skin: '',
    eyes: '',
    hair: '',
    attitude: '',
    alignment: '',
    trait: '',
    likes: '',
    dislikes: '',
    notes: '',
  },

  // --- ACCIONES ---
  // set() es como llamar a setState en otros frameworks.
  // Recibe el estado anterior y retorna solo lo que cambió.

  updateCharacter: (field, value) =>
    set((state) => ({
      character: { ...state.character, [field]: value }
    })),

  updateAttribute: (attr, value) =>
    set((state) => ({
      character: {
        ...state.character,
        attributes: { ...state.character.attributes, [attr]: value }
      }
    })),

  updateQuality: (quality, value) =>
    set((state) => ({
      character: {
        ...state.character,
        qualities: { ...state.character.qualities, [quality]: value }
      }
    })),

  // Guardar en localStorage (persiste entre recargas)
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