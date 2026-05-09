# D&D Custom — Plataforma Web

> **Sistema RPG casero creado por El Jefe Tejón.**
> Este repositorio es la migración del sistema original (Excel + HTML monolítico con Firebase) a una plataforma web moderna, modular y escalable con soporte multijugador en tiempo real.

---

## Índice

1. [Contexto del proyecto](#1-contexto-del-proyecto)
2. [Fuentes de verdad (legacy)](#2-fuentes-de-verdad-legacy)
3. [Estado actual del frontend](#3-estado-actual-del-frontend)
4. [Arquitectura objetivo](#4-arquitectura-objetivo)
5. [Stack tecnológico](#5-stack-tecnológico)
6. [Estructura de carpetas](#6-estructura-de-carpetas)
7. [Modelo de datos del personaje](#7-modelo-de-datos-del-personaje)
8. [Componentes implementados](#8-componentes-implementados)
9. [Componentes pendientes](#9-componentes-pendientes)
10. [Roadmap completo](#10-roadmap-completo)
11. [Convenciones de código](#11-convenciones-de-código)
12. [Decisiones de arquitectura](#12-decisiones-de-arquitectura)
13. [Instrucciones para continuar con otra IA](#13-instrucciones-para-continuar-con-otra-ia)

---

## 1. Contexto del proyecto

Este no es un clon de D&D estándar. Es una plataforma para un **sistema RPG propio** llamado **D&D Custom**, con sus propias reglas, atributos, cualidades y economía. Todo el sistema de reglas fue diseñado por **El Jefe Tejón** y documentado originalmente en un Excel.

### Objetivo principal

Convertir el sistema en una **web app multijugador** donde los jugadores y el Master puedan:

- Gestionar sus fichas de personaje en tiempo real
- Tirar dados con historial compartido
- Ver el estado de todos los jugadores simultáneamente
- Acceder desde cualquier dispositivo sin instalar nada

### Lo que NO queremos

- Un clon genérico de D&D 5e
- Perder ninguna regla o campo del sistema original
- Romper la estética medieval/dark fantasy que ya tienen

---

## 2. Fuentes de verdad (legacy)

Antes de tocar cualquier cosa, leer estas dos fuentes. Son la referencia autoritativa del sistema.

### 2.1 `Ficha.xlsx` — Sistema maestro

El Excel tiene las siguientes hojas:

| Hoja | Contenido |
|------|-----------|
| `pj` | Ficha completa de un jugador (la plantilla maestra) |
| `pj (2)` | Segunda copia idéntica de la plantilla |
| `Batalla` | Control de HP/Mana de hasta 6 jugadores + 6 NPCs en combate |
| `Hoja1` | Vacía (reservada) |

La hoja `pj` contiene en orden:
1. Identidad (nombre, raza, nivel, profesión A/B, origen, deidad)
2. Vitales (vida, vida total, vida res., mana, mana máx, mana res., iniciativa, dinero, karma, bajas, exp)
3. Tiradas de salvación (3 tiradas)
4. Sistema de supervivencia (energía, alimentación, hidratación, hambre, sed)
5. Datos personales (estatura, peso, piel, ojos, pelo, actitud, alineación, descendencia, rasgo, gustos, disgustos)
6. Estadísticas base (ataque, escudo, evasión, resistencia, puntería, magia, R. Elemental, R. Mágica, mejora temporal)
7. Atributos × 14 — cada uno con sub-columnas: Raza / Inicio / Item 1 / Item 2 / Mejora / Bendición / Maldición / H/S → Total
8. Cualidades × 28 + 2 libres — cada una con: BASE / IMPULSO / MEJORA / ITEM → TOTAL calculado
9. Equipo × 11 slots (cabeza, torso, espalda, cuerpo, piernas, pies, accesorio 1, accesorio 2, arma principal, arma secundaria, escudo) — columnas: nombre, avería, peso, efecto, protección, daño
10. Inventario — capacidad / llevado / restante / sobre peso + 12 slots (nombre, descripción, cantidad, peso unitario → peso total)
11. Familiar/Mascota (nombre, raza, lealtad, vida, mana + 5 habilidades)
12. Habilidades de Raza (NV, nombre, efecto, DOM, mana, extra)
13. Habilidades Profesión A (misma estructura)
14. Habilidades Profesión B (misma estructura)
15. Habilidades Cotidianas / Aprendidas (nombre, efecto, DOM, buff)
16. Contactos Destacados (nombre, quién es, relevancia)
17. Fortalezas & Debilidades Naturales (2 fortalezas, 2 debilidades)
18. Notas Personales

### 2.2 `dnd_character_sheet__7_.html` — Prototipo funcional

HTML monolítico (~2400 líneas) con:

- **Firebase Realtime Database** para persistencia y sincronización
- **Selector de jugadores** (Master + 6 jugadores)
- **Sistema de dados completo**: D4, D6, D8, D10, D12, D20, D100 con modificadores, ventaja/desventaja
- **Historial de tiradas** compartido (quién tiró, qué dado, resultado)
- **Tabs de navegación**: Inventario, Habilidades, Familiar/Mascota, Cualidades
- **Sistema de atributos** con sub-campos por modificador (raza, inicio, item1, item2, mejoras, bendición, maldición) y cálculo automático del total
- **Familiar/Mascota** con foto, lealtad, vida, ataque, defensa, descripción
- Estética **medieval dark** con paleta gold + dark navy

> ⚠️ **Este archivo NO se modifica.** Es solo referencia funcional y documentación viva.

---

## 3. Estado actual del frontend

### Qué está implementado

| Archivo | Estado | Descripción |
|---------|--------|-------------|
| `src/App.jsx` | ✅ | Layout principal con Navbar y renderizado condicional de tabs |
| `src/components/Layout/Navbar.jsx` | ✅ | Nav con tabs: Personaje / Dados |
| `src/components/CharacterSheet/index.jsx` | ✅ | Ficha con tabs internos: Identidad / Cualidades / Equipo / Inventario |
| `src/components/CharacterSheet/VitalsSection.jsx` | ✅ | HP, Mana, Iniciativa, Dinero, Karma, EXP con barras visuales |
| `src/components/CharacterSheet/AttributesSection.jsx` | ✅ | 14 atributos con botones +/− y barra visual |
| `src/components/CharacterSheet/QualitiesSection.jsx` | ✅ | 28 cualidades + 2 libres con columnas BASE/IMPULSO/MEJORA/ITEM/TOTAL |
| `src/components/CharacterSheet/EquipmentSection.jsx` | ✅ | 11 slots de equipo con nombre/avería/peso/efecto/protección/daño |
| `src/components/CharacterSheet/InventorySection.jsx` | ✅ | 12 slots + capacidad/llevado/restante con barra de peso reactiva |
| `src/store/characterStore.js` | ✅ | Store Zustand con estado completo y acciones para todos los campos |

### Qué está en el Navbar pero sin implementar

- **Tab "Dados"** (`activeTab === 'dice'`) → muestra placeholder

### Persistencia actual

- `localStorage` solamente (guardado manual con botón "💾 Guardar")
- No hay backend ni sync en tiempo real todavía

---

## 4. Arquitectura objetivo

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENTE                          │
│                                                         │
│  React + Vite + Zustand + React Router                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Ficha PJ    │  │    Dados     │  │  Panel Master│  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│           │               │                │            │
│           └───────────────┴────────────────┘            │
│                     Socket.io Client                     │
└─────────────────────────────┬───────────────────────────┘
                              │ WebSocket
┌─────────────────────────────▼───────────────────────────┐
│                        SERVIDOR                         │
│                                                         │
│  Node.js + Express + Socket.io                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Rooms/Lobbies  │  Dice Events  │  Sync State   │   │
│  └──────────────────────────────────────────────────┘   │
│                           │                             │
│                     MongoDB Atlas                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │  characters  │  sessions  │  dice_history  │ ... │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Flujo de sincronización planeado

1. Jugador edita un campo → Zustand actualiza el estado local inmediatamente (optimistic update)
2. Zustand emite evento Socket.io → servidor recibe y persiste en MongoDB
3. Servidor hace broadcast a todos los clientes de la sala → todos ven el cambio

---

## 5. Stack tecnológico

### Frontend (implementado)

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19.x | Framework UI |
| Vite | 8.x | Build tool / Dev server |
| Zustand | 5.x | Estado global (store del personaje) |
| React Router DOM | 7.x | Navegación entre páginas |

### Frontend (pendiente de instalar)

| Tecnología | Uso |
|------------|-----|
| TailwindCSS | Utilidades CSS (actualmente CSS-in-JS inline) |
| Socket.io-client | Conexión WebSocket al backend |

### Backend (por construir)

| Tecnología | Uso |
|------------|-----|
| Node.js | Runtime del servidor |
| Express | HTTP server y REST endpoints |
| Socket.io | WebSockets para tiempo real |
| MongoDB Atlas | Base de datos persistente |
| Mongoose | ODM para MongoDB |

### Despliegue planeado

| Servicio | Qué hostea |
|----------|------------|
| Render | Frontend (static site) + Backend (web service) |

---

## 6. Estructura de carpetas

### Estado actual

```
frontend/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── App.jsx                          # Root: Navbar + renderizado por tab
│   ├── main.jsx                         # Entry point React
│   ├── index.css                        # Global CSS (vacío por ahora)
│   ├── assets/
│   │   └── vite.svg
│   ├── components/
│   │   ├── Layout/
│   │   │   └── Navbar.jsx               # Nav principal (Personaje / Dados)
│   │   └── CharacterSheet/
│   │       ├── index.jsx                # Contenedor con tabs internos
│   │       ├── VitalsSection.jsx        # HP, Mana, stats vitales
│   │       ├── AttributesSection.jsx    # 14 atributos con controles
│   │       ├── QualitiesSection.jsx     # 28 cualidades + TOTAL calculado
│   │       ├── EquipmentSection.jsx     # 11 slots de equipo
│   │       └── InventorySection.jsx     # 12 slots + control de peso
│   └── store/
│       └── characterStore.js            # Zustand store (estado completo del PJ)
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

### Estructura objetivo completa

```
/
├── frontend/                            # React app (lo que existe hoy)
│   └── src/
│       ├── components/
│       │   ├── Layout/
│       │   │   ├── Navbar.jsx
│       │   │   └── Sidebar.jsx          # (futuro: panel lateral)
│       │   ├── CharacterSheet/          # Ficha de personaje (implementado)
│       │   ├── Dice/                    # Sistema de dados (pendiente)
│       │   │   ├── DiceRoller.jsx
│       │   │   └── DiceHistory.jsx
│       │   ├── Skills/                  # Habilidades de raza/profesión (pendiente)
│       │   │   └── SkillsSection.jsx
│       │   ├── Familiar/                # Familiar/mascota (pendiente)
│       │   │   └── FamiliarSection.jsx
│       │   ├── BattleBoard/             # Panel de batalla (pendiente)
│       │   │   └── BattleBoard.jsx
│       │   ├── Master/                  # Panel del Master (pendiente)
│       │   │   └── MasterPanel.jsx
│       │   └── Shop/                    # Tienda de ítems (pendiente)
│       │       └── Shop.jsx
│       ├── store/
│       │   ├── characterStore.js        # ✅ Implementado
│       │   ├── diceStore.js             # Historial de tiradas (pendiente)
│       │   └── sessionStore.js          # Sala/jugadores (pendiente)
│       ├── hooks/
│       │   └── useSocket.js             # Hook para Socket.io (pendiente)
│       ├── services/
│       │   └── socket.js                # Instancia y eventos Socket.io (pendiente)
│       └── pages/
│           ├── Home.jsx                 # Selector de sala/jugador (pendiente)
│           └── Game.jsx                 # Vista principal de juego (pendiente)
│
├── backend/                             # Node.js server (por construir)
│   ├── src/
│   │   ├── index.js                     # Entry point Express + Socket.io
│   │   ├── routes/
│   │   │   └── characters.js            # REST: GET/POST/PUT personajes
│   │   ├── sockets/
│   │   │   ├── characterEvents.js       # Sync de ficha en tiempo real
│   │   │   └── diceEvents.js            # Broadcast de tiradas
│   │   └── models/
│   │       ├── Character.js             # Mongoose schema del personaje
│   │       └── Session.js               # Mongoose schema de sesión/sala
│   └── package.json
│
├── shared/                              # Código compartido frontend/backend
│   ├── constants/
│   │   ├── attributes.js                # Lista de 14 atributos
│   │   ├── qualities.js                 # Lista de 28 cualidades
│   │   └── equipmentSlots.js            # Lista de 11 slots de equipo
│   └── types/
│       └── character.js                 # Definición del shape del personaje
│
├── docs/                                # Documentación adicional
│   └── game-rules.md                    # Reglas del sistema D&D Custom
│
└── legacy/                              # Archivos originales (solo referencia)
    ├── Ficha.xlsx
    └── dnd_character_sheet__7_.html
```

---

## 7. Modelo de datos del personaje

Este es el shape completo del objeto `character` en el Zustand store. Es la fuente de verdad del frontend y la base para el schema de MongoDB.

```js
{
  // ── IDENTIDAD ──────────────────────────────────────────────────────────
  name:         string,   // Nombre del personaje
  race:         string,   // Raza
  level:        number,   // Nivel (empieza en 1)
  profession:   string,   // Profesión A
  professionB:  string,   // Profesión B
  origin:       string,   // Origen
  deity:        string,   // Deidad
  descendencia: string,   // Descendencia

  // ── VITALES ────────────────────────────────────────────────────────────
  hp:         number,     // Vida actual
  hpMax:      number,     // Vida máxima (= Vida Total en el Excel)
  hpRes:      number,     // Vida de reserva
  mana:       number,     // Mana actual
  manaMax:    number,     // Mana máximo
  manaRes:    number,     // Mana de reserva
  initiative: number,     // Iniciativa
  money:      number,     // Dinero
  karma:      number,     // Karma
  bajas:      number,     // Bajas
  experience: number,     // EXP

  // ── SUPERVIVENCIA ──────────────────────────────────────────────────────
  energia:       number,  // Energía (0-100)
  alimentacion:  number,  // Alimentación (0-100)
  hidratacion:   number,  // Hidratación (0-100)
  hambre:        number,  // Contador de hambre
  sed:           number,  // Contador de sed

  // ── ESTADÍSTICAS BASE ──────────────────────────────────────────────────
  attack:     number,     // Ataque
  shield:     number,     // Escudo
  evasion:    number,     // Evasión
  resistance: number,     // Resistencia
  aim:        number,     // Puntería
  magic:      number,     // Magia
  rElemental: number,     // Resistencia Elemental
  rMagica:    number,     // Resistencia Mágica

  // ── DATOS PERSONALES ───────────────────────────────────────────────────
  height:      string,
  weight:      number,
  skin:        string,
  eyes:        string,
  hair:        string,
  attitude:    string,
  alignment:   string,
  trait:       string,    // Rasgo distintivo
  likes:       string,    // Gustos
  dislikes:    string,    // Disgustos
  notes:       string,    // Notas personales

  // ── ATRIBUTOS (14) ─────────────────────────────────────────────────────
  // Por ahora son un número simple (el total).
  // En la versión avanzada cada uno será un objeto con sub-campos.
  attributes: {
    fineMotor:         number,   // Motora Fina
    intuition:         number,   // Intuición
    perception:        number,   // Percepción
    charisma:          number,   // Carisma
    willpower:         number,   // Voluntad
    luck:              number,   // Suerte
    constitution:      number,   // Constitución
    strength:          number,   // Fuerza
    reflexes:          number,   // Reflejos
    intelligence:      number,   // Inteligencia
    elementalAffinity: number,   // Afinidad Elemental
    concentration:     number,   // Concentración
    wisdom:            number,   // Sabiduría
    faith:             number,   // Fe
  },

  // ── CUALIDADES (28 + 2 libres) ─────────────────────────────────────────
  // Cada cualidad es un objeto con 4 sub-campos.
  // TOTAL = base + impulso + mejora + item (calculado en la UI, no guardado)
  qualities: {
    actuacion:     { base: 0, impulso: 0, mejora: 0, item: 0 },
    acrobacias:    { base: 0, impulso: 0, mejora: 0, item: 0 },
    arte:          { base: 0, impulso: 0, mejora: 0, item: 0 },
    atraccion:     { base: 0, impulso: 0, mejora: 0, item: 0 },
    atletismo:     { base: 0, impulso: 0, mejora: 0, item: 0 },
    cArcano:       { base: 0, impulso: 0, mejora: 0, item: 0 },
    calle:         { base: 0, impulso: 0, mejora: 0, item: 0 },
    ciencia:       { base: 0, impulso: 0, mejora: 0, item: 0 },
    cultura:       { base: 0, impulso: 0, mejora: 0, item: 0 },
    equilibrio:    { base: 0, impulso: 0, mejora: 0, item: 0 },
    fauna:         { base: 0, impulso: 0, mejora: 0, item: 0 },
    flora:         { base: 0, impulso: 0, mejora: 0, item: 0 },
    geografia:     { base: 0, impulso: 0, mejora: 0, item: 0 },
    historia:      { base: 0, impulso: 0, mejora: 0, item: 0 },
    intimidacion:  { base: 0, impulso: 0, mejora: 0, item: 0 },
    investigacion: { base: 0, impulso: 0, mejora: 0, item: 0 },
    medicina:      { base: 0, impulso: 0, mejora: 0, item: 0 },
    mentira:       { base: 0, impulso: 0, mejora: 0, item: 0 },
    monta:         { base: 0, impulso: 0, mejora: 0, item: 0 },
    motivacion:    { base: 0, impulso: 0, mejora: 0, item: 0 },
    negociacion:   { base: 0, impulso: 0, mejora: 0, item: 0 },
    persuasion:    { base: 0, impulso: 0, mejora: 0, item: 0 },
    politica:      { base: 0, impulso: 0, mejora: 0, item: 0 },
    religion:      { base: 0, impulso: 0, mejora: 0, item: 0 },
    sigilo:        { base: 0, impulso: 0, mejora: 0, item: 0 },
    tratoAnimales: { base: 0, impulso: 0, mejora: 0, item: 0 },
    cLiteratura:   { base: 0, impulso: 0, mejora: 0, item: 0 },
    cOcultismo:    { base: 0, impulso: 0, mejora: 0, item: 0 },
    // Campos libres
    otro1Name: string,
    otro1:     number,
    otro2Name: string,
    otro2:     number,
  },

  // ── EQUIPO (11 slots) ──────────────────────────────────────────────────
  equipment: {
    cabeza:         { nombre, averia, peso, efecto, proteccion, dano },
    torso:          { ... },
    espalda:        { ... },
    cuerpo:         { ... },
    piernas:        { ... },
    pies:           { ... },
    accesorio1:     { ... },
    accesorio2:     { ... },
    armaPrincipal:  { nombre, averia, peso, efecto, proteccion, dano },
    armaSecundaria: { ... },
    escudo:         { ... },
  },

  // ── INVENTARIO ─────────────────────────────────────────────────────────
  inventory: {
    capacidad: number,    // Peso máximo que puede cargar
    items: [              // 12 slots fijos
      { nombre, descripcion, cantidad, pesoUnd },
      // ... × 12
    ],
  },
}
```

> **Campos pendientes de modelar** (están en el Excel pero no en el store todavía):
> - `familiar` — objeto con nombre, raza, lealtad, vida, mana, foto, habilidades[]
> - `skillsRace` — habilidades de raza: [{ nv, nombre, efecto, dom, mana, extra }]
> - `skillsProfA` — habilidades profesión A (misma estructura)
> - `skillsProfB` — habilidades profesión B (misma estructura)
> - `skillsLearned` — habilidades cotidianas: [{ nombre, efecto, dom, buff }]
> - `contacts` — [{ nombre, quienEs, relevancia }]
> - `strengths` — [string, string] (fortalezas naturales)
> - `weaknesses` — [string, string] (debilidades naturales)
> - `savingThrows` — [tirada1, tirada2, tirada3]
> - Atributos con sub-campos completos: cada atributo → `{ raza, inicio, item1, item2, mejora, bendicion, maldicion, hs }`

---

## 8. Componentes implementados

### `CharacterSheet/index.jsx`
Contenedor principal de la ficha. Tiene **4 tabs internos**:
- **Identidad**: datos del personaje + datos personales + VitalsSection + AttributesSection
- **Cualidades**: QualitiesSection
- **Equipo**: EquipmentSection
- **Inventario**: InventorySection

Muestra el nombre del personaje en el header como preview.

### `VitalsSection.jsx`
- HP actual / HP máx / HP Res con barra visual roja
- Mana actual / Mana máx / Mana Res con barra visual azul
- Iniciativa, Dinero, Karma, Bajas, EXP como campos simples
- Props: `character`, `onChange` (función curried `(field) => (e) => ...`)

### `AttributesSection.jsx`
- 14 atributos del sistema con botones +/− y barra visual gold
- Valores guardados como número simple (el total final)
- Toma datos y acciones directamente del store via `useCharacterStore()`
- Labels en español mapeados desde las keys internas en inglés

### `QualitiesSection.jsx`
- 28 cualidades + 2 campos libres con nombre customizable
- Columnas: CUALIDAD | BASE | IMPULSO | MEJORA | ITEM | **TOTAL** (calculado live)
- Cada cualidad es un objeto `{ base, impulso, mejora, item }` en el store
- `TOTAL = base + impulso + mejora + item` — nunca se persiste, siempre se recalcula

### `EquipmentSection.jsx`
- 11 slots exactos del Excel
- Columnas por slot: PARTE | NOMBRE | AVERÍA | PESO | EFECTO | PROTECCIÓN | DAÑO
- Los armas y escudo tienen las mismas columnas que la armadura

### `InventorySection.jsx`
- Control de capacidad/llevado/restante/sobre peso con barra de progreso reactiva
- La barra se vuelve roja cuando `llevado > capacidad`
- 12 slots con nombre, descripción, cantidad, peso unitario → peso total calculado
- El peso total de cada ítem = `cantidad × pesoUnd`
- El peso llevado total = suma de todos los pesos totales

### `characterStore.js` (Zustand)
Acciones disponibles:

| Acción | Uso |
|--------|-----|
| `updateCharacter(field, value)` | Actualiza cualquier campo plano del personaje |
| `updateAttribute(attr, value)` | Actualiza un atributo por key (ej: `'strength'`) |
| `updateQuality(key, value)` | Actualiza una cualidad (value puede ser objeto o primitivo) |
| `updateEquipmentSlot(slotKey, slotData)` | Reemplaza un slot de equipo completo |
| `saveToLocal()` | Serializa el personaje a `localStorage` |
| `loadFromLocal()` | Carga el personaje desde `localStorage` |

---

## 9. Componentes pendientes

En orden de prioridad sugerida:

### P1 — Core de la ficha (completa la paridad con el Excel)

| Componente | Descripción |
|------------|-------------|
| `AttributesSection` (upgrade) | Expandir atributos para incluir sub-campos: Raza / Inicio / Item1 / Item2 / Mejora / Bendición / Maldición / H/S → Total calculado. El Excel los muestra como columnas por atributo. |
| `SkillsSection.jsx` | Habilidades de Raza + Profesión A + Profesión B + Cotidianas. Cada sección es una tabla con columnas NV / HABILIDAD / EFECTO / DOM / MANA / EXTRA. |
| `FamiliarSection.jsx` | Foto, nombre, raza, lealtad (0-100), vida, mana + tabla de 5 habilidades del familiar. |
| `SurvivalSection.jsx` | Energía, Alimentación, Hidratación, Hambre, Sed con barras visuales. Ya está en el store pero sin UI. |
| `ContactsSection.jsx` | Lista de contactos: nombre, quién es, relevancia. |
| `StrengthsWeaknesses.jsx` | 2 fortalezas + 2 debilidades naturales. |
| `SavingThrows.jsx` | 3 tiradas de salvación. |

### P2 — Sistema de dados

| Componente | Descripción |
|------------|-------------|
| `DiceRoller.jsx` | Modal con selección de dado (D4/D6/D8/D10/D12/D20/D100), cantidad, modificador, ventaja/desventaja. Botón "Lanzar". |
| `DiceHistory.jsx` | Panel colapsable con historial de tiradas. Muestra: quién tiró / qué dado / resultado. Borde gold si fue crítico. |
| `diceStore.js` | Zustand store para historial de tiradas. |

### P3 — Multijugador

| Módulo | Descripción |
|--------|-------------|
| `useSocket.js` | Hook que encapsula la conexión a Socket.io y expone `emit` y handlers de eventos. |
| `socket.js` (service) | Singleton de la instancia Socket.io-client. |
| `sessionStore.js` | Zustand store con: sala activa, jugadores conectados, jugador local. |
| `Home.jsx` (página) | Pantalla de entrada: crear sala / unirse a sala / elegir personaje. |
| Backend completo | Ver sección de arquitectura objetivo. |

### P4 — Panel del Master y Batalla

| Componente | Descripción |
|------------|-------------|
| `BattleBoard.jsx` | Vista de combate: HP/Mana de todos los jugadores + 6 slots de NPC. Fiel a la hoja "Batalla" del Excel. |
| `MasterPanel.jsx` | Vista especial para el Master: ve todos los personajes, puede modificar NPCs, controla el estado del combate. |

### P5 — Funcionalidades futuras

- Sistema de cuentas + autenticación
- Tienda de ítems (con sistema de rarezas del Excel)
- Sistema de campañas
- Chat integrado
- Sistema de mapas
- Marketplace de ítems

---

## 10. Roadmap completo

```
FASE 1 — Ficha completa (ahora)
├── ✅ Identidad + datos personales
├── ✅ Vitales (HP/Mana/stats)
├── ✅ Atributos × 14
├── ✅ Cualidades × 28 con BASE/IMPULSO/MEJORA/ITEM/TOTAL
├── ✅ Equipo × 11 slots
├── ✅ Inventario con control de peso
├── ⬜ Habilidades (Raza / Prof A / Prof B / Cotidianas)
├── ⬜ Familiar/Mascota
├── ⬜ Sistema de supervivencia (UI)
├── ⬜ Tiradas de salvación
├── ⬜ Contactos + Fortalezas/Debilidades
└── ⬜ Atributos con sub-campos completos

FASE 2 — Sistema de dados
├── ⬜ DiceRoller (D4→D100, modificadores, ventaja/desventaja)
├── ⬜ DiceHistory (panel colapsable)
└── ⬜ diceStore.js

FASE 3 — Backend
├── ⬜ Setup Node.js + Express
├── ⬜ MongoDB Atlas + Mongoose schemas
├── ⬜ REST API: GET/POST/PUT /characters
└── ⬜ Socket.io básico: sync de ficha en tiempo real

FASE 4 — Multijugador
├── ⬜ Sistema de salas/lobbies
├── ⬜ Selector de jugador (Master + 6)
├── ⬜ Historial de dados compartido en tiempo real
├── ⬜ Home page (crear/unirse a sala)
└── ⬜ Indicadores de "jugador conectado"

FASE 5 — Panel del Master
├── ⬜ Vista de todos los personajes
├── ⬜ BattleBoard (HP/Mana de jugadores + NPCs)
└── ⬜ Control de NPCs

FASE 6 — Features avanzadas
├── ⬜ Auth (cuentas de usuario)
├── ⬜ Tienda de ítems
├── ⬜ Sistema de campañas
├── ⬜ Chat
└── ⬜ Mapas
```

---

## 11. Convenciones de código

### Nomenclatura

| Cosa | Convención | Ejemplo |
|------|------------|---------|
| Componentes React | PascalCase | `VitalsSection.jsx` |
| Hooks | camelCase con `use` | `useSocket.js` |
| Stores Zustand | camelCase con `Store` | `characterStore.js` |
| Keys del store | camelCase en inglés | `fineMotor`, `armaPrincipal` (excepciones español donde es más claro) |
| Labels en UI | Español | `'Motora Fina'`, `'Arma Principal'` |
| Carpetas de features | camelCase | `CharacterSheet/`, `Dice/` |

### Patrones establecidos

**Patrón de handler curried** (usado en VitalsSection y CharacterSheet/index):
```js
const handleChange = (field) => (e) => {
  updateCharacter(field, e.target.value)
}
// Uso: <input onChange={handleChange('name')} />
```

**Acceso al store** (siempre destructurar solo lo necesario):
```js
const { character, updateAttribute } = useCharacterStore()
```

**Estilos** (CSS-in-JS con objeto `styles` al final del archivo):
```js
const styles = {
  section: { marginBottom: '24px', padding: '16px', ... },
}
// Uso: <div style={styles.section}>
```

**Totales calculados** (nunca guardados en el store, siempre calculados en el render):
```js
const total = (q.base || 0) + (q.impulso || 0) + (q.mejora || 0) + (q.item || 0)
```

### Paleta de colores del proyecto

```js
const COLORS = {
  bgDark:      '#0d0d1a',   // Fondo más oscuro (cards internas)
  bgMid:       '#1a1a2e',   // Fondo principal
  gold:        '#d4af37',   // Acento principal (títulos, valores importantes)
  border:      '#333',      // Bordes visibles
  borderSubtle:'#2a2a3e',   // Bordes de inputs
  textPrimary: '#fff',
  textMuted:   '#888',
  textDisabled:'#555',
  hpRed:       '#e74c3c',   // Vida
  manaBlue:    '#3498db',   // Mana
  successGreen:'#27ae60',   // Peso restante OK
}
```

---

## 12. Decisiones de arquitectura

### ¿Por qué Zustand y no Redux o Context?

Zustand es más simple, requiere menos boilerplate y tiene excelente rendimiento. El store se importa directamente en cualquier componente sin providers. Para este proyecto donde el estado es principalmente la ficha de un personaje, es más que suficiente.

### ¿Por qué MongoDB y no seguir con Firebase?

Firebase funciona bien para el prototipo pero tiene limitaciones de consultas complejas y costos a escala. MongoDB Atlas + Socket.io nos da más control sobre la lógica de sincronización, y el modelo de datos del personaje (documento JSON anidado) encaja perfectamente con MongoDB.

### ¿Por qué los totales de cualidades NO se guardan en el store?

Porque son valores derivados. Si los guardáramos, tendríamos que sincronizarlos manualmente cada vez que cambia cualquier sub-campo. Al calcularlos en el render, siempre están en sync y el store es la única fuente de verdad.

### ¿Por qué CSS-in-JS inline en lugar de Tailwind o CSS modules?

Por velocidad de desarrollo inicial y para mantener los estilos co-localizados con cada componente. Cuando el proyecto crezca, se puede migrar a Tailwind por secciones sin romper nada. El `index.css` está vacío intencionalmente para esa migración futura.

### ¿Por qué 12 slots fijos de inventario y no una lista dinámica?

Por fidelidad al Excel original que tiene 12 filas fijas. En el futuro se puede hacer expansible, pero por ahora mantiene paridad con la fuente de verdad.

---

## 13. Instrucciones para continuar con otra IA

Si estás leyendo esto desde una IA diferente (o en una nueva conversación), aquí está el contexto mínimo que necesitas:

### El sistema

- RPG casero llamado **D&D Custom**, creado por El Jefe Tejón
- NO es D&D estándar. Tiene sus propias reglas y no debe convertirse en un clon genérico
- El Excel (`Ficha.xlsx`) y el HTML (`dnd_character_sheet__7_.html`) son la referencia; nunca se modifican

### El código actual

- Frontend React (Vite + Zustand) en la carpeta `frontend/`
- La ficha de personaje tiene 4 tabs: Identidad / Cualidades / Equipo / Inventario
- El store es `src/store/characterStore.js` — toda la lógica de estado vive ahí
- Los estilos son CSS-in-JS con objeto `styles` al final de cada archivo
- Paleta: fondo `#1a1a2e`, acento `#d4af37` (gold), texto `#fff`

### Lo que viene a continuación

Ver sección [9. Componentes pendientes](#9-componentes-pendientes) y [10. Roadmap completo](#10-roadmap-completo).

El siguiente paso lógico es completar la **Fase 1** con los componentes que faltan de la ficha, en este orden:
1. `SkillsSection.jsx` — Habilidades (Raza / Profesión A+B / Cotidianas)
2. `FamiliarSection.jsx` — Familiar/Mascota
3. Actualizar `AttributesSection.jsx` con sub-campos completos
4. `SurvivalSection.jsx` — Supervivencia (la UI, los campos ya están en el store)

Después se construye el sistema de dados (Fase 2) y luego el backend (Fase 3+).

### Cómo agregar un nuevo componente a la ficha

1. Crear el archivo en `src/components/CharacterSheet/NombreSection.jsx`
2. Importarlo en `src/components/CharacterSheet/index.jsx`
3. Agregar un nuevo tab en el array `SHEET_TABS`
4. Renderizarlo condicionalmente: `{activeSection === 'nombre' && <NombreSection />}`
5. Si necesita nuevos campos en el store, agregarlos en `characterStore.js` en el estado inicial y crear la acción correspondiente

---

*README generado y mantenido como parte del proyecto D&D Custom — última actualización: Mayo 2026*
