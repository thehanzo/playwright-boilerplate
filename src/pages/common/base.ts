import { type Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
    });
  }

  async waitAndClick(locator: string) {
    const element = this.page.locator(locator);
    await element.waitFor({
      state: "visible",
    });
    await element.click();
  }

  async waitAndClickByTestID(locator: string) {
    const element = this.page.getByTestId(locator);
    await element.waitFor({
      state: "visible",
    });
    await element.click();
  }

  async navigateTo(link: string) {
    await Promise.all([this.page.waitForNavigation(), this.page.click(link)]);
  }

  async navigateToUrl(site: string, url: string) {
    const baseUrl = site.includes("lexus")
      ? process.env.BASEURL
      : process.env.BASEURLTOYOTA;
    await this.page.goto(baseUrl + url);
    console.log(`Navigated to ${site} page: ${baseUrl + url}`);

    console.log(`URL includes Lexus?:${url.includes("lexus")}`);
  }

  async explicitWait(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }

  async refreshPage() {
    await this.page.reload();
  }

  async goBack() {
    await this.page.goBack();
  }

  isToyota() {
    return process.env.BASEURL.includes("toyota.com");
  }
}
