import type { APIRequestContext } from '@playwright/test/types/test';
import { ENV_VARS } from '../env';
import { payloadGenerator } from '../utils/header-generator';
export async function createApplication(request: APIRequestContext) {
  const { onfido_baseurl, bearerToken } = ENV_VARS;
  const headers = {
    Authorization: `Token token=${bearerToken}`,
  };
  const data = {
    first_name: 'Jane',
    last_name: 'Doe',
    dob: '1990-01-31',
    address: {
      building_number: '100',
      street: 'Main Street',
      town: 'London',
      postcode: 'SW4 6EH',
      country: 'GBR',
    },
  };
  const payload = payloadGenerator(request, headers, data);
  const response = await request.post(
    `${onfido_baseurl}/v3.6/applicants`,
    ...payload
  );
  return response;
}
