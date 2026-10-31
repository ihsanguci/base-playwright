import { test, expect } from '../fixtures/globalFixtures';

// Sudah login via storageState (lihat auth.setup.ts).
test.beforeEach(async ({ productsPage }) => {
  await productsPage.goto();
});

test.describe('Products Display', { tag: '@Positive' }, () => {
  test('Display products list', { tag: '@TC011' }, async ({ productsPage }) => {
    await expect(productsPage.productItems.first()).toBeVisible();
  });

  test('Display 6 products by default', { tag: ['@TC012', '@smoke'] }, async ({ productsPage }) => {
    await productsPage.expectProductCount(6);
  });

  test('Add product to cart', { tag: '@TC013' }, async ({ productsPage }) => {
    await productsPage.addProductToCart(0);
    await productsPage.expectCartBadgeCount(1);
  });

  test('Add multiple products to cart', { tag: '@TC014' }, async ({ productsPage }) => {
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);
    await productsPage.addProductToCart(2);
    await productsPage.expectCartBadgeCount(3);
  });
});

test.describe('Product Sorting', { tag: '@Positive' }, () => {
  test('Sort products by name A to Z', { tag: '@TC015' }, async ({ productsPage }) => {
    await productsPage.sortBy('az');
    const names = await productsPage.getAllProductNames();
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test('Sort products by name Z to A', { tag: '@TC016' }, async ({ productsPage }) => {
    await productsPage.sortBy('za');
    const names = await productsPage.getAllProductNames();
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
  });

  test('Sort products by price low to high', { tag: '@TC017' }, async ({ productsPage }) => {
    await productsPage.sortBy('lohi');
    const prices = await productsPage.getAllProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('Sort products by price high to low', { tag: '@TC018' }, async ({ productsPage }) => {
    await productsPage.sortBy('hilo');
    const prices = await productsPage.getAllProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });
});

test.describe('Remove Product from Cart', { tag: '@Positive' }, () => {
  test('Remove product from cart', { tag: '@TC019' }, async ({ productsPage }) => {
    await productsPage.addProductToCart(0);
    await productsPage.expectCartBadgeCount(1);

    await productsPage.removeProductFromCart(0);
    await productsPage.expectCartBadgeCount(0);
    await expect(productsPage.addToCartButton(0)).toBeVisible();
  });

  test('Add and remove multiple products', { tag: '@TC020' }, async ({ productsPage }) => {
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(1);
    await productsPage.expectCartBadgeCount(2);

    await productsPage.removeProductFromCart(0);
    await productsPage.expectCartBadgeCount(1);
    await expect(productsPage.removeButton(1)).toBeVisible();
  });
});
