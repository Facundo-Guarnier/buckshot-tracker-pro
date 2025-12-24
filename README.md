<div align="center">

# 🎯 Buckshot Tracker Pro

**Calculadora de probabilidades para Buckshot Roulette**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## ✨ Características

- 🎰 **Contador de balas** - Registra balas reales y de fogueo en tiempo real
- 📊 **Cálculo de probabilidades** - Muestra las chances del próximo disparo
- 🔴 **Marcado visual** - Identifica slots como LIVE, BLANK o desconocido
- 📱 **Diseño Mobile-First** - Interfaz optimizada para móviles
- 🌙 **Tema oscuro** - Estética industrial minimalista
- 📜 **Historial de partidas** - Registro de rondas anteriores

---

## 🚀 Instalación

**Requisitos:** Node.js 18+

```bash
# Clonar el repositorio
git clone https://github.com/Facundo-Guarnier/buckshot-tracker-pro.git
cd buckshot-tracker-pro

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🛠️ Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la build de producción |
| `npm run preview` | Previsualiza la build de producción |

---

## 🏗️ Tecnologías

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultra rápido
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconografía

---

## 📁 Estructura del proyecto

```
buckshot-tracker-pro/
├── components/
│   ├── BrandFooter.tsx   # Footer con branding
│   ├── HistoryLog.tsx    # Historial de partidas
│   ├── SetupForm.tsx     # Formulario de configuración
│   ├── SlotCard.tsx      # Tarjeta de cada bala
│   └── StatusBoard.tsx   # Panel de estadísticas
├── public/
│   └── assets/           # Recursos estáticos
├── App.tsx               # Componente principal
├── types.ts              # Tipos TypeScript
└── index.css             # Estilos globales
```

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver el archivo [LICENSE](./LICENSE) para más detalles.

---

### Agradecimientos

- [Google AI Studio](https://aistudio.google.com/) - Por las herramientas de IA que facilitaron el desarrollo inicial
- [Shadcn/ui](https://ui.shadcn.com/) - Inspiración para componentes UI
- [Buckshot Roulette](https://store.steampowered.com/app/2835570/Buckshot_Roulette/) - El juego original
