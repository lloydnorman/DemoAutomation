import { test } from '../../../src/fixtures/base.fixture';
import { accountTestData, createUniqueEmail } from '../../../src/utils/account-test-data';

test.describe('Registration and Login', () => {
  test('Register, sign out, and sign in', async ({ registrationPage, loginPage, customerAccountPage }) => {
    const account = accountTestData.registration;
    const email = createUniqueEmail(account.emailPrefix);

    console.log(`Registering with email: ${email}`);
    // 1. Start in a fresh browser context. Register with valid gender, first name, last name, a unique email address, and a valid matching password pair.
    await registrationPage.register({ ...account, email });
    await registrationPage.expectRegistered(email);

    // 2. Sign out, then open Log in and enter the same email and password.
    await loginPage.signOut();
    await loginPage.expectSignedOut();
    await loginPage.open();

    console.log(`Signing in with email: ${email}`);
    await loginPage.signIn(email, account.password);
    await loginPage.expectSignedIn(email);

    // 3. Open My account and verify the account information page loads.
    await customerAccountPage.open();
    await customerAccountPage.expectLoaded();
  });
});
