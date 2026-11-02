import { test } from '../../../src/fixtures/base.fixture';
import { accountTestData, createUniqueEmail } from '../../../src/utils/account-test-data';

test.describe('Login Recovery Validation', () => {
  test('Reject invalid login and request password recovery', async ({ loginPage, passwordRecoveryPage }) => {
    const unknownEmail = createUniqueEmail(accountTestData.invalidLogin.emailPrefix);

    await test.step('Open the login form', async () => {
      await loginPage.open();
      await loginPage.expectFormVisible();
    });

    await test.step('Reject credentials for an unknown account', async () => {
      await loginPage.signIn(unknownEmail, accountTestData.invalidLogin.password);
      await loginPage.expectInvalidCredentials();
    });

    await test.step('Request password recovery for the unknown account', async () => {
      await loginPage.openPasswordRecovery();
      await passwordRecoveryPage.expectFormVisible();
      await passwordRecoveryPage.recover(unknownEmail);
      await passwordRecoveryPage.expectEmailNotFound();
    });
  });
});