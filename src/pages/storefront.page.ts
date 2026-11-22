import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class StorefrontPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }

  async expectCartEmpty(): Promise<void> {
    await expect(this.page.getByRole('link', { name: 'Shopping cart (0)' })).toBeVisible();
  }

  async openCategory(name: string): Promise<void> {
    await this.page.getByRole('link', { name, exact: true }).first().click();
  }

  async expectCategoryVisible(name: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name, exact: true })).toBeVisible();
  }

  async openSubcategory(name: string): Promise<void> {
    await this.page.getByRole('link', { name, exact: true }).last().click();
  }

  async openProductFromListing(name: string): Promise<void> {
    await this.page.getByRole('heading', { name, exact: true }).click();
  }
}
