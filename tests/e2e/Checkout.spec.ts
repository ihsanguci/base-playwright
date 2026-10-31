import { test } from '../fixtures/globalFixtures';

// Sudah login via storageState (lihat auth.setup.ts). Setiap test mulai dengan 1 produk di cart.
test.beforeEach(async ({ productsPage, checkoutPage }) => {
  await productsPage.goto();
  await productsPage.addProductToCart(0);
  await checkoutPage.goToCart();
  await checkoutPage.expectCartItemCount(1);
});

test.describe('Successful Checkout', { tag: '@Positive' }, () => {
  test('Complete checkout with valid information', { tag: ['@TC006', '@smoke'] }, async ({ checkoutPage }) => {
    await checkoutPage.expectCheckoutButtonVisible();
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await checkoutPage.expectCompleteMessage();
  });

  test('Checkout with multiple products in cart', { tag: '@TC007' }, async ({ productsPage, checkoutPage }) => {
    await productsPage.goto();
    await productsPage.addProductToCart(1);
    const expectedNames = [await productsPage.getProductName(0), await productsPage.getProductName(1)];

    await checkoutPage.goToCart();
    await checkoutPage.expectCartItemNames(expectedNames);
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo('Jane', 'Smith', '54321');
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await checkoutPage.expectCompleteMessage();
  });
});

test.describe('Failed Checkout', { tag: '@Negative' }, () => {
  test.beforeEach(async ({ checkoutPage }) => {
    await checkoutPage.clickCheckout();
  });

  test('Checkout fails without first name', { tag: '@TC008' }, async ({ checkoutPage }) => {
    await checkoutPage.fillCheckoutInfo('', 'Doe', '12345');
    await checkoutPage.clickContinue();
    await checkoutPage.expectErrorMessage('First Name is required');
  });

  test('Checkout fails without last name', { tag: '@TC009' }, async ({ checkoutPage }) => {
    await checkoutPage.fillCheckoutInfo('John', '', '12345');
    await checkoutPage.clickContinue();
    await checkoutPage.expectErrorMessage('Last Name is required');
  });

  test('Checkout fails without postal code', { tag: '@TC010' }, async ({ checkoutPage }) => {
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '');
    await checkoutPage.clickContinue();
    await checkoutPage.expectErrorMessage('Postal Code is required');
  });
});
