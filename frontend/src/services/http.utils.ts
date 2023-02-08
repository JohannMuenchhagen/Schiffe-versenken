/* The API endpoint should be a local server (127.0.0.1) or, temporarily, duckdns.org
   In production however, the server runs on the same host (and same port) as the client, 
    so we don't need Cross-Origin requests and hence don't have to specify the host
   Result: `baseUrl` is `/api` in production mode and `http://127.0.0.1:8081/api` otherwise (in dev mode)
   The environment variable NODE_ENV is set by Vue: https://cli.vuejs.org/guide/mode-and-env.html#modes */
const prod = import.meta.env.MODE === "production";
/* export const baseUrl: string = prod ? "/api" : "http://127.0.0.1:8081/api"; */

/* Hier wird die baseURL gesetzt, Port und URL ist anzupassen !!! */
export const baseUrl: string = prod
  ? "https://ich-bin-das-backend.de/api"
  : "http://127.0.0.1:3000/api";

export type ParseFunction<T> = (x: T) => T;

export function parseResponse<T>(
  data: any,
  parseFn?: ParseFunction<T>
): T | Array<T> | null {
  if (!data) {
    return null;
  }

  if (parseFn === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(parseFn);
  } else {
    return parseFn(data);
  }
}
