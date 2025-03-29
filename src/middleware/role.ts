import { Context, Next } from 'hono';
import { db } from '../config/db.ts';
import { permissions } from '../models/permission.ts';

const roleMiddleware = (requiredPermissions: string[]) => {
  return async (ctx: Context, next: Next) => {
    const user = ctx.state.user;
    if (!user) {
      return ctx.json({ message: 'Forbidden' }, 403);
    }

    const userPermissions = await db.select(permissions.name)
      .from(permissions)
      .where(permissions.roleId.eq(user.roleId));

    const hasPermission = requiredPermissions.every(permission =>
      userPermissions.some(userPermission => userPermission.name === permission)
    );

    if (!hasPermission) {
      return ctx.json({ message: 'Forbidden' }, 403);
    }

    await next();
  };
};

export { roleMiddleware };
