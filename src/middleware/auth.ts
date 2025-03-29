import { Context, Next } from 'hono';
import { verifyJwt } from '../utils/jwt.ts';

const authMiddleware = async (ctx: Context, next: Next) => {
  const authHeader = ctx.req.headers.get('Authorization');
  if (!authHeader) {
    return ctx.json({ message: 'Authorization header missing' }, 401);
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return ctx.json({ message: 'Token missing' }, 401);
  }

  try {
    const payload = await verifyJwt(token);
    ctx.state.user = payload;
    await next();
  } catch (error) {
    return ctx.json({ message: 'Invalid token' }, 401);
  }
};

export { authMiddleware };
