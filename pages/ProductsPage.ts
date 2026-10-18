
import { type Page, type Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productsHeading: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsHeading = page.getByText('Products', {
      exact: true,
    });
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async expectProductsPage() {
    await this.productsHeading.waitFor({ state: 'visible' });
  }

  async addProductToCart(productName: string) {
    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    await product
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
