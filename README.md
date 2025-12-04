# Task Management Application

A full-stack MERN application for managing tasks with role-based access control.

## Features

- User Registration & Login with JWT authentication
- Password hashing using bcrypt
- Role-based access: User and Admin
- Task CRUD operations
- Admin can assign tasks to users
- Dashboard with filters and sorting

## Setup

### Prerequisites
- Node.js
- MongoDB running locally or MongoDB Atlas connection string

### Backend Setup

```bash
cd api
npm install
```

Create a `.env` file in the `api` folder:
```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRATION=7d
```

Start the server:
```bash
npm run dev
```

## API Endpoints

### Auth
- POST `/api/v1/auth/register` - Register new user
- POST `/api/v1/auth/login` - Login user
- POST `/api/v1/auth/logout` - Logout user
- GET `/api/v1/auth/profile` - Get current user profile

### Tasks
- GET `/api/v1/tasks` - Get all tasks (Admin: all, User: assigned only)
- GET `/api/v1/tasks/:id` - Get task by ID
- POST `/api/v1/tasks` - Create new task
- PUT `/api/v1/tasks/:id` - Update task
- DELETE `/api/v1/tasks/:id` - Delete task

### Dashboard
- GET `/api/v1/dashboard` - Get dashboard with user's tasks and stats

### Users (Admin only)
- GET `/api/v1/users` - Get all users
- GET `/api/v1/users/:id` - Get user by ID
- POST `/api/v1/users` - Create new user
- PUT `/api/v1/users/:id` - Update user
- DELETE `/api/v1/users/:id` - Delete user

## Query Parameters

Tasks and Dashboard endpoints support:
- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `search` - Search in title and description
- `sortBy` - Sort field (priority, dueDate, createdAt)
- `order` - Sort order (asc, desc)

## Testing

Run tests using Jest:
```bash
cd api
npm test
```

Tests use MongoDB Memory Server for in-memory database testing.
