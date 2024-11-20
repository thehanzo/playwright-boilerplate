import { test as base } from '@playwright/test';

type VariablesFixtures = {
    isSaleEvent: boolean;
    isProduction: boolean;
    timeout: number;
    isHEAD: string;
    baseUrl: string;
    requestUrl: string;
    width: string;
    height: string;
};
export const test = base.extend<VariablesFixtures>({
    isSaleEvent: async ({}, use) => {
        await use(false);
    },
    isProduction: async ({}, use) => {
        await use(process.env.test_env === 'production');
    },
    baseURL: async ({}, use) => {
        await use(process.env.BASEURL);
    },
    isHEAD: async ({}, use) => {
        await use(process.env.HEAD);
    },
    requestUrl: async ({}, use) => {
        await use(process.env.REQUESTS_URL);
    },
    width: async ({}, use) => {
        await use(process.env.WIDTH);
    },
    height: async ({}, use) => {
        await use(process.env.HEIGHT);
    },
    timeout: async ({}, use) => {
        await use(process.env.TIMEOUT);
    },
});