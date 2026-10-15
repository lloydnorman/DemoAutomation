import { defineConfig, devices } from '@playwright/test';
import { isEnvironmentConfig } from './src/types/config.types';
import { readJsonFile } from './src/utils/json-reader';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const environment = process.env.TEST_ENV ?? 'dev';
const environmentConfig = readJsonFile(
  `config/env.${environment}.json`,
  isEnvironmentConfig,
);

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? Math.max(1, environmentConfig.retries) : environmentConfig.retries,
  workers: process.env.CI ? 1 : undefined,
  timeout: environmentConfig.testTimeoutMs,
  expect: { timeout: environmentConfig.expectTimeoutMs },
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL ?? environmentConfig.baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
