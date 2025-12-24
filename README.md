# TECCOD-MVP

TECCOD-MVP is a modern service selection and ordering platform. It provides a seamless interface for browsing available services, managing a selection basket, and proceeding with service requests.

## 🚀 Features

- **Service Catalog**: Browse through a curated list of professional services.
- **Persistent Basket**: Add or remove services from your selection, with automated state persistence across sessions.
- **Service Details**: Quick view of service information including descriptions and pricing.
- **Dynamic Order Summary**: Real-time calculation of totals and easy management of selected items.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Clean Architecture**: Built using a lightweight version of Feature-Sliced Design (FSD) for better maintainability.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: SCSS (Modules)
- **Forms**: React Hook Form

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd TECCOD-MVP
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

- **Development Mode**:

  ```bash
  npm run dev
  ```

  The app will be available at `http://localhost:5173`.

- **Build for Production**:

  ```bash
  npm run build
  ```

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

## 🏗 Project Structure

The project follows a "FSD Lite" architecture:

- `src/app/`: App-wide configurations and entry point.
- `src/pages/`: Main application pages.
- `src/widgets/`: Complex UI components (e.g., OrderSummary).
- `src/entities/`: Domain-specific components (e.g., ServiceCard).
- `src/shared/`: Reusable basic components and styles.
- `src/styles/`: Global variables, mixins, and base styles.

## 📝 License

This project is private and intended for MVP demonstration purposes.
