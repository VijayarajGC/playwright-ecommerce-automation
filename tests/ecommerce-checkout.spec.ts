
import { test, expect } from '../fixtures/test-fixtures';

test('user can complete checkout successfully', async ({
  page,
  loginPage,
  productsPage,
  cartPage,
  checkoutPage,
}) => {
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await productsPage.expectProductsPage();
  await productsPage.addProductToCart('Sauce Labs Backpack');
  await productsPage.openCart();

  await cartPage.expectProductInCart('Sauce Labs Backpack');
  await cartPage.proceedToCheckout();

  await checkoutPage.enterCustomerInformation(
    'Test',
    'User',
    '600001',
  );

  await checkoutPage.continueToOverview();

  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true }),
  ).toBeVisible();

  await checkoutPage.finishOrder();

  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(checkoutPage.confirmationMessage)
    .toHaveText('Thank you for your order!');
});
