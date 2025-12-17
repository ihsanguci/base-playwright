import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly chartButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]')
    this.errorMessage = page.locator('[data-test="error"]');
    this.chartButton = page.locator('[data-test="shopping-cart-link"]');
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL!); 
  }

  async login(username: string, password: string): Promise<void>{
    // await this.usernameField.click();
    await this.usernameField.fill(username);
    // await this.usernameField.press('Tab');
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async isLoginButtonVisible(): Promise<void>{
    await this.loginButton.isVisible();
  }

  async isErrorMessageVisible(): Promise<void>{
    await this.errorMessage.isVisible();
  }

  async expectErrorMessage(expectedResult :string): Promise<void>{
    await expect(this.errorMessage).toContainText(expectedResult);
  }

  async expectCartButtonVisible(): Promise<void>{
    await expect(this.chartButton).toBeVisible();
  }
}
