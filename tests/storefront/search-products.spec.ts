// spec: specs/demo-web-shop-e2e-test-plan.md
import { randomUUID } from 'node:crypto';
import { test } from '../../src/fixtures/storefront.fixture';
import { desktopProductTestData } from '../../src/types/desktop-product-test-data';
import { storefrontTestData } from '../../src/types/storefront-test-data';

test.describe('Storefront and Product Discovery', () => {
  test('Search for a product and handle no results', async ({ productPage, searchPage, storefrontPage }) => {
    const product = desktopProductTestData;
    const data = storefrontTestData;
    const noResultsQuery = `${data.noResultsQueryPrefix}-${randomUUID()}`;

    await test.step('Find and inspect a product from the store header search', async () => {
      await storefrontPage.open();
      await storefrontPage.expectCartEmpty();
      await searchPage.searchFromHeader(product.productName);
      await searchPage.openProductResult(product.productName);
      await productPage.expectSearchResultDetails(product, data);
    });

    await test.step('Show an empty result for a unique search term', async () => {
      await searchPage.openSearchPage();
      await searchPage.searchByKeyword(noResultsQuery);
      await searchPage.expectNoResults(data);
    });

    await test.step('Validate the minimum search term length', async () => {
      await searchPage.searchByKeyword('');
      await searchPage.expectMinimumSearchLengthError(data);
    });
  });
});
