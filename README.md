# RLHF CRM UI

A comprehensive CRM interface built with React and Vite, featuring AI-powered dashboards, call analysis, and agent management.

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ahnafonit/ssai_ui.git
cd ssai_ui
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Features

- **AI Dashboard** - Comprehensive AI analytics and insights
- **Manager Dashboard** - Team management and performance tracking
- **Director Dashboard** - High-level overview and strategic insights
- **Call Analysis** - AI-powered call analysis and transcription
- **Agent Management** - AI agent configuration and monitoring
- **Profile Settings** - User profile and preferences management
- **Microservices Integration** - Seamless integration with backend services

## Technology Stack

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Recharts** - Charting library for data visualization

---

## React + Vite Template Information

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
