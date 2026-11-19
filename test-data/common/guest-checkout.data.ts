export interface GuestBillingAddress {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  state: string;
  city: string;
  address1: string;
  postalCode: string;
  phone: string;
}

export interface GuestCheckoutData {
  billingAddress: GuestBillingAddress;
  shippingMethod: string;
  paymentMethod: string;
  expectedOrderTotal: string;
}

export const guestCheckoutData: GuestCheckoutData = {
  billingAddress: {
    firstName: 'Casey',
    lastName: 'Tester',
    email: 'casey.tester@example.com',
    country: 'United States',
    state: 'Ohio',
    city: 'Columbus',
    address1: '123 Test Avenue',
    postalCode: '43215',
    phone: '5550102000',
  },
  shippingMethod: 'Ground',
  paymentMethod: 'Cash On Delivery (COD)',
  expectedOrderTotal: '2887.00',
};
