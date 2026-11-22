import { expect, type Page } from '@playwright/test';
import type { StorefrontTestData } from '../types/storefront-test-data.types';
import { BasePage } from './base.page';

export class WishlistPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectProductAdded(data: StorefrontTestData): Promise<void> {
    await expect(this.page.getByText(data.wishlistAddedMessage, { exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Wishlist (1)', exact: true })).toBeVisible();
  }

  async openWithProduct(): Promise<void> {
    await this.page.getByRole('link', { name: 'Wishlist (1)', exact: true }).click();
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.productRow(productName)).toBeVisible();
  }

  async removeProduct(productName: string, data: StorefrontTestData): Promise<void> {
    await this.productRow(productName).locator('input[name="removefromcart"]').check();
    await this.page.getByRole('button', { name: 'Update wishlist', exact: true }).click();
    await expect(this.page.getByText(data.wishlistEmptyMessage, { exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Wishlist (0)', exact: true })).toBeVisible();
  }

  private productRow(productName: string) {
    return this.page.getByRole('row').filter({ hasText: productName });
  }
}
