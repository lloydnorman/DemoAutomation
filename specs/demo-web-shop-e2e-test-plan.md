# Demo Web Shop End-to-End Test Plan

## Application Overview

End-to-end coverage for the Tricentis Demo Web Shop at https://demowebshop.tricentis.com/. The plan covers storefront navigation and search, product configuration, registration and sign-in, wishlist/compare, cart validation and management, and the guest checkout journey. Run each scenario independently in a fresh browser context with cleared cookies, local storage, and cart state. Use a unique email address for account-creation scenarios; the public demo may retain server-side account and order data between runs. Checkout scenarios may create a demo order, so use clearly identifiable QA data and do not use real payment credentials.

## Test Scenarios

### 1. Storefront and Product Discovery

**Seed:** `tests/seed.spec.ts`

#### 1.1. Browse a category and inspect a product

**File:** `tests/storefront/browse-category-product.spec.ts`

**Steps:**
  1. Start in a fresh browser context with an empty cart. Open the home page and select a top-level category such as Computers.
    - expect: The selected category page loads and identifies the category in its heading or breadcrumb.
    - expect: The page displays products belonging to the selected category.
  2. Open the Desktops subcategory and select Build your own computer.
    - expect: The product detail page displays the product name, availability, price, breadcrumb, and product description.
    - expect: The product configuration controls and quantity field are available.
  3. Use the breadcrumb to return to the category, then use the category navigation to open another category.
    - expect: Navigation reaches the selected category and does not leave stale product details visible.

#### 1.2. Search for a product and handle no results

**File:** `tests/storefront/search-products.spec.ts`

**Steps:**
  1. Start in a fresh browser context. Search the store for the exact product name Build your own computer.
    - expect: The search results contain the matching product and allow opening its product detail page.
  2. Return to search and submit a deliberately unlikely term such as qa-no-such-product-2026.
    - expect: The page displays a no-results state or equivalent feedback.
    - expect: No unrelated product is presented as a match.
  3. Submit the search form with an empty query.
    - expect: The application handles the empty query without an unhandled error or broken page.

#### 1.3. Add products to wishlist and compare list

**File:** `tests/storefront/wishlist-compare.spec.ts`

**Steps:**
  1. Start in a fresh browser context. Open a product detail page and select Add to wishlist.
    - expect: A success message confirms the product was added.
    - expect: The wishlist count or wishlist contents reflect the added product.
  2. Open the wishlist and verify the item. Remove it from the wishlist.
    - expect: The product is present before removal and absent afterward.
    - expect: The wishlist returns to its empty state or updated item count.
  3. Open a product and select Add to compare list, then open Compare products list from Customer service.
    - expect: The selected product appears in the comparison table.
    - expect: The comparison list can be cleared or the product can be removed, returning it to an empty state.

### 2. Account and Customer Forms

**Seed:** `tests/seed.spec.ts`

#### 2.1. Validate required registration fields and password match

**File:** `tests/account/registration-validation.spec.ts`

**Steps:**
  1. Start in a fresh browser context and open Register.
    - expect: The registration form displays gender, first name, last name, email, password, and confirm-password controls.
  2. Submit the form with every field blank.
    - expect: Required-field validation is shown for missing registration data.
    - expect: The account is not created and the user remains on the registration form.
  3. Enter an invalid email address and nonmatching password and confirmation values, then submit.
    - expect: The email format and password mismatch are reported clearly.
    - expect: The account is not created.

#### 2.2. Register, sign out, and sign in

**File:** `tests/account/register-and-login.spec.ts`

**Steps:**
  1. Start in a fresh browser context. Register with valid gender, first name, last name, a unique email address, and a valid matching password pair.
    - expect: Registration succeeds and the new account is signed in.
    - expect: The header reflects the authenticated state and provides account/logout navigation.
  2. Sign out, then open Log in and enter the same email and password.
    - expect: Sign-in succeeds and the authenticated account navigation is restored.
  3. Open My account and verify the account information page loads.
    - expect: The customer account page is accessible to the authenticated user.

#### 2.3. Reject invalid login and request password recovery

**File:** `tests/account/login-recovery-validation.spec.ts`

**Steps:**
  1. Start in a fresh browser context and open Log in.
    - expect: The returning-customer form provides email, password, remember-me, Log in, and Forgot password controls.
  2. Submit invalid credentials for an email that is not registered in this run.
    - expect: The application displays an authentication error without signing the user in.
  3. Open Forgot password, enter a syntactically valid email address, and submit the recovery request.
    - expect: The recovery page provides clear confirmation or validation feedback without exposing account credentials.

#### 2.4. Submit newsletter and community poll inputs

**File:** `tests/account/newsletter-poll.spec.ts`

