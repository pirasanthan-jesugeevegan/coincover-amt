import { PlaywrightTestConfig } from '@playwright/test';
import baseConfig from '../playwright.config';

const { ...rest } = baseConfig;

const config: PlaywrightTestConfig = {
  testDir: '../src/tests/',
  testMatch: ['*.api.ts'],
  use: {
    headless: true,
  },
  ...rest,
};

export default config;
