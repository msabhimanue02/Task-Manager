import type { Task } from '../types';
import { formatTimestamp } from '../utils/format';

type TaskTableProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
  if (tasks.length === 0) {
    return <div className="empty-state">No tasks found. Create one to get started.</div>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{formatTimestamp(task.createdAt)}</td>
              <td>
                <div className="pagination__controls">
                  <button className="btn btn--ghost" onClick={() => onEdit(task)}>
                    Edit
                  </button>
                  <button className="btn btn--danger" onClick={() => onDelete(task)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
