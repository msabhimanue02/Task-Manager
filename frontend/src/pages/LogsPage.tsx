import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAuditLogs } from '../api';
import { Pagination } from '../components/Pagination';
import { AuditLogTable } from '../components/AuditLogTable';
import { LOGS_PER_PAGE } from '../config';

const actionOptions = ['All', 'Create Task', 'Update Task', 'Delete Task'];

export function LogsPage() {
  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState<string>('All');

  const query = useQuery({
    queryKey: ['logs', page, actionFilter],
    queryFn: () => fetchAuditLogs(page, actionFilter === 'All' ? null : actionFilter),
    placeholderData: (previousData) => previousData,
  });

  const logs = query.data?.logs ?? [];
  const total = query.data?.total ?? 0;
  const perPage = query.data?.perPage ?? LOGS_PER_PAGE;

  return (
    <section className="card">
      <div className="card__header">
        <div>
          <h2>Audit Logs</h2>
          <p>Every action recorded for compliance visibility.</p>
        </div>
        <div className="search-bar">
          <select
            value={actionFilter}
            onChange={(event) => {
              setActionFilter(event.target.value);
              setPage(1);
            }}
          >
            {actionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {query.isLoading ? (
        <div className="empty-state">Loading logs…</div>
      ) : query.isError ? (
        <div className="empty-state">{(query.error as Error).message}</div>
      ) : (
        <>
          <AuditLogTable logs={logs} />
          <Pagination page={page} perPage={perPage} total={total} onChange={(nextPage) => setPage(nextPage)} />
        </>
      )}
    </section>
  );
}
