interface ConfigSettings {
  baseurl: string;
}

const ALL_ENV_VARS = {
  dev: {
    baseurl: 'https://jsonplaceholder.typicode.com',
  },
  stage: {
    baseurl: 'https://jsonplaceholder.typicode.com',
  },
};

type NodeENV = keyof typeof ALL_ENV_VARS;
const nodeENV = process.env['NODE_ENV'] as NodeENV;

const config: ConfigSettings = {
  ...ALL_ENV_VARS[nodeENV],
};
export const ENV_VARS = config;
