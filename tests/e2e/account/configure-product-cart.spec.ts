// spec: specs/demo-web-shop-e2e-test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../../../src/fixtures/shopping.fixture';
import { desktopProductTestData } from '../../../src/types/desktop-product-test-data';

test.describe('Cart and Checkout', () => {
  test('Configure a desktop and manage cart quantity', async ({ desktopConfigurationPage, shoppingCartPage }) => {
    const product = desktopProductTestData;

    await test.step('Open the desktop product with an empty cart', async () => {
      await desktopConfigurationPage.open(product.productPath);
      await desktopConfigurationPage.expectLoaded(product);
      await desktopConfigurationPage.expectCartEmpty();
    });

    await test.step('Configure the desktop and set quantity to 2', async () => {
      await desktopConfigurationPage.configure(product);
      await desktopConfigurationPage.expectConfiguration(product);
    });

    await test.step('Add the configured desktop and verify the cart line', async () => {
      await desktopConfigurationPage.addToCart(product.productId);
      await desktopConfigurationPage.expectAddedToCart(product.quantityToAdd);
      await desktopConfigurationPage.openCart(product.quantityToAdd);
      await shoppingCartPage.expectDesktopLine(product, product.quantityToAdd, product.lineTotalAfterAdd);
      await shoppingCartPage.expectSubtotal(product.lineTotalAfterAdd);
    });

    await test.step('Update the cart quantity to 1', async () => {
      await shoppingCartPage.updateQuantity(product.quantityAfterUpdate);
      await shoppingCartPage.expectDesktopLine(product, product.quantityAfterUpdate, product.subtotalAfterUpdate);
      await shoppingCartPage.expectSubtotal(product.subtotalAfterUpdate);
    });

    await test.step('Remove the desktop and verify the cart is empty', async () => {
      await shoppingCartPage.removeDesktop(product.productName);
    });
  });
});