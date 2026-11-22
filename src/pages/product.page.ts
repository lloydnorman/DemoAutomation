import { expect, type Page } from '@playwright/test';
import type { DesktopProductTestData } from '../types/desktop-product-test-data.types';
import type { StorefrontTestData } from '../types/storefront-test-data.types';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(path: string): Promise<void> {
    await this.navigate(path);
  }

  async expectLoaded(path: string, productName: string): Promise<void> {
    await expect(this.page).toHaveURL((url) => url.pathname === path);
    await expect(this.page.getByRole('heading', { name: productName, exact: true })).toBeVisible();
  }

  async expectInspection(
    product: DesktopProductTestData,
    data: StorefrontTestData,
  ): Promise<void> {
    await this.expectProductHeader(product);
    await expect(this.page.getByText(data.productAvailability, { exact: true })).toBeVisible();
    await expect(this.page.getByText(data.productListingPrice, { exact: true })).toBeVisible();
    await expect(this.page.getByText(data.productDescription)).toBeVisible();
    await expect(this.page.getByRole('link', { name: data.computerCategory, exact: true }).nth(2)).toBeVisible();
    await expect(this.page.getByRole('link', { name: data.desktopCategory, exact: true }).nth(1)).toBeVisible();
    await expect(this.page.getByRole('combobox')).toHaveCount(2);
    await expect(this.page.getByRole('textbox', { name: 'Qty:' })).toBeVisible();
  }

  async expectSearchResultDetails(product: DesktopProductTestData, data: StorefrontTestData): Promise<void> {
    await this.expectProductHeader(product);
    await expect(this.page.getByText(data.productAvailability, { exact: true })).toBeVisible();
  }

  async openCategoryBreadcrumb(name: string): Promise<void> {
    await this.page.getByRole('link', { name, exact: true }).nth(2).click();
  }

  async addToWishlist(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add to wishlist', exact: true }).click();
  }

  async addToCompareList(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add to compare list', exact: true }).click();
  }

  async expectProductNotVisible(productName: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name: productName, exact: true })).toBeHidden();
  }

  private async expectProductHeader(product: DesktopProductTestData): Promise<void> {
    await this.expectLoaded(product.productPath, product.productName);
  }
}
