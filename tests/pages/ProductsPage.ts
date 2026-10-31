import { Page, Locator, expect } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productItems: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByTestId('title');
    this.productItems = page.getByTestId('inventory-item');
    this.productNames = page.getByTestId('inventory-item-name');
    this.productPrices = page.getByTestId('inventory-item-price');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
    await this.expectPageDisplayed();
  }

  async expectPageDisplayed(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Products');
  }

  /** Tombol "Add to cart" milik produk ke-`index` di list. */
  addToCartButton(index: number): Locator {
    return this.productItems.nth(index).getByRole('button', { name: 'Add to cart' });
  }

  /** Tombol "Remove" milik produk ke-`index` di list. */
  removeButton(index: number): Locator {
    return this.productItems.nth(index).getByRole('button', { name: 'Remove' });
  }

  async addProductToCart(index: number): Promise<void> {
    await this.addToCartButton(index).click();
  }

  async removeProductFromCart(index: number): Promise<void> {
    await this.removeButton(index).click();
  }

  async sortBy(sortType: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(sortType);
  }

  async getProductName(index: number): Promise<string> {
    return await this.productNames.nth(index).innerText();
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.productNames.allInnerTexts();
  }

  async getAllProductPrices(): Promise<number[]> {
    const prices = await this.productPrices.allInnerTexts();
    return prices.map((price) => Number(price.replace('$', '')));
  }

  async clickProduct(index: number): Promise<void> {
    await this.productNames.nth(index).click();
  }

  async expectProductCount(count: number): Promise<void> {
    await expect(this.productItems).toHaveCount(count);
  }

  async expectCartBadgeCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartBadge).toBeHidden();
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }
}
