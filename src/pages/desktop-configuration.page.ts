import { expect, type Page } from '@playwright/test';
import type { DesktopProductTestData } from '../types/desktop-product-test-data.types';
import { BasePage } from './base.page';

export class DesktopConfigurationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(productPath: string): Promise<void> {
    await this.navigate(productPath);
  }

  async expectLoaded(product: DesktopProductTestData): Promise<void> {
    await expect(this.page).toHaveURL((url) => url.pathname === product.productPath);
    await expect(this.page.getByRole('heading', { name: product.productName, exact: true })).toBeVisible();
    await expect(this.processor(product.productId)).toBeVisible();
    await expect(this.ram(product.productId)).toBeVisible();
    await expect(this.page.locator(`input[name="product_attribute_${product.productId}_3_6"]`)).toHaveCount(2);
    await expect(this.page.locator(`input[name="product_attribute_${product.productId}_4_7"]`)).toHaveCount(3);
    await expect(this.page.locator(`input[name="product_attribute_${product.productId}_8_8"]`)).toHaveCount(3);
    await expect(this.quantity(product.productId)).toBeVisible();
    await expect(this.addToCartButton(product.productId)).toBeVisible();
  }

  async expectCartEmpty(): Promise<void> {
    await expect(this.page.getByRole('link', { name: 'Shopping cart (0)' })).toBeVisible();
  }

  async configure(product: DesktopProductTestData): Promise<void> {
    await this.processor(product.productId).selectOption(product.processor.value);
    await this.ram(product.productId).selectOption(product.ram.value);
    await this.option(product.productId, '3_6', product.hdd.value).check();
    await this.option(product.productId, '4_7', product.operatingSystem.value).check();
    await this.option(product.productId, '8_8', product.software.value).check();
    await this.quantity(product.productId).fill(product.quantityToAdd);
  }

  async expectConfiguration(product: DesktopProductTestData): Promise<void> {
    await expect(this.processor(product.productId)).toHaveValue(product.processor.value);
    await expect(this.ram(product.productId)).toHaveValue(product.ram.value);
    await expect(this.option(product.productId, '3_6', product.hdd.value)).toBeChecked();
    await expect(this.option(product.productId, '4_7', product.operatingSystem.value)).toBeChecked();
    await expect(this.option(product.productId, '8_8', product.software.value)).toBeChecked();
    await expect(this.quantity(product.productId)).toHaveValue(product.quantityToAdd);
  }

  async addToCart(productId: string): Promise<void> {
    await this.addToCartButton(productId).click();
  }

  async expectAddedToCart(quantity: string): Promise<void> {
    await expect(this.page.locator('.bar-notification.success')).toContainText('The product has been added to your');
    await expect(this.page.getByRole('link', { name: `Shopping cart (${quantity})` })).toBeVisible();
  }

  async openCart(quantity: string): Promise<void> {
    await this.page.getByRole('link', { name: `Shopping cart (${quantity})` }).click();
  }

  private processor(productId: string) {
    return this.page.locator(`#product_attribute_${productId}_5_4`);
  }

  private ram(productId: string) {
    return this.page.locator(`#product_attribute_${productId}_6_5`);
  }

  private option(productId: string, attributeId: string, value: string) {
    return this.page.locator(`#product_attribute_${productId}_${attributeId}_${value}`);
  }

  private quantity(productId: string) {
    return this.page.locator(`#addtocart_${productId}_EnteredQuantity`);
  }

  private addToCartButton(productId: string) {
    return this.page.locator(`#add-to-cart-button-${productId}`);
  }
}