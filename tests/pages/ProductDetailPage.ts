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
    // Halaman list memakai data-test yang sama (inventory-item-name, dst.), jadi semua locator
    // di-scope ke container detail. Dengan begitu locator otomatis menunggu sampai navigasi
    // dari list ke detail selesai, bukan kena strict-mode violation di halaman list.
    const details = page.locator('.inventory_details_container');
    this.productName = details.getByTestId('inventory-item-name');
    this.productPrice = details.getByTestId('inventory-item-price');
    this.productDescription = details.getByTestId('inventory-item-desc');
    this.addToCartButton = details.getByTestId('add-to-cart');
    this.backButton = page.getByTestId('back-to-products');
    this.productImage = details.locator('.inventory_details_img');
  }

  async getProductName(): Promise<string> {
    return await this.productName.innerText();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async backToProducts(): Promise<void> {
    await this.backButton.click();
  }

  async expectProductName(name: string): Promise<void> {
    await expect(this.productName).toHaveText(name);
  }

  async expectProductInfoVisible(): Promise<void> {
    await expect(this.productName).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productDescription).toBeVisible();
    await expect(this.productImage).toBeVisible();
  }
}
