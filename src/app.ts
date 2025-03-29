import { Hono } from 'hono';
import { auth } from './routes/auth.ts';
import { employeeRouter } from './routes/employee.ts';
import { authMiddleware } from './middleware/auth.ts';
import { roleMiddleware } from './middleware/role.ts';

const app = new Hono();

app.use('/auth', auth);
app.use('/employees', authMiddleware, employeeRouter);

app.listen({ port: 8000 });

console.log('Server is running on http://localhost:8000');
