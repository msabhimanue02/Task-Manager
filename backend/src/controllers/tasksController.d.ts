import type { Request, Response } from 'express';
export declare function getTasks(req: Request, res: Response): Promise<void>;
export declare function createTask(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateTask(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteTask(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=tasksController.d.ts.map