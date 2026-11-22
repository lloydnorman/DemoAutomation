import { expect, type Page } from '@playwright/test';
import type { StorefrontTestData } from '../types/storefront-test-data.types';
import { BasePage } from './base.page';

export class SearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async searchFromHeader(query: string): Promise<void> {
    await this.page.locator('#small-searchterms').fill(query);
    await this.page.getByRole('button', { name: 'Search', exact: true }).click();
  }

  async openSearchPage(): Promise<void> {
    await this.page.getByRole('link', { name: 'Search', exact: true }).click();
  }

  async searchByKeyword(query: string): Promise<void> {
    await this.searchKeyword.fill(query);
    await this.searchForm.getByRole('button', { name: 'Search', exact: true }).click();
  }

  async openProductResult(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName, exact: true }).click();
  }

  async expectNoResults(data: StorefrontTestData): Promise<void> {
    await expect(this.page.getByText(data.noResultsMessage, { exact: true })).toBeVisible();
  }

  async expectMinimumSearchLengthError(data: StorefrontTestData): Promise<void> {
    await expect(this.page.getByText(data.minimumSearchLengthMessage, { exact: true })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Search', exact: true })).toBeVisible();
    await expect(this.searchKeyword).toBeVisible();
  }

  private get searchKeyword() {
    return this.page.getByRole('textbox', { name: 'Search keyword:' });
  }

  private get searchForm() {
    return this.page.locator('form').filter({ hasText: 'Search keyword: Advanced' });
  }
}
