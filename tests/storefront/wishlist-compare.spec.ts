// spec: specs/demo-web-shop-e2e-test-plan.md
import { test } from '../../src/fixtures/storefront.fixture';
import { desktopProductTestData } from '../../src/types/desktop-product-test-data';
import { storefrontTestData } from '../../src/types/storefront-test-data';

test.describe('Storefront and Product Discovery', () => {
  test('Add product to wishlist', async ({ productPage, wishlistPage }) => {
    const data = storefrontTestData;

    await productPage.open(data.wishlistProductPath);
    await productPage.expectLoaded(data.wishlistProductPath, data.wishlistProductName);
    await productPage.addToWishlist();
    await wishlistPage.expectProductAdded(data);
    await wishlistPage.openWithProduct();
    await wishlistPage.expectProductVisible(data.wishlistProductName);
    await wishlistPage.removeProduct(data.wishlistProductName, data);
  });

  test('Add and remove a product from the compare list', async ({ compareProductsPage, productPage }) => {
    const product = desktopProductTestData;
    const data = storefrontTestData;

    await test.step('Add the product to the compare list', async () => {
      await productPage.open(product.productPath);
      await productPage.addToCompareList();
      await compareProductsPage.expectProductVisible(product);
    });

    await test.step('Clear the compare list', async () => {
      await compareProductsPage.clearList(data);
    });
  });
});
