// spec: specs/demo-web-shop-e2e-test-plan.md
import { test } from '../../src/fixtures/newsletter-poll.fixture';
import { newsletterPollTestData } from '../../src/types/newsletter-poll-test-data';
import { createUniqueEmail } from '../../src/utils/account-test-data';

test.describe('Account and Customer Forms', () => {
  test('Submit newsletter and community poll inputs', async ({ newsletterPollPage }) => {
    const newsletterEmail = createUniqueEmail(newsletterPollTestData.newsletterEmailPrefix);

    await test.step('Reject an invalid newsletter email', async () => {
      await newsletterPollPage.open();
      await newsletterPollPage.subscribe(newsletterPollTestData.invalidEmail);
      await newsletterPollPage.expectInvalidEmail(newsletterPollTestData);
    });

    await test.step('Accept a unique newsletter email', async () => {
      await newsletterPollPage.open();
      await newsletterPollPage.subscribe(newsletterEmail);
      await newsletterPollPage.expectSubscriptionSuccess(newsletterPollTestData);
    });

    await test.step('Report that guest poll voting is restricted', async () => {
      await newsletterPollPage.voteFor(newsletterPollTestData.pollOption);
      await newsletterPollPage.expectGuestVoteRestricted(newsletterPollTestData);
    });
  });
});
