import { test, expect } from '../fixtures/globalFixtures'

test.describe('Successful Checkout', { tag: '@Positive' }, () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.USER_SAUCEDEMO || '', process.env.PASSWORD_SAUCEDEMO || '');
    await expect(productsPage.pageTitle).toBeVisible();
  });

  test('Complete checkout with valid information', { tag: '@TC006' }, async ({ checkoutPage }) => {
    await checkoutPage.goToCart();
    await checkoutPage.expectCheckoutButtonVisible();
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await checkoutPage.expectCompleteMessage();
  });

  test('Checkout with product in cart', { tag: '@TC007' }, async ({ checkoutPage, page }) => {
    const addButton = page.locator('[data-test*="add-to-cart"]').first();
    if (await addButton.isVisible()) {
      await addButton.click();
    }
    await checkoutPage.goToCart();
    const itemCount = await checkoutPage.getCartItemCount();
    expect(itemCount).toBeGreaterThan(0);
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo('Jane', 'Smith', '54321');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await checkoutPage.expectCompleteMessage();
  });
});

test.describe('Failed Checkout', { tag: '@Negative' }, () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.USER_SAUCEDEMO || '', process.env.PASSWORD_SAUCEDEMO || '');
    await expect(productsPage.pageTitle).toBeVisible();
  });

  test('Checkout fails without first name', { tag: '@TC008' }, async ({ checkoutPage }) => {
    await checkoutPage.goToCart();
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo('', 'Doe', '12345');
    await checkoutPage.clickContinue();
    const errorMessage = checkoutPage.page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('First Name is required');
  });

  test('Checkout fails without last name', { tag: '@TC009' }, async ({ checkoutPage }) => {
    await checkoutPage.goToCart();
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo('John', '', '12345');
    await checkoutPage.clickContinue();
    const errorMessage = checkoutPage.page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Last Name is required');
  });

  test('Checkout fails without postal code', { tag: '@TC010' }, async ({ checkoutPage }) => {
    await checkoutPage.goToCart();
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '');
    await checkoutPage.clickContinue();
    const errorMessage = checkoutPage.page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Postal Code is required');
  });
});
