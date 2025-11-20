import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TaskPayload } from '../types';
import { sanitizeInput } from '../utils/sanitize';

const schema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less')
    .transform(sanitizeInput),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description must be 500 characters or less')
    .transform(sanitizeInput),
});

type TaskFormModalProps = {
  open: boolean;
  variant: 'create' | 'edit';
  initialValues?: TaskPayload;
  onClose: () => void;
  onSubmit: (data: TaskPayload) => Promise<void> | void;
  isSubmitting?: boolean;
};

export function TaskFormModal({
  open,
  variant,
  initialValues,
  onClose,
  onSubmit,
  isSubmitting = false,
}: TaskFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskPayload>({
    resolver: zodResolver(schema),
    defaultValues: initialValues ?? { title: '', description: '' },
  });

  useEffect(() => {
    reset(initialValues ?? { title: '', description: '' });
  }, [initialValues, reset, open]);

  if (!open) return null;

  const heading = variant === 'create' ? 'Create Task' : 'Update Task';
  const actionLabel = variant === 'create' ? 'Create' : 'Save Changes';

  return (
    <div className="modal" role="dialog" aria-modal>
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__content">
        <header className="modal__header">
          <h2>{heading}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>
        <form
          className="modal__body"
          onSubmit={handleSubmit(async (values) => {
            await onSubmit(values);
          })}
        >
          <label className="form-field">
            <span>Title</span>
            <input type="text" {...register('title')} placeholder="e.g. Design dashboard" />
            {errors.title && <small className="form-field__error">{errors.title.message}</small>}
          </label>

          <label className="form-field">
            <span>Description</span>
            <textarea
              rows={4}
              {...register('description')}
              placeholder="Describe the task context"
            />
            {errors.description && (
              <small className="form-field__error">{errors.description.message}</small>
            )}
          </label>

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? 'Saving…' : actionLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
