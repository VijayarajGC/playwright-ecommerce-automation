
import { test, expect } from '../fixtures/test-fixtures';

test.beforeEach(async ({
  loginPage,
  productsPage,
  cartPage,
}) => {
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await productsPage.addProductToCart('Sauce Labs Backpack');
  await productsPage.openCart();
  await cartPage.proceedToCheckout();
});

test('checkout requires a first name', async ({
  page,
  checkoutPage,
}) => {
  await checkoutPage.enterCustomerInformation('', 'User', '600001');
  await checkoutPage.continueToOverview();

  await expect(checkoutPage.errorMessage)
    .toHaveText('Error: First Name is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});

test('checkout requires a last name', async ({
  page,
  checkoutPage,
}) => {
  await checkoutPage.enterCustomerInformation('Test', '', '600001');
  await checkoutPage.continueToOverview();

  await expect(checkoutPage.errorMessage)
    .toHaveText('Error: Last Name is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});

test('checkout requires a postal code', async ({
  page,
  checkoutPage,
}) => {
  await checkoutPage.enterCustomerInformation('Test', 'User', '');
  await checkoutPage.continueToOverview();

  await expect(checkoutPage.errorMessage)
    .toHaveText('Error: Postal Code is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});
