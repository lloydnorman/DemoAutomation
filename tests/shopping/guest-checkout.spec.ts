// spec: specs/demo-web-shop-e2e-test-plan.md
// seed: tests/seed.spec.ts

import { test } from '../../src/fixtures/guest-checkout.fixture';
import { guestCheckoutData } from '../../test-data/common/guest-checkout.data';
import { desktopProductTestData } from '../../src/types/desktop-product-test-data';

test.describe('Cart and Checkout', () => {
  test('Complete a guest purchase', async ({ desktopConfigurationPage, shoppingCartPage, guestCheckoutPage }) => {
    const product = desktopProductTestData;
    const { billingAddress } = guestCheckoutData;

    // 1. Start in a fresh browser context with an empty cart. Add a physical product, accept the cart terms, and select Checkout.
    await test.step('Add a physical product to an empty cart', async () => {
      await desktopConfigurationPage.open(product.productPath);
      await desktopConfigurationPage.expectLoaded(product);
      await desktopConfigurationPage.expectCartEmpty();
      await desktopConfigurationPage.configure(product);
      await desktopConfigurationPage.expectConfiguration(product);
      await desktopConfigurationPage.addToCart(product.productId);
      await desktopConfigurationPage.expectAddedToCart(product.quantityToAdd);
      await desktopConfigurationPage.openCart(product.quantityToAdd);
      await shoppingCartPage.expectDesktopLine(product, product.quantityToAdd, product.lineTotalAfterAdd);
      await shoppingCartPage.expectSubtotal(product.lineTotalAfterAdd);
      await guestCheckoutPage.proceedToGuestCheckout(product.productName, product.quantityToAdd);
    });

    // 2. Select Checkout as Guest.
    await test.step('Open the one-page guest checkout', async () => {
      await guestCheckoutPage.checkoutAsGuest();
      await guestCheckoutPage.expectCheckoutStages();
    });

    // 3. Enter a valid billing address and verify missing required address data is reported inline.
    await test.step('Validate and complete the billing address', async () => {
      await guestCheckoutPage.expectBillingRequiredErrors();
      await guestCheckoutPage.enterBillingAddress(billingAddress);
      await guestCheckoutPage.continueFromBillingAddress(billingAddress);
    });

    // 4. Select an available shipping method and payment method.
    await test.step('Select shipping and payment methods', async () => {
      await guestCheckoutPage.continueWithShippingAddress();
      await guestCheckoutPage.selectShippingMethod(guestCheckoutData.shippingMethod);
      await guestCheckoutPage.selectPaymentMethod(guestCheckoutData.paymentMethod);
    });

    // 5. Review the order summary, confirm the demo-safe order, and verify completion.
    await test.step('Review and confirm the order', async () => {
      await guestCheckoutPage.continueFromPaymentInformation();
      await guestCheckoutPage.expectOrderSummary(
        product.productName,
        product.quantityToAdd,
        billingAddress,
        guestCheckoutData,
      );
      await guestCheckoutPage.confirmOrder();
      await guestCheckoutPage.expectOrderCompleted();
    });
  });
});
