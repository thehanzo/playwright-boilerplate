import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import 'dotenv/config'
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();
const sauceOptions = {
  'sauce:options': {
    extendedDebugging: true,
    capturePerformance: true
  }
}
/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  snapshotPathTemplate: 'src/tests/{testFileDir}/snapshots/{testFileName}/'+ process.env.test_env +'/{projectName}/{arg}{ext}',
  globalSetup: require.resolve('./globalSetup'),
  /* Maximum time one test can run for. */
  timeout: 30 * 1000, //30 seconds
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: Number(process.env.TIMEOUT),
    toHaveScreenshot: { threshold: 0.7 },
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: process.env.CI ? [['list'], ['html']] : [['list'], ['html']],
  reporter: [['html', { open: 'never' }]],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: process.env.BASEURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    ...sauceOptions
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Safari'],
        browserName: "chromium",
        viewport: { 
          width: Number(process.env.WIDTH), 
          height: Number(process.env.HEIGHT) 
         },
      },
    },

    {
     name: 'firefox',
     use: {
       ...devices['Desktop Firefox'],
       browserName: "firefox",
       viewport: { 
         width: Number(process.env.WIDTH), 
         height: Number(process.env.HEIGHT) 
        },
     },
    },

    {
     name: 'webkit',
     use: {
       ...devices['Desktop Safari'],
       browserName: "webkit",
       viewport: { 
         width: Number(process.env.WIDTH), 
         height: Number(process.env.HEIGHT) 
        },
     },
    },

    /* Test against mobile viewports. */

    {
      name: 'mobile safari',
      use: { ...devices['iPhone 14 Pro Max'],
       },
    },
    {
      name: 'mobile chrome',
      use: { ...devices['Galaxy S9+'],
       },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
