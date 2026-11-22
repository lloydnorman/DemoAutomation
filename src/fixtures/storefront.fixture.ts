import { test as base } from './base.fixture';
import { CompareProductsPage } from '../pages/compare-products.page';
import { ProductPage } from '../pages/product.page';
import { SearchPage } from '../pages/search.page';
import { StorefrontPage } from '../pages/storefront.page';
import { WishlistPage } from '../pages/wishlist.page';

export const test = base.extend<{
  compareProductsPage: CompareProductsPage;
  productPage: ProductPage;
  searchPage: SearchPage;
  storefrontPage: StorefrontPage;
  wishlistPage: WishlistPage;
}>({
  compareProductsPage: async ({ page }, use) => {
    await use(new CompareProductsPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  storefrontPage: async ({ page }, use) => {
    await use(new StorefrontPage(page));
  },
  wishlistPage: async ({ page }, use) => {
    await use(new WishlistPage(page));
  },
});
