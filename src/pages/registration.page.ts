import { expect, Page } from '@playwright/test';
import type { RegistrationData } from '../types/test-data.types';
import { BasePage } from './base.page';

export interface RegistrationDetails extends RegistrationData {
  email: string;
}

export class RegistrationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async register(details: RegistrationDetails): Promise<void> {
    await this.navigate('/register');
    await this.page.getByRole('radio', { name: details.gender, exact: true }).check();
    await this.page.getByRole('textbox', { name: 'First name:' }).fill(details.firstName);
    await this.page.getByRole('textbox', { name: 'Last name:' }).fill(details.lastName);
    await this.page.getByRole('textbox', { name: 'Email:' }).fill(details.email);
    await this.page.getByRole('textbox', { name: 'Password:', exact: true }).fill(details.password);
    await this.page.getByRole('textbox', { name: 'Confirm password:' }).fill(details.password);
    await this.page.getByRole('button', { name: 'Register', exact: true }).click();
  }

  async expectRegistered(email: string): Promise<void> {
    await expect(this.page.getByText('Your registration completed')).toBeVisible();
    await expect(this.page.getByRole('link', { name: email, exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Log out', exact: true })).toBeVisible();
  }
}
