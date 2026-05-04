<div align="center">

<img src="https://ibots.in/wp-content/uploads/2025/03/Ibots-Logo-2048x827.png" height="60" alt="iBots Logo" />

# Task Manager Pro

**A full-stack enterprise task management system built with React, Node.js, Express & MongoDB**

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-c9a84c?style=flat-square)

🔗 **Live Repository:** [github.com/sushmithashreep4/task-manager-app](https://github.com/sushmithashreep4/task-manager-app)

</div>

---

## Overview

Task Manager Pro is a production-ready, full-stack web application designed for enterprise-level team workflow management. It features JWT-based authentication, MongoDB user storage, real-time task tracking, intelligent filtering, and a luxury dark-themed UI built to the standard of high-level tech companies.

---

## Features

### Authentication & Security
- **User Registration** — Create account with username, email, and password stored securely in MongoDB
- **User Login** — JWT token issued on successful login, stored in `localStorage`
- **Protected Routes** — All task API endpoints require a valid Bearer token
- **Verified Badge** — Green blinking ✓ verified badge shown in navbar after login
- **Auto Login** — Token persisted across sessions, no re-login needed on refresh
- **Sign Out** — Clears token and returns to login screen

### Task Management
- **Task Assignment** — Assign tasks to staff members with due date and time
- **Status Tracking** — Toggle tasks between `Pending` and `Completed`
- **Blinking Green Tick** — Animated ✓ indicator on completed task cards
- **Inline Editing** — Edit any task directly on the card without page reload
- **Live Search** — Filter tasks by staff name or task description in real time
- **Smart Filters** — Filter view by All / Pending / Completed with live counts
- **Dashboard Stats** — Real-time stats for Total, Pending, Completed, and Completion Rate

### UI / UX
- Luxury dark theme — deep space background, gold accents, glassmorphism cards
- Smooth `fadeInUp` animations on all cards
- Responsive grid layout across desktop, tablet, and mobile
- Enterprise-grade navbar with user avatar, verified badge, logo, and sign out

---

## Tech Stack

| Layer | Technology |
|------------|--------------------------------------|
| Frontend | React 18, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Styling | CSS-in-JS (inline styles + keyframes)|
| Dev Tools | Nodemon, Create React App |

---

## Project Structure

```
task-manager-app/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register & Login logic
│   │   └── taskController.js      # CRUD logic
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification middleware
│   ├── models/
│   │   ├── User.js                # User schema (bcrypt hashed password)
│   │   └── Task.js                # Task schema
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth/register, /api/auth/login
│   │   └── taskRoutes.js          # /api/tasks CRUD routes
│   ├── server.js                  # Express app entry point
│   └── .env                       # Environment variables (not committed)
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── ErrorBoundary.jsx  # Global React error boundary
        │   ├── TaskForm.jsx       # Task creation form
        │   ├── TaskItem.jsx       # Individual task card
        │   └── TaskList.jsx       # Task grid renderer
        ├── pages/
        │   ├── Home.jsx           # Main dashboard page
        │   ├── Login.jsx          # Login page
        │   └── Register.jsx       # Register page with verified tick
        ├── api.js                 # Axios instance with JWT interceptor
        ├── App.js                 # Root component with auth routing
        └── index.css              # Global styles & animations
```

---

## Getting Started

### Prerequisites

- Node.js `v16+`
- npm `v8+`
- MongoDB Atlas account

### 1. Clone the Repository

```bash
git clone https://github.com/sushmithashreep4/task-manager-app.git
cd task-manager-app
```

### 2. Configure Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/taskdb?appName=Cluster0
JWT_SECRET=your_super_secret_key
```

> Never commit your `.env` file. It is already listed in `.gitignore`.

### 3. Start the Backend

```bash
cd backend
npm install
npm run dev
```

Expected output:
```
MongoDB Connected
Server running on port 5000
```

### 4. Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## API Reference

### Auth Routes

Base URL: `http://localhost:5000/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|-------------|--------------------------|---------------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login and receive JWT | No |

#### Register Request Body
```json
{
  "username": "string (required, min 2 chars)",
  "email":    "string (required, valid email)",
  "password": "string (required, min 6 chars)"
}
```

#### Login Request Body
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

#### Auth Response
```json
{
  "token":    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "john",
  "email":    "john@example.com"
}
```

---

### Task Routes

Base URL: `http://localhost:5000/api/tasks`

> All task routes require `Authorization: Bearer <token>` header

| Method | Endpoint | Description |
|--------|------------|----------------------|
| GET | `/` | Fetch all tasks |
| POST | `/` | Create a new task |
| PUT | `/:id` | Update a task by ID |
| DELETE | `/:id` | Delete a task by ID |

#### Task Schema
```json
{
  "staffName": "string (required, min 2 chars)",
  "task":      "string (required, min 5 chars)",
  "dateTime":  "Date   (required, must be future)",
  "status":    "string (default: Pending)"
}
```

---

## Authentication Flow

```
User fills Register form → Client-side validation
                                    ↓
                        POST /api/auth/register
                                    ↓
                     bcrypt hashes password → saved to MongoDB
                                    ↓
                         JWT token generated (7d expiry)
                                    ↓
                    Blinking ✓ Verified screen shown
                                    ↓
                    Token stored in localStorage
                                    ↓
                         Dashboard loads automatically
```

```
User fills Login form → POST /api/auth/login
                                ↓
                   Username looked up in MongoDB
                                ↓
                  bcrypt.compare(entered, hashed)
                                ↓
                     JWT token returned on match
                                ↓
              Token stored → Dashboard loads
```

```
Every Task API Request → Authorization: Bearer <token>
                                    ↓
                        authMiddleware verifies JWT
                                    ↓
                     ✓ Valid → request proceeds
                     ✗ Invalid → 401 Unauthorized
```

---

## Error Handling

### Backend

| Layer | Handling |
|----------------------|------------------------------------------------------|
| MongoDB connection | `try/catch` with `process.exit(1)` on failure |
| Register duplicate | Returns `400` if username or email already exists |
| Login invalid | Returns `401` if credentials don't match |
| JWT invalid/expired | Returns `401` with descriptive message |
| Task not found | Returns `404` if task ID doesn't exist |
| Route not found | Global `404` middleware returns `{ message }` |
| Server errors | Global Express error handler returns `500` |
| Unhandled rejections | `process.on("unhandledRejection")` logs and prevents crash |

### Frontend

| Layer | Handling |
|----------------------|------------------------------------------------------|
| Register/Login | `try/catch` shows exact server error message |
| Fetch tasks | `try/catch` with red error banner + Retry button |
| Create task | `try/catch` with red toast notification |
| Update/Delete task | `try/catch` with inline card error message |
| Form validation | Field-level validation before any API call |
| React render crash | `ErrorBoundary` catches and shows fallback UI with Reload |

### Form Validation Rules

**Register:**
- Username: required, minimum 2 characters
- Email: required, valid email format
- Password: required, minimum 6 characters
- Confirm Password: must match password

**Task Form:**
- Staff name: required, minimum 2 characters
- Task description: required, minimum 5 characters
- Date & Time: required, must be a future date/time

---

## Full Application Workflow

```
[ Register / Login ] → JWT Token issued
         ↓
[ Dashboard loads ] → GET /api/tasks (with Bearer token)
         ↓
[ Add Task ] → Client validation → POST /api/tasks
         ↓
[ Mongoose validates ] → Saved to MongoDB Atlas
         ↓
[ Task list refreshes automatically ]
         ↓
[ Mark Complete ] → PUT /api/tasks/:id → Blinking ✓ appears
         ↓
[ Edit Task ] → Inline edit → PUT /api/tasks/:id
         ↓
[ Delete Task ] → Confirm dialog → DELETE /api/tasks/:id
         ↓
[ Sign Out ] → Token cleared → Login screen
```

---

## Environment Variables Reference

| Variable | Description | Example |
|------------|-------------------------------|--------------------------------------|
| `PORT` | Backend server port | `5000` |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster...` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `your_secret_key_here` |

---

## Security Notes

- Passwords are hashed with `bcryptjs` (salt rounds: 10) before storing in MongoDB
- JWT tokens expire after 7 days
- `.env` is excluded from version control via `.gitignore`
- MongoDB credentials are never exposed in the frontend
- All task routes are protected by JWT middleware
- All API inputs are validated on both client and server side
- CORS is restricted to `http://localhost:3000` for local development

---

## License

This project is licensed under the **MIT License**.

---

<div align="center">

Built with ❤️ by [iBots](https://ibots.in)

</div>
