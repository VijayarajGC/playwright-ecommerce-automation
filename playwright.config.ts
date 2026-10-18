
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Discover tests from the project root, including tests/ and tests-api/
  testDir: '.',

  // Exclude dependencies and generated output from test discovery
  testIgnore: [
    '**/node_modules/**',
    '**/playwright-report/**',
    '**/test-results/**',
  ],

  // Run test files in parallel
  fullyParallel: true,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI
  retries: process.env.CI ? 2 : 0,

  // Use one worker in CI; use Playwright's default locally
  workers: process.env.CI ? 1 : undefined,

  // Generate the HTML report
  reporter: [
  ['list'],
  ['html', { open: 'never' }],
],

  // Shared browser and page settings
  use: {
  baseURL: 'https://www.saucedemo.com',

  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'retain-on-failure',
},

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
