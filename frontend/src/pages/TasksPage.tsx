import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TaskFormModal } from '../components/TaskFormModal';
import { TaskTable } from '../components/TaskTable';
import { Pagination } from '../components/Pagination';
import { createTask, deleteTask, fetchTasks, updateTask } from '../api';
import type { Task, TaskPayload } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { TASKS_PER_PAGE } from '../config';

export function TasksPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const debouncedSearch = useDebounce(search, 400);
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['tasks', page, debouncedSearch],
    queryFn: () => fetchTasks(page, debouncedSearch),
    placeholderData: (previousData) => previousData,
  });

  const { mutateAsync: createTaskMutation, isPending: isCreating } = useMutation({
    mutationFn: (payload: TaskPayload) => createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutateAsync: updateTaskMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: TaskPayload }) =>
      updateTask(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutateAsync: deleteTaskMutation, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const hasMutating = isCreating || isUpdating || isDeleting;

  const handleSubmit = async (payload: TaskPayload) => {
    if (editingTask) {
      await updateTaskMutation({ id: editingTask.id, payload });
    } else {
      await createTaskMutation(payload);
      setPage(1);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDelete = async (task: Task) => {
    const confirmed = window.confirm(`Delete task "${task.title}"? This action cannot be undone.`);
    if (!confirmed) return;
    await deleteTaskMutation(task.id);
  };

  const tasks = query.data?.tasks ?? [];
  const total = query.data?.total ?? 0;
  const paginationInfo = useMemo(
    () => ({ page: query.data?.page ?? 1, perPage: query.data?.perPage ?? TASKS_PER_PAGE }),
    [query.data?.page, query.data?.perPage],
  );

  return (
    <section className="card">
      <div className="card__header">
        <div>
          <h2>Tasks</h2>
          <p>{total} total tasks</p>
        </div>
        <div className="search-bar">
          <input
            type="search"
            placeholder="Search by title or description"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
          <button
            className="btn"
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
          >
            + Create Task
          </button>
        </div>
      </div>

      {query.isLoading ? (
        <div className="empty-state">Loading tasks…</div>
      ) : query.isError ? (
        <div className="empty-state">{(query.error as Error).message}</div>
      ) : (
        <>
          <TaskTable tasks={tasks} onEdit={(task) => {
            setEditingTask(task);
            setIsModalOpen(true);
          }} onDelete={handleDelete} />

          <Pagination
            page={paginationInfo.page}
            perPage={paginationInfo.perPage}
            total={total}
            onChange={(nextPage) => setPage(nextPage)}
          />
        </>
      )}

      <TaskFormModal
        open={isModalOpen}
        variant={editingTask ? 'edit' : 'create'}
        initialValues={editingTask ?? undefined}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmit}
        isSubmitting={hasMutating}
      />
    </section>
  );
}
