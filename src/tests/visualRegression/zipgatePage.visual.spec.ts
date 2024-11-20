import { test } from "../../fixtures/fixtures";

test.describe(
  "Zipgate visual regression",
  { tag: ["@smoke", "@regression", "@zipgate", "@visual"] },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${process.env.BASEURL}/search-inventory`);
    });

    test("Search Inventory landing screen", async ({ modelSelectionPage }) => {
      await modelSelectionPage.visualValidationForZipGateLanding();
    });

    [
      { zipcode: "96813", errorRegion: "hawaii" },
      { zipcode: "00920", errorRegion: "puertoRico" },
    ].forEach(({ zipcode, errorRegion }) => {
      test(`Zipcode error for ${errorRegion}`, async ({
        modelSelectionPage,
      }) => {
        await modelSelectionPage.enterZipcode(zipcode);
        await modelSelectionPage.submitZipcode();
        await modelSelectionPage.visualValidationForZipcodeErrors(errorRegion);
      });
    });
  },
);
