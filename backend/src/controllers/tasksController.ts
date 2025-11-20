import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import { sanitizeInput } from '../utils/sanitizer.js';
import { logAudit } from '../services/auditService.js';

const prisma = new PrismaClient();

const MAX_TITLE = 100;
const MAX_DESC = 500;

export async function getTasks(req: Request, res: Response) {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const take = 5;
  const skip = (page - 1) * take;
  const q = ((req.query.q as string) || '').trim();

  const where = q ? {
    OR: [
      { title: { contains: q } },
      { description: { contains: q } }
    ]
  } : {};

  const [total, tasks] = await Promise.all([
    prisma.task.count({ where }),
    prisma.task.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take })
  ]);
  res.json({ total, page, perPage: take, tasks });
}

export async function createTask(req: Request, res: Response) {
  const title = sanitizeInput(req.body.title || '');
  const description = sanitizeInput(req.body.description || '');

  if (!title || !description) return res.status(400).json({ error: 'Title and description are required.' });
  if (title.length > MAX_TITLE) return res.status(400).json({ error: 'Title too long.' });
  if (description.length > MAX_DESC) return res.status(400).json({ error: 'Description too long.' });

  const task = await prisma.task.create({ data: { title, description }});
  await logAudit('Create Task', task.id, { title: task.title, description: task.description, createdAt: task.createdAt });

  res.status(201).json(task);
}

export async function updateTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  const existing = await prisma.task.findUnique({ where: { id }});
  if (!existing) return res.status(404).json({ error: 'Task not found' });

  const title = sanitizeInput(req.body.title ?? existing.title);
  const description = sanitizeInput(req.body.description ?? existing.description);

  if (!title || !description) return res.status(400).json({ error: 'Title and description are required.' });
  if (title.length > MAX_TITLE) return res.status(400).json({ error: 'Title too long.' });
  if (description.length > MAX_DESC) return res.status(400).json({ error: 'Description too long.' });

  const updated = await prisma.task.update({
    where: { id },
    data: { title, description }
  });

  // compute changed fields
  const changed: any = {};
  if (existing.title !== title) changed.title = title;
  if (existing.description !== description) changed.description = description;

  if (Object.keys(changed).length > 0) {
    await logAudit('Update Task', id, changed);
  }

  res.json(updated);
}

export async function deleteTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  const existing = await prisma.task.findUnique({ where: { id }});
  if (!existing) return res.status(404).json({ error: 'Task not found' });

  await prisma.task.delete({ where: { id }});
  await logAudit('Delete Task', id, null);

  res.status(204).send();
}
