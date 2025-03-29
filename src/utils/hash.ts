import { hash, verify } from 'argon2';

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password);
};

const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await verify(hashedPassword, password);
};

export { hashPassword, verifyPassword };
