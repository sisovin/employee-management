import { create, verify, getNumericDate } from "https://deno.land/x/djwt/mod.ts";
import { env } from "../config/env.ts";

const key = env.JWT_SECRET;

const createJwt = async (payload: object, exp: string | number = "1h") => {
  const jwt = await create({ alg: "HS256", typ: "JWT" }, { ...payload, exp: getNumericDate(exp) }, key);
  return jwt;
};

const verifyJwt = async (token: string) => {
  const payload = await verify(token, key, "HS256");
  return payload;
};

export { createJwt, verifyJwt };
