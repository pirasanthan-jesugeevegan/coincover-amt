import { test, expect } from '@playwright/test';
import { postKey } from '../requests/kds-key.request';
import { v4 as uuidv4 } from 'uuid';
import { scenarios } from '../constants/kds-scenarios';

test.describe('KDS - Key endpoint', () => {
  for (const scenario of scenarios) {
    test(scenario.test_title, async ({ request }) => {
      const response = await postKey(request, scenario.headers, scenario.body);
      const body = await response.json();
      console.log(body);

      expect(response.status()).toBe(scenario.status_code);
      expect(body).toMatchObject(scenario.response);
    });
  }
});
