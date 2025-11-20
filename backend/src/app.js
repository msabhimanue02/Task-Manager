import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import tasksRouter from './routes/tasks.js';
import logsRouter from './routes/logs.js';
import { errorHandler } from './middleware/errorHandler.js';
import { basicAuth } from './middleware/basicAuth.js';
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// Protect all API routes with Basic Auth
app.use('/api', basicAuth);
app.use('/api/tasks', tasksRouter);
app.use('/api/logs', logsRouter);
// centralized error handler
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map