import { test as setup } from './fixtures/globalFixtures';
import { requireEnv } from './utils/env';

export const AUTH_FILE = 'playwright/.auth/user.json';

// Login sekali lewat UI, simpan session-nya, lalu dipakai ulang oleh semua test.
setup('authenticate', async ({ page, loginPage, productsPage }) => {
  await loginPage.goto();
  await loginPage.login(requireEnv('USER_SAUCEDEMO'), requireEnv('PASSWORD_SAUCEDEMO'));
  await productsPage.expectPageDisplayed();
  await page.context().storageState({ path: AUTH_FILE });
});
