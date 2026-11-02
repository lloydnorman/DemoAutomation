import { expect, type Page } from '@playwright/test';
import type { DesktopProductTestData } from '../types/desktop-product-test-data.types';
import { BasePage } from './base.page';

export class ShoppingCartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectDesktopLine(
    product: DesktopProductTestData,
    quantity: string,
    lineTotal: string,
  ): Promise<void> {
    await expect(this.desktopRow).toHaveCount(1);
    await expect(this.desktopRow).toContainText(product.productName);
    await expect(this.desktopRow).toContainText(product.processor.cartText);
    await expect(this.desktopRow).toContainText(product.ram.cartText);
    await expect(this.desktopRow).toContainText(product.hdd.cartText);
    await expect(this.desktopRow).toContainText(product.operatingSystem.cartText);
    await expect(this.desktopRow).toContainText(product.software.cartText);
    await expect(this.desktopRow).toContainText(product.additionalSoftware.cartText);
    await expect(this.desktopRow.getByRole('textbox')).toHaveValue(quantity);
    await expect(this.desktopRow.getByRole('cell').nth(3)).toContainText(product.unitPrice);
    await expect(this.desktopRow.getByRole('cell').nth(5)).toContainText(lineTotal);
  }

  async expectSubtotal(amount: string): Promise<void> {
    const escapedAmount = amount.replace('.', '\\.');
    const subtotalRow = this.page.getByRole('row', { name: new RegExp(`Sub-Total: ${escapedAmount}`) });
    await expect(subtotalRow.getByRole('cell').nth(1)).toContainText(amount);
  }

  async updateQuantity(quantity: string): Promise<void> {
    await this.desktopRow.getByRole('textbox').fill(quantity);
    await this.page.getByRole('button', { name: 'Update shopping cart', exact: true }).click();
  }

  async removeDesktop(productName: string): Promise<void> {
    const desktopRow = this.page.locator('.cart-item-row').filter({ hasText: productName });
    await desktopRow.getByRole('checkbox').check();
    await this.page.getByRole('button', { name: 'Update shopping cart', exact: true }).click();
    await expect(this.page.getByText('Your Shopping Cart is empty!', { exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Shopping cart (0)' })).toBeVisible();
    await expect(this.page.locator('.cart-item-row')).toHaveCount(0);
    await expect(this.page.getByRole('row', { name: /Sub-Total:/ })).toHaveCount(0);
  }

  private get desktopRow() {
    return this.page.locator('.cart-item-row');
  }
}