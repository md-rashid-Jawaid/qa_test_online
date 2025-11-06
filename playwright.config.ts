import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './qa_test', // Folder where your tests live

  timeout: 30 * 1000, // 30 seconds per test

  expect: {
    timeout: 5000, // 5 seconds for assertions
  },

  fullyParallel: true, // Run tests in parallel

  forbidOnly: !!process.env.CI, // Prevent .only in CI

  retries: process.env.CI ? 2 : 0, // Retry failed tests on CI

  workers: process.env.CI ? 1 : undefined, // Limit workers on CI

  reporter: [['html', { open: 'never' }]], // Generate HTML test report

  use: {
    baseURL: 'https://playwright.dev', // Your app’s base URL
    headless: true, // Run browsers headless (set to false to see browser)
    screenshot: 'only-on-failure', // Capture screenshots on failure
    video: 'retain-on-failure', // Record video for failed tests
    trace: 'on-first-retry', // Capture trace on retry
  },

  // Optional: Run tests on multiple browsers
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'WebKit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
