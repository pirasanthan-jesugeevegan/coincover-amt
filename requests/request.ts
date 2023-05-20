import type { APIRequestContext } from '@playwright/test/types/test';
import { ENV_VARS } from '../env';
export async function getReq(request: APIRequestContext) {
  const { baseurl } = ENV_VARS;
  const response = await request.get(
    `${baseurl ?? 'https://jsonplaceholder.typicode.com'}/todos/1`
  );
  return response;
}
