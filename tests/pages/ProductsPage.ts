import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.productItems = page.locator('[data-test="inventory-item"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.addToCartButton = page.locator('[data-test*="add-to-cart"]');
    this.removeButton = page.locator('[data-test*="remove"]');
  }

  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  async isProductsPageDisplayed() {
    return await this.pageTitle.isVisible();
  }

  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  async addProductToCart(index: number): Promise<void> {
    const buttons = this.page.locator('[data-test*="add-to-cart"]');
    await buttons.nth(index).click();
  }

  async removeProductFromCart(index: number): Promise<void> {
    const buttons = this.page.locator('[data-test*="remove"]');
    if (await buttons.count() > index) {
      await buttons.nth(index).click();
    }
  }

  async sortBy(sortType: string): Promise<void> {
    await this.sortDropdown.selectOption(sortType);
  }

  async getProductName(index: number): Promise<string | null> {
    return await this.page
      .locator('[data-test="inventory-item-name"]')
      .nth(index)
      .textContent();
  }

  async getProductPrice(index: number): Promise<string | null> {
    return await this.page
      .locator('[data-test="inventory-item-price"]')
      .nth(index)
      .textContent();
  }

  async clickProduct(index: number): Promise<void> {
    await this.page.locator('[data-test="inventory-item-name"]').nth(index).click();
  }

  async getCartBadgeCount(): Promise<string | null> {
    return await this.cartBadge.textContent();
  }

  async expectProductCount(count: number): Promise<void> {
    await expect(this.productItems).toHaveCount(count);
  }

  async expectAddToCartButtonVisible(): Promise<void> {
    await expect(this.addToCartButton.first()).toBeVisible();
  }
}
