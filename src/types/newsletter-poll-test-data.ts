import { readJsonFile } from '../utils/json-reader';
import { isNewsletterPollTestData, type NewsletterPollTestData } from './newsletter-poll-test-data.types';

export const newsletterPollTestData: NewsletterPollTestData = readJsonFile(
  'test-data/common/newsletter-poll.json',
  isNewsletterPollTestData,
);
