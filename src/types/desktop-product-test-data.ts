import { isDesktopProductTestData, type DesktopProductTestData } from './desktop-product-test-data.types.js';
import { readJsonFile } from '../utils/json-reader';

export const desktopProductTestData: DesktopProductTestData = readJsonFile(
  'test-data/common/desktop-product.json',
  isDesktopProductTestData,
);