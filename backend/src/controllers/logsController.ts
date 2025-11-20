import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';

const prisma = new PrismaClient();
const DEFAULT_PER_PAGE = 10;
const MAX_PER_PAGE = 25;

const parsePositiveInt = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
};

const tryParseJson = (payload: string | null) => {
  if (!payload) return null;
  try {
    return JSON.parse(payload);
  } catch (err) {
    console.warn('Failed to parse audit payload', err);
    return null;
  }
};

export async function getLogs(req: Request, res: Response) {
  const page = Math.max(1, parsePositiveInt(req.query.page as string, 1));
  const perPageInput = parsePositiveInt(req.query.perPage as string, DEFAULT_PER_PAGE);
  const perPage = Math.min(perPageInput, MAX_PER_PAGE);
  const skip = (page - 1) * perPage;

  const where: Record<string, unknown> = {};
  const action = (req.query.action as string)?.trim();
  const taskIdRaw = req.query.taskId as string | undefined;

  if (action) where.action = action;
  if (taskIdRaw) {
    const parsedTaskId = Number(taskIdRaw);
    if (!Number.isNaN(parsedTaskId)) {
      where.taskId = parsedTaskId;
    }
  }

  const [total, logs] = await Promise.all([
    prisma.auditLog.count({ where }),
    prisma.auditLog.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      skip,
      take: perPage,
    }),
  ]);

  const normalized = logs.map((log) => ({
    ...log,
    updatedContent: tryParseJson(log.updatedContent ?? null),
  }));

  res.json({ total, page, perPage, logs: normalized });
}

