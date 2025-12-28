// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test configuration
 * 
 * - testDir: mappen där testerna ligger
 * - fullyParallel: kör tester i parallella filer
 * - forbidOnly: faila om `test.only` finns
 * - retries: antal retries på CI
 * - workers: antal parallella arbetare
 * - reporter: HTML rapport
 * - use: globala testinställningar (baseURL, trace)
 * - projects: olika browser-projects
 * - webServer: starta frontend-server automatiskt
 */
export default defineConfig({
  testDir: './tests',          // Mappen med testfiler
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173', // Vite frontend URL
    trace: 'on-first-retry',          // samla trace vid första retry
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
    command: 'npm run dev',       // starta Vite
    url: 'http://localhost:5173', // vänta på denna URL innan test
    reuseExistingServer: true,    // återanvänd om server redan körs
    timeout: 120 * 1000,          // timeout 2 minuter
  },
});
