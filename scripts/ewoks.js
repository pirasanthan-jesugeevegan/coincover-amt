import http from 'k6/http';
import { check, sleep } from 'k6';

const isNumeric = (value) => /^\d+$/.test(value);

const default_vus = 20;

const target_vus_env = `${__ENV.TARGET_VUS}`;
const target_vus = isNumeric(target_vus_env)
  ? Number(target_vus_env)
  : default_vus;

export let options = {
  vus: 100,
  stages: [
    { duration: '1m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '1m', target: 0 },
  ],
};

export default function () {
  const response = http.get('https://swapi.dev/api/people/30/', {
    headers: { Accepts: 'application/json' },
  });
  check(response, { 'status is 200': (r) => r.status === 200 });
  sleep(0.3);
}
