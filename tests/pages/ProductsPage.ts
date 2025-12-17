import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
  }

  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  async isProductsPageDisplayed() {
    return await this.pageTitle.isVisible();
  }
}
