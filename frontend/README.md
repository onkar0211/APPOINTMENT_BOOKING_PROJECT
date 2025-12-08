# Appointment Booking System - Frontend

A modern, responsive appointment booking system built with React, Vite, and FullCalendar.

## Features

- 🔐 User Authentication (Login/Register)
- 📅 Interactive Calendar View
- 📝 Appointment Booking & Management
- 👤 User Dashboard
- 🎨 Modern UI/UX Design
- 📱 Responsive Design

## Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool
- **React Router** - Navigation
- **FullCalendar** - Calendar Component
- **Axios** - HTTP Client
- **Context API** - State Management
- **CSS3** - Styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── context/         # Context providers
├── services/        # API services
├── utils/           # Utility functions
├── styles/          # Global styles
└── App.jsx          # Main app component
```

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:5000/api
```

## API Integration

The frontend expects a backend API running on `http://localhost:5000/api`. Update the API URL in `src/services/api.js` or use environment variables.

## License

MIT
