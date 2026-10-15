import { test as base, expect } from '@playwright/test';
import { CustomerAccountPage } from '../pages/customer-account.page';
import { LoginPage } from '../pages/login.page';
import { PasswordRecoveryPage } from '../pages/password-recovery.page';
import { RegistrationPage } from '../pages/registration.page';

export const test = base.extend<{
  customerAccountPage: CustomerAccountPage;
  loginPage: LoginPage;
  passwordRecoveryPage: PasswordRecoveryPage;
  registrationPage: RegistrationPage;
}>({
  customerAccountPage: async ({ page }, use) => {
    await use(new CustomerAccountPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  passwordRecoveryPage: async ({ page }, use) => {
    await use(new PasswordRecoveryPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
});
