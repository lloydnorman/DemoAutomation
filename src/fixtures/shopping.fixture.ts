import { test as base } from './base.fixture';
import { DesktopConfigurationPage } from '../pages/desktop-configuration.page.js';
import { ShoppingCartPage } from '../pages/shopping-cart.page.js';

export const test = base.extend<{
  desktopConfigurationPage: DesktopConfigurationPage;
  shoppingCartPage: ShoppingCartPage;
}>({
  desktopConfigurationPage: async ({ page }, use) => {
    await use(new DesktopConfigurationPage(page));
  },
  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },
});