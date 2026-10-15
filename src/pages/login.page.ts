import { expect } from '@playwright/test';
import { BasePage } from './base.page';
import type { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('/login');
  }

  async expectFormVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Welcome, Please Sign In!' })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Email:' })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Password:' })).toBeVisible();
    await expect(this.page.getByRole('checkbox', { name: 'Remember me?' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Log in', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Email:' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password:' }).fill(password);
    await this.page.getByRole('button', { name: 'Log in', exact: true }).click();
  }

  async expectSignedIn(email: string): Promise<void> {
    await this.expectPath('/');
    await expect(this.page.getByRole('link', { name: email, exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Log out', exact: true })).toBeVisible();
  }

  async signOut(): Promise<void> {
    await this.page.getByRole('link', { name: 'Log out', exact: true }).click();
  }

  async expectSignedOut(): Promise<void> {
    await expect(this.page.getByRole('link', { name: 'Register', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Log in', exact: true })).toBeVisible();
  }

  async expectInvalidCredentials(): Promise<void> {
    await expect(this.page.getByText('Login was unsuccessful. Please correct the errors and try again.')).toBeVisible();
    await expect(this.page.getByText('No customer account found')).toBeVisible();
    await this.expectSignedOut();
  }

  async openPasswordRecovery(): Promise<void> {
    await this.page.getByRole('link', { name: 'Forgot password?' }).click();
  }
}
