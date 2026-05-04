import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

type MyFixtures = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    checkoutPage: CheckoutPage;
    productDetailPage: ProductDetailPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
    productDetailPage: async ({ page }, use) => {
        const productDetailPage = new ProductDetailPage(page);
        await use(productDetailPage);
    }
});

export const expect = test.expect;