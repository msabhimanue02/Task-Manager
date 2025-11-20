// backend/src/services/auditService.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * logAudit - stores audit record.
 * updatedContent should be an object or null; this function stringifies it for SQLite storage.
 */
export async function logAudit(action: string, taskId?: number, updatedContent?: object | null) {
  const payload = updatedContent ? JSON.stringify(updatedContent) : null;
  return prisma.auditLog.create({
    data: {
      action,
      taskId: taskId ?? null,
      updatedContent: payload,
    },
  });
}
