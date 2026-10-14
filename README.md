# Employee Management System (EMS)

A role-based task management web app built with **React**, **Vite** and **Tailwind CSS**. Admins create and assign tasks; employees log in to accept tasks and mark them completed or failed.

> **Note:** This is a frontend-only project. There is no backend or API; data is stored in the browser's `localStorage`. See [Limitations](#limitations) and [Roadmap](#roadmap).

## Features

### Admin
- Log in as admin
- Create tasks with title, description, due date and category
- Assign a task to an employee by first name
- View a table of every employee's task counts (New, Active, Completed, Failed)

### Employee
- Log in with personal credentials
- Dashboard with live counters for New, Active, Completed and Failed tasks
- Click a counter to filter the task list by status
- Accept a new task, then mark it as completed or failed
- Progress is saved and restored after a page refresh

### General
- Role-based rendering (admin and employee see different dashboards)
- Session persistence across refreshes
- Responsive dark-themed UI

## Tech Stack

| Area        | Technology                     |
| ----------- | ------------------------------ |
| UI          | React 19                       |
| Build tool  | Vite 6                         |
| Styling     | Tailwind CSS 3, PostCSS        |
| State       | React Context API + hooks      |
| Persistence | Browser `localStorage`         |
| Linting     | ESLint 9                       |

## Project Structure

```
src/
├── main.jsx                      # Entry point, wraps App in AuthProvider
├── App.jsx                       # Login logic and role-based rendering
├── context/
│   └── AuthProvider.jsx          # Global employee/admin data, synced to localStorage
├── utils/
│   └── localStorage.jsx          # Seed data and storage helpers
└── components/
    ├── Auth/
    │   └── Login.jsx
    ├── Dashboard/
    │   ├── AdminDashboard.jsx
    │   └── EmployeeDashboard.jsx
    ├── TaskList/
    │   ├── TaskList.jsx
    │   └── TaskCard.jsx
    └── others/
        ├── header.jsx
        ├── CreateTask.jsx
        ├── AllTask.jsx
        └── TaskListNumbers.jsx
```

## How It Works

1. `AuthProvider` loads `employees` and `admin` from `localStorage` into React Context and writes them back whenever they change.
2. `App` checks the submitted credentials, sets the user's role, and saves the session under the `loggedInUser` key.
3. Depending on the role, `App` renders `AdminDashboard` or `EmployeeDashboard`.
4. Creating a task (admin) or changing a task's status (employee) updates the employee record and `localStorage`.

### Data model

```js
employee = {
  id, firstName, email, password,
  taskCounts: { active, newTask, completed, failed },
  tasks: [
    { taskTitle, taskDescription, taskDate, category,
      active, newTask, completed, failed }
  ]
}
```

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm

### Installation

```bash
git clone https://github.com/<your-username>/EmployeeManagementSystem.git
cd EmployeeManagementSystem
npm install
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

### Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start the development server   |
| `npm run build`   | Create a production build      |
| `npm run preview` | Preview the production build   |
| `npm run lint`    | Run ESLint                     |

## Demo Credentials

| Role     | Email                    | Password |
| -------- | ------------------------ | -------- |
| Admin    | `admin@example.com`      | `123`    |
| Employee | `e@e.com` (Arjun)        | `123`    |
| Employee | `employee2@example.com` (Sneha) | `123` |
| Employee | `employee3@example.com` (Ravi)  | `123` |
| Employee | `employee4@example.com` (Priya) | `123` |
| Employee | `employee5@example.com` (Karan) | `123` |

## Limitations

This project is a learning/demo app, not production software:

- Authentication is client-side only. Credentials are stored in plain text and the admin login is hardcoded.
- `localStorage` is per-browser: there is no multi-user sync, and data can be edited or cleared by anyone with access to the browser.
- Tasks are assigned by employee first name, so duplicate names would conflict.

## Roadmap

- [ ] Node/Express (or Firebase) backend with a REST API
- [ ] Real authentication: hashed passwords, JWT, protected routes
- [ ] React Router for URL-based navigation
- [ ] Assign tasks by employee ID, with a dropdown instead of free text
- [ ] Admin tools to add, edit and delete employees and tasks
- [ ] Unit tests (Vitest + React Testing Library)
- [ ] Deployment (Vercel or Netlify)

## License

This project is open source and available under the [MIT License](LICENSE).
