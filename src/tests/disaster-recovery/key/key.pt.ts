import { Options } from 'k6/options';
import http from 'k6/http';
import { post } from '@helper/request.helper';
import { ENV_VARS } from '@utils/env';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { header } from '../../../helper/request-header-generater.helper';
import { generateFullKeyRequestBody } from '../../../helper/rquest-body-generater.helper';

const { baseUrl_DR } = ENV_VARS;
const counter = [0, 0, 0, 0];
const keys = [
  'J5eaTRKmKGda67qgfPmk6zjX',
  '6FEph0rX9Jkuta4dJzDaCcQMmT9',
  'CE02C7h8T0dxt2Ayw4nH5D5J',
  'Lp1C51RES7CcHnfco0SHKfgS',
];

export let options: Options = {
  thresholds: {
    http_reqs: ['rate>=110'],
  },
  scenarios: {
    authentication_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 110 },
        { duration: '10s', target: 110 },
        { duration: '10s', target: 110 },
      ],
      gracefulRampDown: '0s',
      tags: { test_type: 'rate_limit' },
      exec: 'keyEndpoint',
    },
  },
};

export function keyEndpoint() {
  for (let i = 0; i < keys.length; i++) {
    const res = post(
      http,
      `${baseUrl_DR}/key`,
      generateFullKeyRequestBody({ type: 'invalid' }),
      header(keys[i]) // So we don't use up the keys
    );

    console.log(res.json(), `Key ${keys[i]}`);
    if (res.json().statusCode === 429) {
      counter[i] = counter[i] + 1;
    }
  }
  console.log(counter);
}
export function handleSummary(data: any) {
  return {
    './dist/index.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
