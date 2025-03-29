import { Context } from 'hono';
import { db } from '../config/db.ts';
import { users } from '../models/user.ts';
import { refreshTokens } from '../models/refreshToken.ts';
import { hashPassword, verifyPassword } from '../utils/hash.ts';
import { createJwt, verifyJwt } from '../utils/jwt.ts';

const signup = async (ctx: Context) => {
  const { name, email, password } = await ctx.req.json();
  const hashedPassword = await hashPassword(password);

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
    role: 'user',
  });

  return ctx.json({ message: 'User created successfully' });
};

const login = async (ctx: Context) => {
  const { email, password } = await ctx.req.json();
  const user = await db.select().from(users).where(users.email.eq(email)).one();

  if (!user || !(await verifyPassword(password, user.password))) {
    return ctx.json({ message: 'Invalid email or password' }, 401);
  }

  const accessToken = await createJwt({ userId: user.id, role: user.role });
  const refreshToken = await createJwt({ userId: user.id }, '7d');

  await db.insert(refreshTokens).values({
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  });

  return ctx.json({ accessToken, refreshToken });
};

const logout = async (ctx: Context) => {
  const { refreshToken } = await ctx.req.json();
  await db.delete(refreshTokens).where(refreshTokens.token.eq(refreshToken));
  return ctx.json({ message: 'User logged out successfully' });
};

const refreshToken = async (ctx: Context) => {
  const { refreshToken } = await ctx.req.json();
  const tokenRecord = await db.select().from(refreshTokens).where(refreshTokens.token.eq(refreshToken)).one();

  if (!tokenRecord) {
    return ctx.json({ message: 'Invalid refresh token' }, 401);
  }

  const newAccessToken = await createJwt({ userId: tokenRecord.userId });
  return ctx.json({ accessToken: newAccessToken });
};

export const authController = {
  signup,
  login,
  logout,
  refreshToken,
};