**Steps:**
  1. Start in a fresh browser context on the home page. Submit an invalid email address in the newsletter form.
    - expect: The application reports that the email address is invalid and does not show a successful subscription state.
  2. Submit a valid, unique QA email address to the newsletter form.
    - expect: The application provides subscription confirmation or an already-subscribed response without an unhandled error.
  3. Select one community-poll response and submit Vote.
    - expect: The application confirms the vote or indicates that a vote has already been recorded.
    - expect: The poll remains usable and its response controls do not become malformed.

### 3. Cart and Checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. Configure a desktop and manage cart quantity

**File:** `tests/shopping/configure-product-cart.spec.ts`

**Steps:**
  1. Start in a fresh browser context with an empty cart. Open Build your own computer.
    - expect: The page shows processor and RAM dropdowns, HDD and OS options, optional software choices, a quantity field, and Add to cart.
  2. Select valid processor, RAM, HDD, and OS options, optionally toggle a software choice, and change quantity to 2.
    - expect: The selected options remain selected and the displayed price updates when price-affecting options change.
    - expect: The quantity accepts 2 without changing the product configuration.
  3. Select Add to cart and open the shopping cart.
    - expect: A success notification appears and the cart count increases.
    - expect: The cart line shows the configured product and selected options with quantity 2 and a matching line total.
  4. Change the cart quantity to 1 and select Update shopping cart.
    - expect: The cart quantity and subtotal update to reflect one item.
  5. Remove the line item from the cart.
    - expect: The cart count and total update and the cart displays its empty state.

#### 3.2. Validate gift card recipient and sender details

**File:** `tests/shopping/gift-card-validation.spec.ts`

**Steps:**
  1. Start in a fresh browser context with an empty cart. Open the $25 Virtual Gift Card product page.
    - expect: The product page shows recipient name/email, sender name/email, quantity, and Add to cart controls.
  2. Leave all gift-card name and email fields blank and select Add to cart.
    - expect: Validation reports valid recipient name, recipient email, sender name, and sender email are required.
    - expect: The item is not added to the cart.
  3. Enter valid recipient and sender names and email addresses, retain quantity 1, and add the gift card to the cart.
    - expect: The product is added successfully and the cart count increases.
    - expect: The cart line displays the recipient and sender details, quantity, and $25.00 price.

#### 3.3. Block checkout until terms are accepted

**File:** `tests/shopping/checkout-terms-validation.spec.ts`

**Steps:**
  1. Start in a fresh browser context, add any valid product to the cart, and open the cart page.
    - expect: The cart shows the selected item and a terms-of-service checkbox alongside the Checkout action.
  2. Select Checkout without checking the terms box.
    - expect: Checkout is blocked and a Terms of service dialog asks the user to accept the terms before proceeding.
    - expect: The shopper remains on the cart and the cart contents are preserved.
  3. Close the dialog, accept the terms, and select Checkout.
    - expect: Checkout proceeds to the sign-in/registration screen with a Checkout as Guest option for an unauthenticated shopper.

#### 3.4. Complete a guest purchase

**File:** `tests/shopping/guest-checkout.spec.ts`

**Steps:**
  1. Start in a fresh browser context with an empty cart. Add a physical product such as Build your own computer, accept the cart terms, and select Checkout.
    - expect: The shopper is routed to the checkout sign-in screen and the cart item is preserved.
  2. Select Checkout as Guest.
    - expect: The one-page checkout opens with billing address expanded and subsequent payment method, payment information, and confirm-order stages visible.
  3. Enter valid first name, last name, email, country, city, address line 1, postal code, and phone number; enter optional company, state/province, address line 2, and fax only as appropriate. Continue.
    - expect: Required address fields are accepted and checkout advances to the next available stage.
    - expect: Missing or invalid required address data is reported inline and does not advance checkout.
  4. Select an available shipping method when presented and continue. Select an available payment method and continue.
    - expect: Each required checkout stage advances only after valid selections.
    - expect: The selected shipping and payment choices remain reflected in the checkout summary.
  5. Review payment information and the order summary, then proceed to confirm the order using demo-safe QA data only.
    - expect: The confirmation stage shows the correct product, quantity, address, shipping, payment, and total.
    - expect: The completed demo order displays an order confirmation or order number.
    - expect: The cart is cleared after successful order completion.

#### 3.5. Reject invalid discount and gift-card codes

**File:** `tests/shopping/cart-code-validation.spec.ts`

**Steps:**
  1. Start in a fresh browser context, add a valid product to the cart, and open the cart.
    - expect: The cart displays discount-code and gift-card-code entry controls.
  2. Apply a clearly invalid coupon code.
    - expect: The application displays a rejection or not-applicable message.
    - expect: The cart total does not incorrectly decrease.
  3. Apply a clearly invalid gift-card code.
    - expect: The application reports the code is invalid or cannot be applied.
    - expect: The cart contents and total remain consistent.
