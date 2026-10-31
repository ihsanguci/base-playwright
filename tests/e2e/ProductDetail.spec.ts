import { test, expect } from '../fixtures/globalFixtures';

// Sudah login via storageState (lihat auth.setup.ts).
test.beforeEach(async ({ productsPage }) => {
  await productsPage.goto();
});

test.describe('Product Detail Page', { tag: '@Positive' }, () => {
  test('Open product detail page', { tag: '@TC021' }, async ({ productsPage, productDetailPage }) => {
    const name = await productsPage.getProductName(0);
    await productsPage.clickProduct(0);
    await expect(productDetailPage.page).toHaveURL(/inventory-item\.html/);
    await productDetailPage.expectProductName(name);
  });

  test('Display product information', { tag: '@TC022' }, async ({ productsPage, productDetailPage }) => {
    await productsPage.clickProduct(0);
    await productDetailPage.expectProductInfoVisible();
  });

  test('Add product to cart from detail page', { tag: '@TC023' }, async ({ productsPage, productDetailPage, checkoutPage }) => {
    await productsPage.clickProduct(0);
    const productName = await productDetailPage.getProductName();

    await productDetailPage.addToCart();
    await productsPage.expectCartBadgeCount(1);

    await checkoutPage.goToCart();
    await checkoutPage.expectCartItemNames([productName]);
  });

  test('Back to products from detail page', { tag: '@TC024' }, async ({ productsPage, productDetailPage }) => {
    await productsPage.clickProduct(0);
    await productDetailPage.backToProducts();
    await productsPage.expectPageDisplayed();
  });

  test('Open multiple product details', { tag: '@TC025' }, async ({ productsPage, productDetailPage }) => {
    const firstName = await productsPage.getProductName(0);
    const secondName = await productsPage.getProductName(1);

    await productsPage.clickProduct(0);
    await productDetailPage.expectProductName(firstName);

    await productDetailPage.backToProducts();
    await productsPage.clickProduct(1);
    await productDetailPage.expectProductName(secondName);
  });

  test('Add multiple products from detail pages', { tag: '@TC026' }, async ({ productsPage, productDetailPage }) => {
    await productsPage.clickProduct(0);
    await productDetailPage.addToCart();
    await productDetailPage.backToProducts();

    await productsPage.clickProduct(1);
    await productDetailPage.addToCart();
    await productDetailPage.backToProducts();

    await productsPage.expectCartBadgeCount(2);
  });
});
