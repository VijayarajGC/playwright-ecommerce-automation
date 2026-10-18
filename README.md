# E-Commerce UI Test Automation

A UI test automation project built with **Playwright and TypeScript** to validate essential e-commerce user journeys on the Sauce Demo practice application.

## Project Overview

This project demonstrates practical QA automation skills through reusable page objects, custom Playwright fixtures, positive and negative test scenarios, and automated browser testing.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Git and GitHub Actions

## Project Structure

```text
Projectqa/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── fixtures/
│   └── test-fixtures.ts
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── LoginPage.ts
│   └── ProductsPage.ts
├── test-data/
│   └── credentials.ts
├── tests/
│   ├── ecommerce-cart.spec.ts
│   ├── ecommerce-checkout-validation.spec.ts
│   ├── ecommerce-checkout.spec.ts
│   ├── ecommerce-login.spec.ts
│   └── example.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Test Scenarios

### Login
- Successful login with valid credentials
- Error message for an invalid password
- Validation for empty credentials

### Shopping Cart
- Add a product to the cart
- Verify the cart badge and selected product

### Checkout
- Complete the checkout journey
- Validate required customer information fields

## Design Approach

- **Page Object Model (POM):** Keeps page locators and actions organized.
- **Reusable fixtures:** Provides shared page objects to test cases.
- **Assertions:** Verifies navigation, visible elements, cart contents, and validation messages.
- **Test data separation:** Keeps practice credentials outside the test specifications.
- **GitHub Actions:** A workflow is included for CI execution.

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Projectqa
npm ci
npx playwright install chromium
```

### Run Tests

Run the Chromium test suite:

```bash
npx playwright test --project=chromium
```

Run a specific test file:

```bash
npx playwright test tests/ecommerce-login.spec.ts --project=chromium
```

Open the HTML test report:

```bash
npx playwright show-report
```

## Current Test Status

The current Chromium test suite has **10 passing tests** in the local environment.

## Application Under Test

[Sauce Demo](https://www.saucedemo.com/)

This is a portfolio and learning project for demonstrating software testing and automation practices.