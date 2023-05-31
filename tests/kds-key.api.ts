import { test, expect } from '@playwright/test';
import { postKey } from '../requests/kds-key.request';
import { scenarios } from '../constants/kds-scenarios';
import { v4 as uuidv4 } from 'uuid';

import { executeQuery } from '../db/kds';

const headers = {
  Authorization: `Bearer local-auth-token`,
};
const body = {
  userEmail: 'test@test.com',
  userId: uuidv4(),
  walletId: uuidv4(),
  type: 'gpg',
};
const newCustomer = {
  customer_name: 'John Doesdsdsd',
  email: 'john.doe@examplesdsdsdsd.com',
};
test.describe('KDS - Key endpoint', () => {
  // //Given scenario
  // for (const scenario of scenarios) {
  //   test(scenario.test_title, async ({ request }) => {
  //     //When request is send
  //     const response = await postKey(request, scenario.headers, scenario.body);
  //     const body = await response.json();
  //     //Then the response should be
  //     expect(response.status()).toBe(scenario.status_code);
  //     expect(body).toMatchObject(scenario.response);
  //   });
  // }

  test('Verify that with valid key details that GPG key is successfully assigning with 200 status code', async ({
    request,
  }) => {
    // Execute the query
    const rows = await executeQuery(newCustomer);

    console.log(rows); // Print the query result

    const response = await postKey(request, headers, body);
    const res = await response.json();
    console.log(res);
  });
});
