import dotenv from "dotenv";
import _ from "lodash";
import { SECRET_NOT_FOUND } from "../shared/types";

export function envConfig() {
  return getEnv();
}

let env: typeof process.env;

export function getEnv() {
  dotenv.config();
  return process.env;
}

export function getSecret(key: string): string {
  console.log("getSecret called with key:", key);
  console.log("process.env:", process.env);
  return process.env[key] ?? SECRET_NOT_FOUND;
}
