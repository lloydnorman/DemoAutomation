import { expect } from '@playwright/test';
import { BasePage } from './base.page';
import type { Page } from '@playwright/test';

export class CustomerAccountPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.page.getByRole('link', { name: 'My account', exact: true }).click();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/customer\/info$/);
    await expect(this.page.getByRole('heading', { name: 'My account - Customer info', exact: true })).toBeVisible();
  }
}
