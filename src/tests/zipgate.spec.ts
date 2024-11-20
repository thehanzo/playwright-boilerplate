import { test } from "../fixtures/fixtures";

test.describe(
  "Zipgate validations",
  { tag: ["@smoke", "@regression", "@zipgate"] },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${process.env.BASEURL}/search-inventory`);
      console.log("Navigated to Search Inventory");
    });

    test("Search Inventory shows Zipcode search on load", async ({
      modelSelectionPage,
    }) => {
      await modelSelectionPage.verifyZipGatePageElements();
    });

    test("User enters Zipcode and gets redirected to Model Selection Page", async ({
      modelSelectionPage,
    }) => {
      await test.step("Submit zipcode", async () => {
        const validZip = "90210";
        await modelSelectionPage.enterZipcode(validZip);
        console.log(`Zipcode: ${validZip}`);
        await modelSelectionPage.submitZipcode();
      });
      await test.step("Validate page redirection", async () => {
        await modelSelectionPage.verifyModelSelectionPageRedirection();
      });
    });

    [
      { zipcode: "96813", errorRegion: "hawaii" },
      { zipcode: "00920", errorRegion: "puertoRico" },
      { zipcode: "96381", errorRegion: "invalid" },
    ].forEach(({ zipcode, errorRegion }) => {
      test(`User enters special Zipcode and gets redirected to ${errorRegion} Page`, async ({
        modelSelectionPage,
      }) => {
        await test.step("Submit zipcode", async () => {
          await modelSelectionPage.enterZipcode(zipcode);
          console.log(`Zipcode: ${zipcode}`);
          await modelSelectionPage.submitZipcode();
        });
        await test.step("Validate error page", async () => {
          await modelSelectionPage.validateZipcodeError(errorRegion);
        });
      });
    });
  },
);
