import { StandardHeader, Environment } from '../shared/types';

export type CorsResponseHeaders = {
  'Access-Control-Allow-Origin'?: string;
  'Access-Control-Allow-Methods': string;
  'Access-Control-Allow-Headers': string;
};

export const corsConfig = {
  [Environment.LOCAL]: ['http://localhost:5173', 'http://localhost:8080'],
  [Environment.DEV]: ['*'],
  [Environment.PROD]: ['*'],
};

export const corsMethods = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'];
export const corsAllowedHeaders = [...Object.values(StandardHeader), 'cache-control', 'x-requested-with',];
export const corsMaxAge = 86400;
