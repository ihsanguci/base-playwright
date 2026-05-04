import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly cartButton: Locator;
  readonly checkoutButton: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly postalCodeField: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeMessage: Locator;
  readonly cartItems: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameField = page.locator('[data-test="firstName"]');
    this.lastNameField = page.locator('[data-test="lastName"]');
    this.postalCodeField = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeMessage = page.locator('[data-test="complete-header"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.removeButton = page.locator('[data-test*="remove"]');
  }

  async goToCart(): Promise<void> {
    await this.cartButton.click();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  async expectCompleteMessage(): Promise<void> {
    await expect(this.completeMessage).toContainText('Thank you for your order');
  }

  async expectCheckoutButtonVisible(): Promise<void> {
    await expect(this.checkoutButton).toBeVisible();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeFirstItem(): Promise<void> {
    const removeButtons = this.page.locator('[data-test*="remove"]');
    if (await removeButtons.count() > 0) {
      await removeButtons.first().click();
    }
  }
}
