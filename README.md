# Task Manager - MERN Stack Application

## Project Description
A full-stack Task Manager web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can register, login, and manage their personal tasks with features like priority setting, due dates, filtering, searching, and sorting.

## Tech Stack
- **Frontend:** React.js, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel (Frontend), Render (Backend)

## Setup Instructions

### Clone the repository
git clone https://github.com/Anshuraj23/task-app-mern.git
cd task-app-mern

### Backend Setup
cd backend
npm install
npm run dev

### Frontend Setup
cd frontend
npm install
npm start

### Environment Variables
Create a .env file in the backend folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## API Documentation

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

### Task Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| PATCH | /api/tasks/:id/toggle | Toggle completion |
| GET | /api/tasks/stats/summary | Get task statistics |

## Live Demo
- Frontend: https://task-app-mern-ten.vercel.app
- Backend: https://task-app-mern-qsa3.onrender.com