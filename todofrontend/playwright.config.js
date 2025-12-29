// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5000
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    headless: true,
    baseURL: 'http://localhost:8080', // Backend testprofil
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
  },
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
  webServer: {
    command: 'vite', // starta frontend
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
});





