import type { APIRequestContext } from '@playwright/test/types/test';
import { payloadGenerator } from '../utils/header-generator';

export function get(
  request: APIRequestContext,
  url: string,
  headers?: {},
  data: Record<string, any> = {}
) {
  const payload = payloadGenerator(request, data, headers);
  const response = request.patch(url, ...payload);
  return response;
}

export function post(
  request: APIRequestContext,
  url: string,
  data: Record<string, any> = {},
  headers?: {}
) {
  const payload = payloadGenerator(request, data, headers);
  const response = request.post(url, ...payload);
  return response;
}

export function patch(
  request: APIRequestContext,
  url: string,
  data: Record<string, any> = {},
  headers?: {}
) {
  const payload = payloadGenerator(request, data, headers);
  const response = request.patch(url, ...payload);
  return response;
}
