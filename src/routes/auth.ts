import { Hono } from 'hono';
import { authController } from '../controllers/authController.ts';
import { authMiddleware } from '../middleware/auth.ts';

const auth = new Hono();

auth.post('/signup', authController.signup);
auth.post('/login', authController.login);
auth.post('/logout', authMiddleware, authController.logout);
auth.post('/refresh-token', authController.refreshToken);

export { auth };
