import { mergeTests } from "@playwright/test";
import { test as BasePage } from "./basePage";
import { test as page } from "./pages";
import { test as variables } from '@fixtures/variables';

export const test = mergeTests(page, BasePage, variables);
export { expect } from "@playwright/test";
