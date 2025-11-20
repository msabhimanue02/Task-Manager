# Task Manager Assessment

Full-stack task management platform featuring a hardened Express/Prisma API and a modern React UI that demonstrates production-minded patterns such as audit logging, optimistic UX, and strict input validation.

## Highlights

### Backend (Node.js + Express + Prisma)
- **Secure-by-default API** – Helmet, CORS, JSON parsing, request logging, and HTTP Basic Auth protect every `/api` route before requests reach business logic.
- **Robust task lifecycle** – Task CRUD endpoints validate user input, enforce length limits, sanitize data, and persist via Prisma with SQLite for easy local setup.
- **Auditability** – Every create/update/delete operation records an `AuditLog`, enabling compliance-grade traceability with filtering and pagination support.
- **Operational visibility** – Centralized error handler and structured audit payloads make the service easy to monitor and debug.

### Frontend (React + Vite + TypeScript)
- **Responsive dashboard** – Clean layout that balances tasks management and audit log viewing, switching via React Router.
- **Snappy data fetching** – TanStack Query handles caching, pagination, refetching, and error states while keeping UI responsive.
- **Productive forms** – React Hook Form + Zod validations power the modal-driven create/edit workflow with debounced search and confirmation dialogs.
- **Consistent UI primitives** – Reusable components for tables, pagination, and modals with accessible keyboard-friendly behaviors.

## Tech Stack

| Layer | Tools |
| --- | --- |
| Backend | Node.js, Express 5, Prisma ORM, SQLite, Helmet, Morgan |
| Frontend | React 19, Vite, TypeScript, TanStack Query, React Hook Form, Zod |
| Tooling | ESLint, TSX, dotenv, date-fns |

## Project Structure

```
task-manager-assessment/
├── backend/        # Express API, Prisma schema, and services
├── frontend/       # React client built with Vite
└── full-stack-assessment.pdf  # Challenge brief (for reference)
```

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/<repo>.git
cd task-manager-assessment

# Backend deps
cd backend
npm install

# Frontend deps
cd ../frontend
npm install
```

### 2. Configure environment

Create `backend/.env` with your desired port and database URL (SQLite by default):

```
PORT=4000
DATABASE_URL="file:./dev.db"
BASIC_AUTH_USER=admin
BASIC_AUTH_PASSWORD=change-me
```

Run Prisma migrations and generate the client:

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

### 3. Run the stack

**Backend:**

```bash
cd backend
npm run dev
# Server listening on http://localhost:4000
```

**Frontend:**

```bash
cd frontend
npm run dev
# Vite will print the local URL (default http://localhost:5173)
```

Log in using the Basic Auth credentials from your `.env`. The frontend proxies API calls to `http://localhost:4000/api` by default (see `frontend/src/config.ts`).

## API Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/tasks?page=1&q=` | Paginated tasks with optional search |
| POST | `/api/tasks` | Create task with `{ title, description }` |
| PUT | `/api/tasks/:id` | Update task fields and log diff |
| DELETE | `/api/tasks/:id` | Remove task and store audit log |
| GET | `/api/logs?page=1&action=&taskId=` | Filterable audit history |

All responses are JSON; validation errors return descriptive messages with proper HTTP status codes.

## Frontend Experience

- Global layout with navigation between **Tasks** and **Audit Logs**.
- Debounced search, client-side pagination controls, and optimistic table updates.
- Modal form supports both create and edit flows, automatically resetting pagination on new tasks.
- Audit log table surfaces structured JSON payloads to highlight what changed per action.

## Future Enhancements

1. Replace Basic Auth with JWT + role-based policies.
2. Add automated tests (Jest/Vitest) covering services and hooks.
3. Containerize services with Docker Compose for one-command bootstrapping.
4. Integrate CI workflows (GitHub Actions) for lint, test, and deploy gates.

---

**Why it stands out:** This codebase emphasizes security, maintainability, and user experience with clear separation of concerns and pragmatic tooling—ideal for showcasing full-stack craftsmanship to prospective employers.
