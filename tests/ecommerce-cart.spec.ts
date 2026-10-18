
import { test, expect } from '../fixtures/test-fixtures';

test('user can add a product to the shopping cart', async ({
  page,
  loginPage,
  productsPage,
}) => {
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await productsPage.expectProductsPage();
  await productsPage.addProductToCart('Sauce Labs Backpack');

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await productsPage.openCart();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true }),
  ).toBeVisible();
});
