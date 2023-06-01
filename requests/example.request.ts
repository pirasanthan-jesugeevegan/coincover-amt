import type { APIRequestContext } from '@playwright/test/types/test';
import { ENV_VARS } from '../env';
export async function getReq(request: APIRequestContext) {
  const { test_url } = ENV_VARS;

  const response = await request.get(`${test_url}/todos/1`);
  return response;
}
