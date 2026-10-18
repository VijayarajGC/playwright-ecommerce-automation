import { test, expect } from '@playwright/test';

test('Verify that the Sauce Demo login page displays the username and password fields', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://www.saucedemo.com');

    // Check if the username field is displayed
    const usernameField = page.locator('#user-name');
    await expect(usernameField).toBeVisible();
    await expect(usernameField).toHaveAttribute('placeholder', 'Username');

    // Check if the password field is displayed
    const passwordField = page.locator('#password');
    await expect(passwordField).toBeVisible();
    await expect(passwordField).toHaveAttribute('placeholder', 'Password');
});