import { test } from '../../../src/fixtures/base.fixture';
import { accountTestData, createUniqueEmail } from '../../../src/utils/account-test-data';

test.describe('Login Recovery Validation', () => {
  test('Reject invalid login and request password recovery', async ({ loginPage, passwordRecoveryPage }) => {
    const unknownEmail = createUniqueEmail(accountTestData.invalidLogin.emailPrefix);

    // 1. Start in a fresh browser context and open Log in.
    await loginPage.open();
    await loginPage.expectFormVisible();

    // 2. Submit invalid credentials for an email that is not registered in this run.
    console.log(`Testing with unknown email: ${unknownEmail}`);
    await loginPage.signIn(unknownEmail, accountTestData.invalidLogin.password);
    await loginPage.expectInvalidCredentials();

    // 3. Open Forgot password, enter a syntactically valid email address, and submit the recovery request.
    await loginPage.openPasswordRecovery();
    await passwordRecoveryPage.expectFormVisible();
    await passwordRecoveryPage.recover(unknownEmail);
    await passwordRecoveryPage.expectEmailNotFound();
  });
});
