interface ConfigSettings {
  baseurl: string;
  cc_result_pass: string;
  cc_result_pending: string;
  onfido_baseurl: string;
  local_url: string;
  cc_result_fail: string;
  bearerToken: string;
  test_url: string;
  integrationToken: string;
  callback_href: string;
}

const ALL_ENV_VARS = {
  dev: {
    baseurl: 'https://ledger-idv.dev-consumer.coincover.com',
  },
  stage: {
    baseurl: 'https://ledger-idv.staging-consumer.coincover.com',
  },
};

type ENV = keyof typeof ALL_ENV_VARS;

let ENV;
let API_KEY;
let INTEGRATION_KEY;
try {
  ENV = __ENV.ENV;
  API_KEY = __ENV.API_KEY;
  INTEGRATION_KEY = __ENV.INTEGRATION_KEY;
} catch (error) {
  // Handle the exception or ignore it
}
try {
  ENV = process.env.ENV;
  API_KEY = process.env.API_KEY;
  INTEGRATION_KEY = process.env.INTEGRATION_KEY;
} catch (error) {
  // Handle the exception or ignore it
}

const env = ENV as ENV;

const config: ConfigSettings = {
  ...ALL_ENV_VARS[env],
  cc_result_pass: 'pass',
  cc_result_pending: 'pending',
  onfido_baseurl: 'https://api.eu.onfido.com',
  test_url: 'https://test-api.k6.io',
  local_url: 'http://localhost:3000/dev',
  cc_result_fail: 'fail',
  bearerToken: API_KEY ?? '',
  integrationToken: INTEGRATION_KEY ?? '',
  callback_href: 'protect-idv-gateway-ledger-tessi.aws.stg.ldg-tech.com',
};
export const ENV_VARS = config;
