export type Task = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

export type PaginatedTaskResponse = {
  total: number;
  page: number;
  perPage: number;
  tasks: Task[];
};

export type TaskPayload = Pick<Task, 'title' | 'description'>;

export type AuditLog = {
  id: number;
  timestamp: string;
  action: 'Create Task' | 'Update Task' | 'Delete Task' | string;
  taskId: number | null;
  updatedContent: Record<string, unknown> | null;
};

export type PaginatedLogResponse = {
  total: number;
  page: number;
  perPage: number;
  logs: AuditLog[];
};
