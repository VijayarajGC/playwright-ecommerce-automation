
import { test, expect } from '../fixtures/test-fixtures';
import { users } from '../test-data/credentials';

test('valid user can log in successfully', async ({ page, loginPage }) => {
  await loginPage.open();
  await loginPage.login(
    users.standard.username,
    users.standard.password,
  );

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();
});

test('invalid password displays an error message', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login(
    users.invalidPassword.username,
    users.invalidPassword.password,
  );

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage)
    .toContainText('Username and password do not match');
});

test('empty credentials display a validation error', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login('', '');

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage)
    .toContainText('Username is required');
});
