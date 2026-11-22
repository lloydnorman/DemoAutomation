import { expect, type Page } from '@playwright/test';
import type { NewsletterPollTestData } from '../types/newsletter-poll-test-data.types';
import { BasePage } from './base.page';

export class NewsletterPollPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }

  async subscribe(email: string): Promise<void> {
    await this.page.locator('#newsletter-email').fill(email);
    await this.page.getByRole('button', { name: 'Subscribe', exact: true }).click();
  }

  async expectInvalidEmail(data: NewsletterPollTestData): Promise<void> {
    await expect(this.page.getByText(data.invalidEmailMessage, { exact: true })).toBeVisible();
  }

  async expectSubscriptionSuccess(data: NewsletterPollTestData): Promise<void> {
    await expect(this.page.getByText(data.subscriptionSuccessMessage, { exact: true })).toBeVisible();
  }

  async voteFor(option: string): Promise<void> {
    await this.page.getByRole('radio', { name: option, exact: true }).check();
    await this.page.getByRole('button', { name: 'Vote', exact: true }).click();
  }

  async expectGuestVoteRestricted(data: NewsletterPollTestData): Promise<void> {
    await expect(this.page.getByText(data.guestVoteRestrictedMessage, { exact: true })).toBeVisible();
    await expect(this.page.getByRole('radio', { name: data.pollOption, exact: true })).toBeVisible();
  }
}
