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


## AI-Assisted Test Generation and Failure Analysis

This project includes local AI capabilities powered by Ollama and the Qwen2.5-Coder model.

### AI Test Generator

The test generator converts a plain-English testing requirement into Playwright TypeScript code.

**Workflow:**
1. Provide a testing requirement.
2. Ollama generates Playwright test code.
3. The generator saves the output to `ai/generated-tests/login-page.spec.ts`.
4. Review the generated code.
5. Execute the test with Playwright and verify the result.

Run the generator:

```bash
npx tsx ai/test-generator.ts
```

Provide a custom requirement:

```bash
npx tsx ai/test-generator.ts "Verify that the Sauce Demo login page displays the username and password fields."
```

Run the generated test:

```bash
npx playwright test ai/generated-tests/login-page.spec.ts --project=chromium
```

### AI Failure Analyzer

The failure analyzer uses the local AI model to explain a Playwright failure, identify a likely root cause, and suggest corrective actions.

Example:

```bash
npx tsx ai/failure-analyzer.ts "Playwright test failed: locator was not found."
```

The analyzer provides a likely cause, supporting evidence, recommended fixes, and a code example when sufficient information is available.

### Local AI Setup

1. Install [Ollama](https://ollama.com/download).
2. Download the model:

   ```bash
   ollama run qwen2.5-coder:7b
   ```

3. Install the project dependencies:

   ```bash
   npm ci
   npm install --save-dev tsx
   ```

4. Ensure Ollama is available locally at `http://localhost:11434`.

**Important:** The AI scripts require Ollama running on the local machine. The AI features are separate from the existing UI/API test suites and are not automatically executed by GitHub Actions.

### Safety and Limitations

- Review AI-generated code before executing it.
- Generated tests may contain incorrect selectors or assertions.
- AI failure analysis provides suggestions, not guaranteed root causes.
- The generator saves output to a dedicated folder and does not automatically execute generated code.
- Local model performance depends on available system resources.
