import { test as base } from "@playwright/test";
import { cookie } from "../helper/auth/cookie";

export const test = base.extend({
  page: async ({ context, page }, use) => {
    await context.addCookies([{ ...cookie }]);
    await use(page);
  },
});
