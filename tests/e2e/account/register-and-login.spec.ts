import { test } from '../../../src/fixtures/base.fixture';
import { accountTestData, createUniqueEmail } from '../../../src/utils/account-test-data';

test.describe('Registration and Login', () => {
  test('Register, sign out, and sign in', async ({ registrationPage, loginPage, customerAccountPage }) => {
    const account = accountTestData.registration;
    const email = createUniqueEmail(account.emailPrefix);

    await test.step('Register a new account', async () => {
      await registrationPage.register({ ...account, email });
      await registrationPage.expectRegistered(email);
    });

    await test.step('Sign out and sign back in', async () => {
      await loginPage.signOut();
      await loginPage.expectSignedOut();
      await loginPage.open();
      await loginPage.signIn(email, account.password);
      await loginPage.expectSignedIn(email);
    });

    await test.step('Verify the account information page', async () => {
      await customerAccountPage.open();
      await customerAccountPage.expectLoaded();
    });
  });
});