import { test, expect } from '../fixtures/globalFixtures'

test.describe('Product Detail Page', { tag: '@Positive' }, () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.USER_SAUCEDEMO || '', process.env.PASSWORD_SAUCEDEMO || '');
    await expect(productsPage.pageTitle).toBeVisible();
  });

  test('Open product detail page', { tag: '@TC021' }, async ({ productsPage, productDetailPage }) => {
    await productsPage.clickProduct(0);
    await productDetailPage.expectProductNameVisible();
    await productDetailPage.expectProductPriceVisible();
  });

  test('Display product information', { tag: '@TC022' }, async ({ productsPage, productDetailPage }) => {
    await productsPage.clickProduct(0);
    await productDetailPage.expectProductNameVisible();
    await productDetailPage.expectProductPriceVisible();
    await productDetailPage.expectProductDescriptionVisible();
    // await productDetailPage.expectProductImageVisible();
  });

  test('Add product to cart from detail page', { tag: '@TC023' }, async ({ productsPage, productDetailPage }) => {
    await productsPage.clickProduct(0);
    const productName = await productDetailPage.getProductName();

    await productDetailPage.addToCart();
    await expect(productsPage.page.locator('[data-test="shopping-cart-badge"]')).toBeVisible();

    const badgeText = await productsPage.getCartBadgeCount();
    expect(badgeText).toBe('1');
  });

  test('Back to products from detail page', { tag: '@TC024' }, async ({ productsPage, productDetailPage }) => {
    await productsPage.clickProduct(0);
    await productDetailPage.expectProductNameVisible();

    await productDetailPage.backToProducts();
    await expect(productsPage.pageTitle).toBeVisible();
  });

  test('Open multiple product details', { tag: '@TC025' }, async ({ productsPage, productDetailPage }) => {
    const firstName = await productsPage.getProductName(0);
    await productsPage.clickProduct(0);
    await productDetailPage.expectProductNameVisible();

    await productDetailPage.backToProducts();
    await productsPage.clickProduct(1);
    await productDetailPage.expectProductNameVisible();

    const secondProductName = await productDetailPage.getProductName();
    expect(secondProductName).not.toBe(firstName);
  });
});

test.describe('Product Detail - Add to Cart', { tag: '@Positive' }, () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(process.env.USER_SAUCEDEMO || '', process.env.PASSWORD_SAUCEDEMO || '');
    await expect(productsPage.pageTitle).toBeVisible();
  });

  test('Add multiple products from detail pages', { tag: '@TC026' }, async ({ productsPage, productDetailPage }) => {
    await productsPage.clickProduct(0);
    await productDetailPage.addToCart();
    await productDetailPage.backToProducts();

    await productsPage.clickProduct(1);
    await productDetailPage.addToCart();
    await productDetailPage.backToProducts();

    const badgeText = await productsPage.getCartBadgeCount();
    expect(badgeText).toBe('2');
  });
});
