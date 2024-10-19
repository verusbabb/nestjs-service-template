import dotenv from "dotenv";
// import _ from "lodash";
import { SECRET_NOT_FOUND } from "../shared/types";

export function envConfig() {
  return getEnv();
}

let env: typeof process.env;

export function getEnv() {
  dotenv.config();
  console.log("process.env :>> ", process.env.NODE_ENV);
  return process.env.NODE_ENV ?? "DEV";
}

export function getSecret(key: string): string {
  return process.env[key] ?? SECRET_NOT_FOUND;
}
