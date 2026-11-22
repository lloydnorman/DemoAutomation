import { expect, type Page } from '@playwright/test';
import type { DesktopProductTestData } from '../types/desktop-product-test-data.types';
import type { StorefrontTestData } from '../types/storefront-test-data.types';
import { BasePage } from './base.page';

export class CompareProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectProductVisible(product: DesktopProductTestData): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Compare products', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: product.productName, exact: true })).toBeVisible();
  }

  async clearList(data: StorefrontTestData): Promise<void> {
    await this.page.getByRole('link', { name: 'Clear list', exact: true }).click();
    await expect(this.page.getByText(data.emptyCompareListMessage, { exact: true })).toBeVisible();
  }
}
