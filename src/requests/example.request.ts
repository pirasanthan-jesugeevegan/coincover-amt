import type { APIRequestContext } from '@playwright/test/types/test';
import { ENV_VARS } from '../utils/env';
import { payloadGenerator } from '../utils/header-generator';

export function createUser(
  request: APIRequestContext,
  data: Record<string, any> = {},
  headers?: {}
) {
  const { test_url } = ENV_VARS;
  const payload = payloadGenerator(request, data, headers);
  const response = request.post(`${test_url}/user/register/`, ...payload);
  return response;
}

export function login(
  request: APIRequestContext,
  data: Record<string, any> = {},
  headers?: {}
) {
  const { test_url } = ENV_VARS;
  const payload = payloadGenerator(request, data, headers);
  const response = request.post(`${test_url}/auth/token/login/`, ...payload);
  return response;
}

export function createCrocodiles(
  request: APIRequestContext,
  data: Record<string, any> = {},
  headers?: {}
) {
  const { test_url } = ENV_VARS;
  const payload = payloadGenerator(request, data, headers);
  const response = request.post(`${test_url}/my/crocodiles/`, ...payload);
  return response;
}
