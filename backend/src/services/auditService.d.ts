/**
 * logAudit - stores audit record.
 * updatedContent should be an object or null; this function stringifies it for SQLite storage.
 */
export declare function logAudit(action: string, taskId?: number, updatedContent?: object | null): Promise<import(".prisma/client").AuditLog>;
//# sourceMappingURL=auditService.d.ts.map