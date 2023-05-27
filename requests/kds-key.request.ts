import type { APIRequestContext } from '@playwright/test/types/test';
import { ENV_VARS } from '../env';
import { payloadGenerator } from '../utils/header-generator';
export async function postKey(
  request: APIRequestContext,
  headers: any,
  data: any
) {
  const { local_url } = ENV_VARS;
  const payload = payloadGenerator(request, headers, data);
  console.log(payload);

  const response = await request.post(`${local_url}/key`, ...payload);
  return response;
}
