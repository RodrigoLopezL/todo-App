# Todo App front end

This is a Todo App built with React, TypeScript, and Vite. The app allows users to manage tasks with features like task creation, editing, deletion, sorting, filtering, and pagination. It also includes a time tracking feature to display average task completion times.

# Features

- Task Management: Create, edit, delete, and mark tasks as done/undone.
- Sorting: Sort tasks by priority or due date.
- Filtering: Filter tasks by name, priority, or state (done/undone).
- Pagination: Navigate through tasks with pagination controls.
- Time Tracking: View average task completion times by priority.
- Responsive Design: Fully responsive UI built with TailwindCSS.

# Tech Stack

- Frontend: React, TypeScript
- Build Tool: Vite
- Styling: TailwindCSS
- Testing: Vitest, React Testing Library
- API: Fetch-based integration with a backend service

# Installation

1.Clone the repository:
```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```
2.Install dependencies:
```bash
npm install
```
3.Start the development server:
```bash
npm run dev
```
4.Open the app in your browser at http://localhost:8080 (default port).

# Testing
This project uses Vitest for unit testing. To run tests:
```bash
npm run test
```
# API Endpoints
The app interacts with a backend API for task management. Below are the key endpoints:
- GET /todos: Fetch tasks with optional filters, pagination, and sorting.
- POST /todos: Create a new task.
- PUT /todos/:id: Update an existing task.
- PATCH /todos/:id/done: Mark a task as done.
- PATCH /todos/:id/undone: Mark a task as undone.
- DELETE /todos/:id: Delete a task.
- GET /todos/time: Fetch average task completion times.

