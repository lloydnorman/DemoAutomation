import { expect, type Page } from '@playwright/test';
import type { GuestBillingAddress, GuestCheckoutData } from '../../test-data/common/guest-checkout.data';
import { BasePage } from './base.page';

export class GuestCheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async proceedToGuestCheckout(productName: string, quantity: string): Promise<void> {
    await expect(this.page.getByRole('link', { name: productName, exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: `Shopping cart (${quantity})` })).toBeVisible();
    await this.page.locator('#termsofservice').check();
    await this.page.getByRole('button', { name: 'Checkout', exact: true }).click();
    await expect(this.page.getByRole('button', { name: 'Checkout as Guest' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: `Shopping cart (${quantity})` })).toBeVisible();
  }

  async checkoutAsGuest(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout as Guest' }).click();
    await expect(this.page.getByRole('heading', { name: 'Billing address' })).toBeVisible();
  }

  async expectCheckoutStages(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Billing address' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Payment method' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Payment information' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Confirm order' })).toBeVisible();
  }

  async expectBillingRequiredErrors(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).first().click();
    await expect(this.page.getByText('First name is required.')).toBeVisible();
    await expect(this.page.getByText('Last name is required.')).toBeVisible();
    await expect(this.page.getByText('Email is required.')).toBeVisible();
    await expect(this.page.getByText('Country is required.')).toBeVisible();
    await expect(this.page.getByText('City is required')).toBeVisible();
    await expect(this.page.getByText('Street address is required')).toBeVisible();
    await expect(this.page.getByText('Zip / postal code is required')).toBeVisible();
    await expect(this.page.getByText('Phone is required')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Billing address' })).toBeVisible();
  }

  async enterBillingAddress(address: GuestBillingAddress): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First name:' }).fill(address.firstName);
    await this.page.getByRole('textbox', { name: 'Last name:' }).fill(address.lastName);
    await this.page.getByRole('textbox', { name: 'Email:' }).fill(address.email);
    await this.page.getByLabel('Country:').selectOption({ label: address.country });
    await this.page.getByLabel('State / province:').selectOption({ label: address.state });
    await this.page.getByRole('textbox', { name: 'City:' }).fill(address.city);
    await this.page.getByRole('textbox', { name: 'Address 1:' }).fill(address.address1);
    await this.page.getByRole('textbox', { name: 'Zip / postal code:' }).fill(address.postalCode);
    await this.page.getByRole('textbox', { name: 'Phone number:' }).fill(address.phone);
  }

  async continueFromBillingAddress(address: GuestBillingAddress): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).first().click();
    await expect(this.page.getByRole('heading', { name: 'Shipping address' })).toBeVisible();
    const addressPattern = new RegExp(
      `${escapeRegExp(address.firstName)} ${escapeRegExp(address.lastName)}, ${escapeRegExp(address.address1)}, ${escapeRegExp(address.city)} ${escapeRegExp(address.postalCode)}, ${escapeRegExp(address.country)}`,
    );
    await expect(this.page.getByRole('option', { name: addressPattern })).toBeAttached();
  }

  async continueWithShippingAddress(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await expect(this.page.getByRole('heading', { name: 'Shipping method' })).toBeVisible();
  }

  async selectShippingMethod(method: string): Promise<void> {
    await this.page.getByRole('radio', { name: new RegExp(`^${escapeRegExp(method)} \\(`) }).check();
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await expect(this.page.getByRole('heading', { name: 'Payment method' })).toBeVisible();
  }

  async selectPaymentMethod(method: string): Promise<void> {
    await this.page.getByRole('radio', { name: new RegExp(escapeRegExp(method)) }).check();
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await expect(this.page.getByRole('heading', { name: 'Payment information' })).toBeVisible();
    await expect(this.page.getByText('You will pay by COD')).toBeVisible();
  }

  async continueFromPaymentInformation(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await expect(this.page.getByRole('heading', { name: 'Confirm order' })).toBeVisible();
  }

  async expectOrderSummary(
    productName: string,
    quantity: string,
    address: GuestBillingAddress,
    checkout: GuestCheckoutData,
  ): Promise<void> {
    const addressText = `${address.firstName} ${address.lastName}`;
    await expect(this.page.getByRole('listitem').filter({ hasText: addressText }).first()).toBeVisible();
    await expect(this.page.getByRole('listitem').filter({ hasText: checkout.paymentMethod })).toBeVisible();
    await expect(this.page.getByRole('listitem').filter({ hasText: checkout.shippingMethod })).toBeVisible();

    const productLink = this.page.getByRole('link', { name: productName, exact: true });
    await expect(productLink).toBeVisible();
    const productRow = this.page.getByRole('row').filter({ has: productLink });
    await expect(productRow).toHaveCount(1);
    await expect(productRow.getByRole('cell', { name: quantity, exact: true })).toBeVisible();
    await expect(this.page.getByRole('row', { name: `Total: ${checkout.expectedOrderTotal}`, exact: true })).toBeVisible();
  }

  async confirmOrder(): Promise<void> {
    await this.page.getByRole('button', { name: 'Confirm', exact: true }).click();
  }

  async expectOrderCompleted(): Promise<void> {
    await expect(this.page.getByText('Your order has been successfully processed!')).toBeVisible();
    await expect(this.page.getByText(/Order number: \d+/)).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Shopping cart (0)' })).toBeVisible();
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
