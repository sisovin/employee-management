import { Hono } from 'hono';
import { Employee } from '../models/employee.ts';
import { employeeController } from '../controllers/employeeController.ts';
import { authMiddleware } from '../middleware/auth.ts';
import { roleMiddleware } from '../middleware/role.ts';

const employeeRouter = new Hono();

employeeRouter.use('/employees', authMiddleware);

employeeRouter.get('/employees', employeeController.getAllEmployees);
employeeRouter.post('/employees', roleMiddleware(['admin']), employeeController.createEmployee);
employeeRouter.put('/employees/:id', roleMiddleware(['admin']), employeeController.updateEmployee);
employeeRouter.delete('/employees/:id', roleMiddleware(['admin']), employeeController.deleteEmployee);

export { employeeRouter };
