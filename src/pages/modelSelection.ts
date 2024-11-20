import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./common/base";

export class ModelSelectionPage extends BasePage {
 readonly Texts: any;
 readonly zipGatePage: Locator;
 readonly zipInputBox: Locator;
 readonly zipInputBoxToyota: Locator;
 readonly zipInputPin: Locator;
 readonly zipInputSearchButton: Locator;
 readonly zipInputSearchButtonToyota: Locator;
 // Model Selection Page
 readonly modelSelectionPage: Locator;
 readonly listingHeader: Locator;
 readonly categorySelector: Locator;
 readonly categoryLink: Locator;
 readonly tileGrid: Locator;
 // Vehicle cards
 readonly modelTile: Locator;
 readonly  modelImage: Locator;
 readonly modelName: Locator;
 readonly modelPrice: Locator;
 readonly modelStartingMSRP: Locator;
 readonly modelJellyDisclaimer: Locator;
 readonly modelDisclaimerTrigger: Locator;
 readonly modelMPG: Locator;
 // Error page
 readonly zipGate: Locator;
 readonly zipGateMessageContainer: Locator;
 readonly zipErrorInfo: Locator;
 readonly zipErrorDealerButton: Locator;

 constructor(page: Page) {
   super(page);
     this.zipGatePage = page.getByTestId("ZipGatePage");
     this.zipInputBox =  page.getByTestId("zipInputField");
     this.zipInputBoxToyota =  page.locator('[aria-label="zip code"]');
     this.zipInputPin =  page.getByTestId("Pin");
     this.zipInputSearchButton =  page.getByTestId("ZipSearch");
     this.zipInputSearchButtonToyota =  page.locator('[aria-label="submit"]');

     this.modelSelectionPage =  page.getByTestId("ModelSelectionPage");
     this.listingHeader =  page.getByTestId("ListingPageHeader");
     this.categorySelector =  page.getByTestId("CategorySelector");
     this.categoryLink =  page.getByTestId("Link");
     this.tileGrid =  page.getByTestId("TileGrid");

     this.zipGate =  page.getByTestId("ZipGate");
     this.zipGateMessageContainer =  page.getByTestId("ServiceMessage");
     this.zipErrorInfo =  page.getByTestId("Typography");
     this.zipErrorDealerButton =  page.getByTestId("LexusButton").first();

    this.Texts = {
      // ZipGate page
      searchBannerText: "SEARCH LEXUS INVENTORY IN YOUR AREA",
      // Model Selection Page
      imageDisclaimerText:
        "Images do not depict actual vehicles being offered by dealers and are shown for illustrative purposes only.",
      listingHeaderText: "SEARCH INVENTORY",
      listingHeaderTextToyota: "Search Inventory",
      // Error page
      sorryText: "WE'RE SORRY",
      availabilityText:
        "Lexus.com only has information for the continental United States. Local availability and pricing may vary, so we’ll help you find a local dealer.",
      availabilityTextToyota:
        "Toyota.com only has information about offers in the continental United States. Local availability and pricing may vary, so we'll help you find a local dealer.",
      puertoRicoDealerButtonText: "VISIT PUERTO RICO DEALERS",
      puertoRicoDealerButtonTextToyota: "Visit Puerto Rico dealers",
      hawaiiDealerButtonText: "VISIT SERVCO LEXUS DEALERS",
      hawaiiDealerButtonTextToyota: "Visit Hawaii dealers",
      modifyZipcodeText:
        "Modify your Zip Code below to search inventory in another region.",
      modifyZipcodeTextToyota:
        "To search inventory in another region, modify your ZIP Code below.",
      invalidZipcodeText: "Please enter a 5-digit Zip.",
      invalidZipcodeTextToyota: "Your ZIP is invalid",
    };
  }

//** Page Actions **/

  /**
   * This function receives a string and fills the zipcode input
   * @param zipcode
   */
  async enterZipcode(zipcode: string) {
    if (process.env.BASEURL.includes("toyota.com")) {
      await this.zipInputBoxToyota.type(zipcode);
    } else {
      await this.zipInputBox.fill(zipcode);
    }
  }

  /**
   * This function clicks the search zipcode button
   */
  async submitZipcode() {
    if (process.env.BASEURL.includes("toyota.com")) {
      await this.zipInputSearchButtonToyota.click();
    } else {
      await this.zipInputSearchButton.click();
    }
  }
  /**
   * This function returns a list of all the different models cards in the Page
   */
  async getAllModelsInList() {
    return await this.modelTile
      .filter({ has: this.modelName })
      .all();
  }

//** Validations **/

  async verifyZipGatePageElements() {
    await expect(this.zipGatePage).toBeVisible();
    await expect(this.zipGatePage).toHaveScreenshot();
    await expect(
      this.page.getByText(this.Texts.searchBannerText),
    ).toBeVisible();
    await expect(this.zipInputBox).toBeVisible();
    await expect(this.zipInputPin).toBeVisible();
    await expect(this.zipInputSearchButton).toBeVisible();
  }

