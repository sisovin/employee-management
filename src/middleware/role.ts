import { Context, Next } from 'hono';

const roleMiddleware = (roles: string[]) => {
  return async (ctx: Context, next: Next) => {
    const user = ctx.state.user;
    if (!user || !roles.includes(user.role)) {
      return ctx.json({ message: 'Forbidden' }, 403);
    }
    await next();
  };
};

export { roleMiddleware };
