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
├── backend/        
└── frontend/ 
```
## API Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/tasks?page=1&q=` | Paginated tasks with optional search |
| POST | `/api/tasks` | Create task with `{ title, description }` |
| PUT | `/api/tasks/:id` | Update task fields and log diff |
| DELETE | `/api/tasks/:id` | Remove task and store audit log |
| GET | `/api/logs?page=1&action=&taskId=` | Filterable audit history |

All responses are JSON; validation errors return descriptive messages with proper HTTP status codes.

---

