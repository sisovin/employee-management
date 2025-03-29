import { connect } from "https://deno.land/x/redis/mod.ts";
import { REDIS_URL } from "./env.ts";

const redis = await connect({
  hostname: REDIS_URL.hostname,
  port: REDIS_URL.port,
  password: REDIS_URL.password,
});

export default redis;
