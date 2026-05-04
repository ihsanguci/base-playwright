import { test, expect } from '../fixtures/globalFixtures'

test.describe('Products Display', { tag: '@Positive' }, () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.USER_SAUCEDEMO || '', process.env.PASSWORD_SAUCEDEMO || '');
    await expect(productsPage.pageTitle).toBeVisible();
  });

  test('Display products list', { tag: '@TC011' }, async ({ productsPage }) => {
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('Display 6 products by default', { tag: '@TC012' }, async ({ productsPage }) => {
    await productsPage.expectProductCount(6);
  });

  test('Add product to cart', { tag: '@TC013' }, async ({ productsPage }) => {
    await productsPage.addProductToCart(0);
    const badgeText = await productsPage.getCartBadgeCount();
    expect(badgeText).toBe('1');
  });

  test('Add multiple products to cart', { tag: '@TC014' }, async ({ productsPage }) => {
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);
    await productsPage.addProductToCart(2);
    const badgeText = await productsPage.getCartBadgeCount();
    expect(badgeText).toBe('3');
  });
});

test.describe('Product Sorting', { tag: '@Positive' }, () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.USER_SAUCEDEMO || '', process.env.PASSWORD_SAUCEDEMO || '');
    await expect(productsPage.pageTitle).toBeVisible();
  });

  test('Sort products by name A to Z', { tag: '@TC015' }, async ({ productsPage }) => {
    await productsPage.sortBy('az');
    const firstName = await productsPage.getProductName(0);
    expect(firstName).toBeDefined();
  });

  test('Sort products by name Z to A', { tag: '@TC016' }, async ({ productsPage }) => {
    await productsPage.sortBy('za');
    const firstName = await productsPage.getProductName(0);
    expect(firstName).toBeDefined();
  });

  test('Sort products by price low to high', { tag: '@TC017' }, async ({ productsPage }) => {
    await productsPage.sortBy('lohi');
    const price = await productsPage.getProductPrice(0);
    expect(price).toBeDefined();
  });

  test('Sort products by price high to low', { tag: '@TC018' }, async ({ productsPage }) => {
    await productsPage.sortBy('hilo');
    const price = await productsPage.getProductPrice(0);
    expect(price).toBeDefined();
  });
});

test.describe('Remove Product from Cart', { tag: '@Positive' }, () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.USER_SAUCEDEMO || '', process.env.PASSWORD_SAUCEDEMO || '');
    await expect(productsPage.pageTitle).toBeVisible();
  });

  test('Remove product from cart', { tag: '@TC019' }, async ({ productsPage }) => {
    await productsPage.addProductToCart(0);
    let badgeText = await productsPage.getCartBadgeCount();
    expect(badgeText).toBe('1');

    await productsPage.removeProductFromCart(0);
    const badge = productsPage.page.locator('[data-test="shopping-cart-badge"]');
    const isVisible = await badge.isVisible();
    expect(isVisible).toBe(false);
  });

  test('Add and remove multiple products', { tag: '@TC020' }, async ({ productsPage }) => {
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);
    expect(await productsPage.getCartBadgeCount()).toBe('2');

    await productsPage.removeProductFromCart(0);
    expect(await productsPage.getCartBadgeCount()).toBe('1');
  });
});
