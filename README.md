<div align="center">

<img src="https://ibots.in/wp-content/uploads/2025/03/Ibots-Logo-2048x827.png" height="60" alt="iBots Logo" />

# Task Manager Pro

**A full-stack enterprise task management system built with React, Node.js, Express & MongoDB**

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-c9a84c?style=flat-square)

</div>

---

## Overview

Task Manager Pro is a production-ready, full-stack web application designed for enterprise-level team workflow management. It enables managers to assign, track, and manage tasks across staff members with real-time status updates, intelligent filtering, and a luxury dark-themed UI.

---

## Features

- **Task Assignment** — Assign tasks to staff members with due date and time
- **Status Tracking** — Toggle tasks between `Pending` and `Completed` with a blinking visual indicator
- **Inline Editing** — Edit any task directly on the card without page reload
- **Live Search** — Filter tasks by staff name or task description in real time
- **Smart Filters** — Filter view by All / Pending / Completed with live counts
- **Dashboard Stats** — Real-time stats for Total, Pending, Completed, and Completion Rate
- **Error Handling** — Full exception handling on both frontend and backend
- **Responsive Design** — Works across desktop, tablet, and mobile screens

---

## Tech Stack

| Layer | Technology |
|------------|--------------------------------------|
| Frontend | React 18, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Styling | CSS-in-JS (inline styles + keyframes)|
| Dev Tools | Nodemon, Create React App |

---

## Project Structure

```
task-manager-app/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   └── taskController.js   # CRUD logic
│   ├── models/
│   │   └── Task.js             # Mongoose schema
│   ├── routes/
│   │   └── taskRoutes.js       # API routes
│   ├── server.js               # Express app entry point
│   └── .env                    # Environment variables (not committed)
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── ErrorBoundary.jsx   # Global React error boundary
        │   ├── TaskForm.jsx        # Task creation form
        │   ├── TaskItem.jsx        # Individual task card
        │   └── TaskList.jsx        # Task grid renderer
        ├── pages/
        │   └── Home.jsx            # Main dashboard page
        ├── api.js                  # Axios base instance
        ├── App.js                  # Root component
        └── index.css               # Global styles & animations
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

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Description |
|--------|------------|----------------------|
| GET | `/` | Fetch all tasks |
| POST | `/` | Create a new task |
| PUT | `/:id` | Update a task by ID |
| DELETE | `/:id` | Delete a task by ID |

### Task Schema

```json
{
  "staffName": "string (required, min 2 chars)",
  "task":      "string (required, min 5 chars)",
  "dateTime":  "Date   (required, must be future)",
  "status":    "string (default: Pending)"
}
```

---

## Error Handling

This application implements multi-layer exception handling across the full stack.

### Backend

| Layer | Handling |
|----------------------|------------------------------------------------------|
| MongoDB connection | `try/catch` with `process.exit(1)` on failure |
| Route not found | Global `404` middleware returns `{ message }` |
| Server errors | Global Express error handler returns `500` |
| Update/Delete | Returns `404` if task ID does not exist in DB |
| Unhandled rejections | `process.on("unhandledRejection")` logs and prevents crash |

### Frontend

| Layer | Handling |
|----------------------|------------------------------------------------------|
| Fetch tasks | `try/catch` with red error banner + Retry button |
| Create task | `try/catch` with red toast notification |
| Update/Delete task | `try/catch` with inline card error message |
| Form validation | Field-level validation before any API call |
| React render crash | `ErrorBoundary` component catches and shows fallback UI |

### Form Validation Rules

- Staff name: required, minimum 2 characters
- Task description: required, minimum 5 characters
- Date & Time: required, must be a future date/time

---

## Workflow

```
User fills form → Client-side validation → POST /api/tasks
                                                  ↓
                                         Mongoose validates schema
                                                  ↓
                                         Saved to MongoDB Atlas
                                                  ↓
                                         Response sent to frontend
                                                  ↓
                                         Task list refreshed automatically
```

**Status Toggle Flow:**
```
Click "Mark Complete" → PUT /api/tasks/:id → status: "Completed"
                                                  ↓
                                     Blinking green tick appears on card
                                                  ↓
                              Click "Revert to Pending" → status: "Pending"
```

---

## Environment Variables Reference

| Variable | Description | Example |
|------------|-------------------------------|--------------------------------------|
| `PORT` | Backend server port | `5000` |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster...` |

---

## Security Notes

- `.env` is excluded from version control via `.gitignore`
- MongoDB credentials are never exposed in the frontend
- All API inputs are validated on both client and server side
- CORS is enabled for local development only

---

## Screenshots

> UI built with a luxury dark theme — deep space background, gold accents, glassmorphism cards, and smooth animations.

---

## License

This project is licensed under the **MIT License**.

---

<div align="center">

Built with by [iBots](https://ibots.in)

</div>
