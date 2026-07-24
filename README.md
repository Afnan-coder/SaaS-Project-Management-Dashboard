# SaaS Project Management Dashboard

A full-stack MERN application for managing projects, tasks, teams, and users with secure authentication and role-based access control.

---

## 🚀 Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Refresh Token
- Forgot Password
- Reset Password
- Secure Password Hashing

### Dashboard

- Total Projects
- Active Projects
- Completed Tasks
- Pending Tasks

### Project Management

- Create Project
- Update Project
- Delete Project
- Project Status
- Project Priority
- Assign Client
- Project Deadline
- Search Projects
- Filter Projects
- Pagination

### Task Management

- Create Task
- Update Task
- Delete Task
- Assign Developer
- Task Status
- Task Priority
- Estimated Hours
- Due Date
- Search Tasks
- Filter Tasks
- Pagination

### User Management

- View Users
- Update User Role
- Delete User
- Search Users
- Filter Users
- Pagination

### Role Based Access

- Super Admin
- Manager
- Developer
- Client

### UI Features

- Responsive Design
- Toast Notifications
- Loading States
- Modern Dashboard
- Reusable Components
- Modal Forms

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Nodemailer
- Cookie Parser
- CORS
- Dotenv

---

## 📂 Project Structure

```
root
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   ├── utils
│   └── package.json
│
└── .gitignore
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Afnan-coder/SaaS-Project-Management-Dashboard.git
```

### Install Frontend

```bash
cd frontend
npm install
```

### Install Backend

```bash
cd backend
npm install
```

---

## Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=

MONGODB_URI=

ACCESS_TOKEN_SECRET=

REFRESH_TOKEN_SECRET=

EMAIL_SERVICE=

EMAIL_USER=

EMAIL_PASSWORD=

FRONTEND_URL=

NODE_ENV=
```

---

## Run Frontend

```bash
cd frontend
npm run dev
```

---

## Run Backend

```bash
cd backend
npm start
```

---

## Roles

| Role | Permissions |
|------|-------------|
| Super Admin | Full Access |
| Manager | Manage Projects & Tasks |
| Developer | View Assigned Tasks |
| Client | View Assigned Projects |

---


## Author

**Muhammad Afnan Ali**

Software Engineering Student

MERN Stack Developer