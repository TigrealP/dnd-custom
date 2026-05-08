# D&D Custom Web App — Contexto Completo del Proyecto

## Descripción General

Estoy desarrollando una plataforma web para un sistema RPG casero llamado “D&D Custom”, creado por una comunidad/mesa de rol liderada por “El Jefe Tejón”.

La idea es transformar el sistema actual (Excel + HTML monolítico) en una aplicación web moderna, modular y escalable con soporte multijugador y tiempo real.

El objetivo NO es crear otro clon de D&D tradicional, sino una plataforma personalizada basada en este universo y sistema propio.

---

# Estado Actual del Proyecto

Actualmente existen dos implementaciones:

## 1. Archivo Excel (Sistema Maestro)
Contiene:
- Fichas de personaje
- Sistema de atributos
- Cualidades/habilidades
- Inventario
- Equipamiento
- Sistema de combate
- Tienda de ítems
- NPCs
- Control de batalla
- Familiar/mascota
- Reglas implícitas

El Excel tiene:
- Hasta 6 jugadores
- Hoja de batalla
- Hoja de tienda
- Estadísticas complejas
- Sistema de rarezas
- Economía
- Sistema de supervivencia

---

## 2. HTML Monolítico Funcional
Existe una aplicación web ya funcional hecha en:
- HTML
- CSS
- JavaScript Vanilla
- Firebase Realtime Database

Características actuales:
- Fichas persistentes
- Guardado automático
- Multijugador
- Selector de jugadores
- Sistema de dados completo
- Historial de tiradas
- Inventario
- Equipamiento
- Familiar/Mascota
- Cualidades
- Tabs dinámicos
- Estética medieval elaborada
- Fotos de personaje
- Firebase realtime sync

El archivo actual es MUY grande y monolítico.

Problemas actuales:
- Todo está en un único HTML
- CSS gigante
- JS mezclado con UI
- Lógica acoplada
- Difícil mantenimiento
- Difícil escalabilidad
- Difícil agregar nuevas features

IMPORTANTE:
NO quiero perder la lógica ni funcionalidades del HTML viejo.
Debe servir como:
- referencia funcional
- prototipo
- documentación viva
- base visual

---

# Objetivo del Proyecto

Migrar el sistema a arquitectura moderna y escalable.

---

# Stack Planeado

## Frontend
- React
- Vite
- TailwindCSS
- Zustand
- React Router
- Socket.io Client

## Backend
- Node.js
- Express
- Socket.io

## Base de Datos
Posiblemente:
- MongoDB Atlas

Antes se usaba:
- Firebase Realtime Database

---

# Despliegue

Planeado en:
- Render (frontend + backend)

---

# Funcionalidades Objetivo

## Core
- Fichas de personaje
- Sistema de atributos
- Sistema de combate
- Dados animados
- Inventario
- Equipamiento
- Tienda de ítems
- NPCs
- Familiar/Mascota
- Guardado persistente

## Multiplayer
- Salas/lobbies
- Tiempo real
- Historial compartido de dados
- Estado sincronizado
- Panel del Master

## Futuro
- Sistema de cuentas
- Auth
- Sistema de campañas
- Marketplace
- Mejoras visuales
- Combate en tiempo real
- Sistema de mapas
- Chat integrado

---

# Arquitectura Recomendada

Separar en:

## Frontend
- UI
- Componentes
- Estado global
- Navegación
- Renderizado

## Backend
- Reglas
- Persistencia
- Multiplayer
- Socket events
- Validaciones

## Shared
- Tipos
- Modelos
- Reglas de atributos
- Utilidades

---

# Estructura Recomendada

```txt
frontend/
backend/
shared/
docs/
legacy/