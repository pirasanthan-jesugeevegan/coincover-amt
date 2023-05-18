import { test, expect } from '@playwright/test';
import { getReq } from '../requests/request';

test('checkbox should have been clicked', async ({ request }) => {
  const response = await getReq(request);
  const body = await response.json();
  console.log(body);
  expect(response.status()).toBe(200);
  expect(body.title).toBe('delectus aut autem');
});
