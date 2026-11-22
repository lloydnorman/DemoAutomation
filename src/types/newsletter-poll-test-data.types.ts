export interface NewsletterPollTestData {
  invalidEmail: string;
  newsletterEmailPrefix: string;
  invalidEmailMessage: string;
  subscriptionSuccessMessage: string;
  pollOption: string;
  guestVoteRestrictedMessage: string;
}

export function isNewsletterPollTestData(value: unknown): value is NewsletterPollTestData {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.invalidEmail === 'string'
    && typeof candidate.newsletterEmailPrefix === 'string'
    && typeof candidate.invalidEmailMessage === 'string'
    && typeof candidate.subscriptionSuccessMessage === 'string'
    && typeof candidate.pollOption === 'string'
    && typeof candidate.guestVoteRestrictedMessage === 'string';
}
