import { Options } from 'k6/options';
import http from 'k6/http';
import { createUser, login, createCrocodiles } from '@requests/example.request';
import { describe } from 'https://jslib.k6.io/functional/0.0.3/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import {
  randomIntBetween,
  randomItem,
} from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export let options: Options = {
  scenarios: {
    authentication_test: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      tags: { test_type: 'authentication' },
      exec: 'authTest',
    },
  },
};

let authToken;
const PASSWORD = 'superCroc2019';
const USERNAME = `testuser_${randomIntBetween(1, 10000000)}@coin.com`;

export function authTest() {
  describe(`01. Create a test user ${USERNAME}`, (t: any) => {
    let responses = createUser(http, {
      username: USERNAME,
      password: PASSWORD,
    });
    t.expect(responses.status)
      .as('status')
      .toEqual(201)
      .and(responses)
      .toHaveValidJson();
  });
  describe(`02. Authenticate the new user ${USERNAME}`, (t) => {
    let responses = login(http, {
      username: USERNAME,
      password: PASSWORD,
    });
    authToken = responses.json('access');
    t.expect(responses.status)
      .as('Auth status')
      .toBeBetween(200, 204)
      .and(responses)
      .toHaveValidJson()
      .and(responses.json('access'))
      .as('auth token')
      .toBeTruthy();
  });
  describe('03. Create a new crocodile', (t) => {
    let data = {
      name: `Croc Name`,
      sex: randomItem(['M', 'F']),
      date_of_birth: '2019-01-01',
    };
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    let resp = createCrocodiles(http, data, headers);

    t.expect(resp.status)
      .as('Croc creation status')
      .toEqual(201)
      .and(resp)
      .toHaveValidJson();
  });
}

export function handleSummary(data: any) {
  return {
    './dist/index.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
