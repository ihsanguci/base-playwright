import { Page, Locator, expect } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;
  readonly backButton: Locator;
  readonly productImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.addToCartButton = page.locator('[data-test*="add-to-cart"]');
    this.backButton = page.locator('[data-test="back-to-products"]');
    this.productImage = page.locator('[data-test="inventory-item-img"]');
  }

  async getProductName(): Promise<string | null> {
    return await this.productName.textContent();
  }

  async getProductPrice(): Promise<string | null> {
    return await this.productPrice.textContent();
  }

  async getProductDescription(): Promise<string | null> {
    return await this.productDescription.textContent();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async backToProducts(): Promise<void> {
    await this.backButton.click();
  }

  async expectProductNameVisible(): Promise<void> {
    await expect(this.productName).toBeVisible();
  }

  async expectProductPriceVisible(): Promise<void> {
    await expect(this.productPrice).toBeVisible();
  }

  async expectProductDescriptionVisible(): Promise<void> {
    await expect(this.productDescription).toBeVisible();
  }

  async expectAddToCartButtonVisible(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
  }

  async expectProductImageVisible(): Promise<void> {
    await expect(this.productImage).toBeVisible();
  }
}
