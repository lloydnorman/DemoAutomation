import { readJsonFile } from '../utils/json-reader';
import { isStorefrontTestData, type StorefrontTestData } from './storefront-test-data.types';

export const storefrontTestData: StorefrontTestData = readJsonFile(
  'test-data/common/storefront.json',
  isStorefrontTestData,
);
