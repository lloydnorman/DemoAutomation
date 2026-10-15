import { randomUUID } from 'node:crypto';
import { isAccountTestData, type AccountTestData } from '../types/test-data.types';
import { readJsonFile } from './json-reader';

export const accountTestData: AccountTestData = readJsonFile(
  'test-data/common/account.json',
  isAccountTestData,
);

export function createUniqueEmail(prefix: string): string {
  return `${prefix}.${randomUUID()}@example.com`;
}
