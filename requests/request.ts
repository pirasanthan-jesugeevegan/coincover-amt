import type { APIRequestContext } from '@playwright/test/types/test';

export async function getReq(request: APIRequestContext) {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/todos/1'
  );
  return response;
}
