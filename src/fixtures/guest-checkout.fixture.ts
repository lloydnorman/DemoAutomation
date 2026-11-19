import { test as shoppingTest } from './shopping.fixture';
import { GuestCheckoutPage } from '../pages/guest-checkout.page';

export const test = shoppingTest.extend<{
  guestCheckoutPage: GuestCheckoutPage;
}>({
  guestCheckoutPage: async ({ page }, use) => {
    await use(new GuestCheckoutPage(page));
  },
});