  async verifyModelSelectionPageRedirection() {
    const listingHeaderText = process.env.BASEURL.includes("toyota.com")
      ? this.Texts.listingHeaderTextToyota
      : this.Texts.listingHeaderText;
    await expect(this.modelSelectionPage).toHaveCount(5);
    await expect(this.listingHeader).toHaveText(listingHeaderText);
    await expect(this.listingHeader).toBeVisible();
    await expect(this.categorySelector).toBeVisible();
    await expect(this.tileGrid).toHaveCount(4);
  }

  /**
   * This function receives a zipcode Region that errors and validates that the expected error message is displayed
   * @param errorRegion
   */
  async validateZipcodeError(errorRegion) {
    let unsupportedZipText;
    let modifyZipText;
    let invalidZipText;
    let dealerButtonTextHawaii;
    let dealerButtonTextPuertoRico;
    let navigateToDealerButton;
    if (process.env.BASEURL.includes("toyota.com")) {
      unsupportedZipText = this.Texts.availabilityTextToyota;
      modifyZipText = this.Texts.modifyZipcodeTextToyota;
      invalidZipText = this.Texts.invalidZipcodeTextToyota;
      dealerButtonTextHawaii = this.Texts.hawaiiDealerButtonTextToyota;
      dealerButtonTextPuertoRico = this.Texts.puertoRicoDealerButtonTextToyota;
      navigateToDealerButton = this.zipErrorDealerButton;
    } else {
      unsupportedZipText = this.Texts.availabilityText;
      modifyZipText = this.Texts.modifyZipcodeText;
      invalidZipText = this.Texts.invalidZipcodeText;
      dealerButtonTextHawaii = this.Texts.hawaiiDealerButtonText;
      dealerButtonTextPuertoRico = this.Texts.puertoRicoDealerButtonText;
      navigateToDealerButton = this.zipErrorDealerButton;
    }
    switch (errorRegion) {
      case "hawaii":
        await expect(this.page.getByText(await unsupportedZipText)).toBeVisible(
          { timeout: Number(process.env.TIMEOUT) },
        );
        await expect(navigateToDealerButton).toHaveText(
          await dealerButtonTextHawaii,
        );
        await expect(this.page.getByText(await modifyZipText)).toBeVisible();
        break;
      case "puertoRico":
        await expect(this.page.getByText(await unsupportedZipText)).toBeVisible(
          { timeout: Number(process.env.TIMEOUT) },
        );
        await expect(this.zipErrorDealerButton).toHaveText(
          await dealerButtonTextPuertoRico,
        );
        await expect(this.page.getByText(await modifyZipText)).toBeVisible();
        break;
      case "invalid":
        await expect(this.page.getByText(await invalidZipText)).toBeVisible();
        break;
    }
  }
   //* * Visual Validations */

   async visualValidationForZipGateLanding() {
    await expect(this.zipGatePage).toHaveScreenshot();
  }

  async visualValidationForZipcodeErrors(errorRegion) {
    let unsupportedZipText;
    let navigateToDealerButton;
    if (process.env.BASEURL.includes("toyota.com")) {
      unsupportedZipText = this.Texts.availabilityTextToyota;
      navigateToDealerButton = this.zipErrorDealerButton;
    } else {
      unsupportedZipText = this.Texts.availabilityText;
      navigateToDealerButton = this.zipErrorDealerButton;
    }
    switch (errorRegion) {
      case "hawaii":
        await expect(this.page.getByText(await unsupportedZipText)).toBeVisible(
          { timeout: Number(process.env.TIMEOUT) },
        );
        await expect(this.zipGateMessageContainer).toHaveScreenshot();
        await navigateToDealerButton.hover();
        await expect(navigateToDealerButton).toHaveScreenshot();
        break;
      case "puertoRico":
        await expect(this.page.getByText(await unsupportedZipText)).toBeVisible(
          { timeout: Number(process.env.TIMEOUT) },
        );
        await expect(this.zipGateMessageContainer).toHaveScreenshot();
        await navigateToDealerButton.hover();
        await expect(navigateToDealerButton).toHaveScreenshot();
        break;
    }
  }

  async visualValidationForModelSelection() {
    await expect(this.listingHeader).toHaveScreenshot();
    await expect(this.categorySelector).toHaveScreenshot();
    const modelList = await this.getAllModelsInList();
    for (let iter = 0; iter < modelList.length; iter++) {
      // modelList = await this.getAllModelsInList();
      const model = await modelList[iter];
      console.log(
        `Validating model card: ${await model.getByTestId("model-tile-name").innerText()}`,
      );
      await model
        .filter({ has: this.modelName })
        .scrollIntoViewIfNeeded();
      await this.explicitWait(250); // Wait for elements to be stable
      await expect(model).toHaveScreenshot();
    }
  }
}
