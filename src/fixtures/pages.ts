import { test as base } from "@playwright/test";
import { ModelSelectionPage } from "@pages/modelSelection";

type PageFixtures = {
  modelSelectionPage: ModelSelectionPage;
};

export const test = base.extend<PageFixtures>({
  modelSelectionPage: async ({ page }, use) => {
    await use(new ModelSelectionPage(page));
  },
});
