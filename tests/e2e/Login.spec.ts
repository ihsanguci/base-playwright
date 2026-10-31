import { test } from '../fixtures/globalFixtures';
import { requireEnv } from '../utils/env';

// Test login harus mulai dari kondisi belum login.
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test.describe('Successful Login', { tag: ['@Positive', '@smoke'] }, () => {
  test('Login with valid credentials', { tag: '@TC001' }, async ({ loginPage, productsPage }) => {
    await loginPage.login(requireEnv('USER_SAUCEDEMO'), requireEnv('PASSWORD_SAUCEDEMO'));
    await productsPage.expectPageDisplayed();
    await loginPage.expectCartButtonVisible();
  });
});

test.describe('Failed Login', { tag: '@Negative' }, () => {
  test('Login fails with wrong username', { tag: '@TC002' }, async ({ loginPage }) => {
    await loginPage.login('invalid_username', requireEnv('PASSWORD_SAUCEDEMO'));
    await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });

  test('Login fails with wrong password', { tag: '@TC003' }, async ({ loginPage }) => {
    await loginPage.login(requireEnv('USER_SAUCEDEMO'), 'invalid_password');
    await loginPage.expectErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });

  test('Login fails without username', { tag: '@TC004' }, async ({ loginPage }) => {
    await loginPage.login('', requireEnv('PASSWORD_SAUCEDEMO'));
    await loginPage.expectErrorMessage('Epic sadface: Username is required');
  });

  test('Login fails without password', { tag: '@TC005' }, async ({ loginPage }) => {
    await loginPage.login(requireEnv('USER_SAUCEDEMO'), '');
    await loginPage.expectErrorMessage('Epic sadface: Password is required');
  });
});
