import { test as base } from './base.fixture';
import { NewsletterPollPage } from '../pages/newsletter-poll.page';

export const test = base.extend<{
  newsletterPollPage: NewsletterPollPage;
}>({
  newsletterPollPage: async ({ page }, use) => {
    await use(new NewsletterPollPage(page));
  },
});
