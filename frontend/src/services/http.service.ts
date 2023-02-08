import Axios from "axios";
import _ from "lodash";
import { baseUrl, parseResponse } from "@/services/http.utils";
import type { ParseFunction } from "@/services/http.utils";

export function get<T>(
  url: string,
  params?: any,
  parseFn?: ParseFunction<T>
): Promise<T | Array<T>> {
  return doRequest({
    url,
    method: "GET",
    useToken: true,
    params: params,
    parseFn: parseFn,
  });
}

export function post<T>(
  url: string,
  body: any,
  parseFn?: ParseFunction<T>
): Promise<T | Array<T>> {
  return doRequest({
    url,
    method: "POST",
    useToken: true,
    body: body,
    parseFn: parseFn,
  });
}

export function put<T>(
  url: string,
  body: any,
  parseFn?: ParseFunction<T>
): Promise<T | Array<T>> {
  return doRequest({
    url,
    method: "PUT",
    useToken: true,
    body: body,
    parseFn: parseFn,
  });
}

export function del<T>(
  url: string,
  body?: any,
  parseFn?: ParseFunction<T>
): Promise<T | Array<T>> {
  return doRequest({
    url,
    method: "DELETE",
    useToken: true,
    body: body,
    parseFn: parseFn,
  });
}

export function pat<T>(
  url: string,
  body: any,
  parseFn?: ParseFunction<T>
): Promise<T | Array<T>> {
  return doRequest({
    url,
    method: "PATCH",
    useToken: true,
    body: body,
    parseFn: parseFn,
  });
}

interface RequestOptions<T> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  useToken: boolean;
  headers?: { [headerfield: string]: string };
  params?: any;
  body?: any;
  parseFn?: ParseFunction<T>;
}
export async function doRequest<T>(
  options: RequestOptions<T>
): Promise<T | Array<T>> {
  // eslint-disable-next-line prefer-const
  let { url, headers, parseFn } = options;

  if (!url.startsWith("/")) {
    url = "/" + url;
  }
  url = baseUrl + url;

  if (_.isNil(headers)) {
    headers = {};
  }

  /*     if (options.useToken) {
        const token = await auth.getToken();
        headers["Authorization"] = `Bearer ${token}`;
    } */

  const response = await Axios.request({
    url: url,
    method: options.method,
    headers: headers,
    params: options.params,
    data: options.body,
  });

  const parsedResponse = parseResponse(response.data, parseFn);
  if (parsedResponse === null) {
    throw new Error("Empty response body");
  }

  return parsedResponse;
}

export default {
  get,
  post,
  put,
  del,
  pat,
  doRequest,
};
