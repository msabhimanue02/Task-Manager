import clsx from 'clsx';
import type { AuditLog } from '../types';
import { formatTimestamp } from '../utils/format';

const actionClassMap: Record<string, string> = {
  'Create Task': 'pill pill--create',
  'Update Task': 'pill pill--update',
  'Delete Task': 'pill pill--delete',
};

const renderUpdatedContent = (content: AuditLog['updatedContent']) => {
  if (!content || Object.keys(content).length === 0) {
    return <em>—</em>;
  }

  return (
    <ul className="updated-content-list">
      {Object.entries(content).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong> {String(value)}
        </li>
      ))}
    </ul>
  );
};

type AuditLogTableProps = {
  logs: AuditLog[];
};

export function AuditLogTable({ logs }: AuditLogTableProps) {
  if (logs.length === 0) {
    return <div className="empty-state">No audit entries yet.</div>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Action Type</th>
            <th>Task ID</th>
            <th>Updated Content</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{formatTimestamp(log.timestamp)}</td>
              <td>
                <span className={clsx('pill', actionClassMap[log.action] ?? 'pill')}>
                  {log.action}
                </span>
              </td>
              <td>{log.taskId ?? '—'}</td>
              <td>{renderUpdatedContent(log.updatedContent)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
