import { Options } from 'k6/options';
import { sleep } from 'k6';
import { postKey } from '@requests/kds-key.request';
import { describe } from 'https://jslib.k6.io/functional/0.0.3/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { setRampArrivalConfig } from '../config/performance-ramp-arrival-rate-config';
import http from 'k6/http';

export let options: Options = {
  thresholds: {
    checks: [{ threshold: 'rate == 1.00', abortOnFail: true }],
  },
  vus: 1,
  iterations: 1,
};

// export let options: Options = setRampArrivalConfig(
//   'RampArrivalRateConfigType4'
// );

export default async function () {
  describe('01. Fetch public crocs', async (t: any) => {
    const headers = {
      Authorization: 'Bearer local-auth-token',
    };
    const data = {
      userEmail: 'test2ssss@test.com',
      userId: '12344',
      walletId: '222',
      type: 'btc',
    };
    let responses = await postKey(http, headers, JSON.stringify(data));

    t.expect(responses.status)
      .as('response status')
      .toEqual(200)
      .and(responses)
      .toHaveValidJson();
  });
  sleep(1);
}
export function handleSummary(data: any) {
  return {
    './dist/index.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
