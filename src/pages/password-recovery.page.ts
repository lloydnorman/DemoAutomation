import { expect } from '@playwright/test';
import { BasePage } from './base.page';
import type { Page } from '@playwright/test';

export class PasswordRecoveryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectFormVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/\/passwordrecovery$/);
    await expect(this.page.getByRole('heading', { name: 'Password recovery' })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Your email address:' })).toBeVisible();
  }

  async recover(email: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Your email address:' }).fill(email);
    await this.page.getByRole('button', { name: 'Recover', exact: true }).click();
  }

  async expectEmailNotFound(): Promise<void> {
    await expect(this.page.getByText('Email not found.', { exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Register', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Log in', exact: true })).toBeVisible();
  }
}
