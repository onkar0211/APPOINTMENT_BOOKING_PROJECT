# Quick Start Guide

## Installation & Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Open Browser**
   - Navigate to `http://localhost:5173`

## Project Structure

```
appointment booking/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   └── PrivateRoute.jsx
│   ├── pages/               # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Calendar.jsx
│   │   ├── BookAppointment.jsx
│   │   └── MyAppointments.jsx
│   ├── context/             # Context providers
│   │   ├── AuthContext.jsx
│   │   └── AppointmentContext.jsx
│   ├── services/            # API services
│   │   └── api.js
│   ├── styles/              # CSS files
│   │   ├── index.css
│   │   └── navbar.css
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Features Implemented

✅ User Authentication (Login/Register)
✅ Protected Routes
✅ Dashboard with Statistics
✅ Calendar View (FullCalendar)
✅ Book Appointments
✅ View/Manage Appointments
✅ Responsive Design
✅ Modern UI/UX

## API Integration

The frontend is configured to connect to a backend API at `http://localhost:5000/api`.

To change the API URL:

1. Create a `.env` file in the root directory
2. Add: `VITE_API_URL=your_api_url`

## Backend API Endpoints Expected

### Authentication

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token

### Appointments

- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment
- `GET /api/appointments/available-slots` - Get available slots

## Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Notes

- The app uses JWT tokens stored in localStorage
- Protected routes require authentication
- All API calls include automatic token refresh
- Responsive design works on mobile and desktop
