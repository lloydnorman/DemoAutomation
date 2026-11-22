// spec: specs/demo-web-shop-e2e-test-plan.md
import { test } from '../../src/fixtures/storefront.fixture';
import { desktopProductTestData } from '../../src/types/desktop-product-test-data';
import { storefrontTestData } from '../../src/types/storefront-test-data';

test.describe('Storefront and Product Discovery', () => {
  test('Browse a category and inspect a product', async ({ productPage, storefrontPage }) => {
    const product = desktopProductTestData;
    const data = storefrontTestData;

    await test.step('Browse Computers and its Desktops subcategory', async () => {
      await storefrontPage.open();
      await storefrontPage.expectCartEmpty();
      await storefrontPage.openCategory(data.computerCategory);
      await storefrontPage.expectCategoryVisible(data.computerCategory);
      await storefrontPage.openSubcategory(data.desktopCategory);
      await storefrontPage.expectCategoryVisible(data.desktopCategory);
      await storefrontPage.openProductFromListing(product.productName);
      await productPage.expectInspection(product, data);
    });

    await test.step('Return to Books using category navigation', async () => {
      await productPage.openCategoryBreadcrumb(data.computerCategory);
      await storefrontPage.openCategory(data.booksCategory);
      await storefrontPage.expectCategoryVisible(data.booksCategory);
      await productPage.expectProductNotVisible(product.productName);
    });
  });
});
