import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

export const refreshTokens = pgTable('refresh_tokens', {
  id: serial('id').primaryKey(),
  token: varchar('token', { length: 255 }).notNull(),
  userId: integer('user_id').notNull(),
  expiresAt: varchar('expires_at', { length: 255 }).notNull(),
});

export type RefreshToken = InferModel<typeof refreshTokens>;
export type NewRefreshToken = InferModel<typeof refreshTokens, 'insert'>;
