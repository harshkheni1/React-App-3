import { Customer } from '@/core-types/customer';

export const mapApiCustomerSearch = (payload: unknown): Customer => {
  return {
    id: payload['id'],
    firstName: payload['fname'],
    lastName: payload['lname'],
    zip: payload['zip1'] ?? payload['zip2'],
    email: payload['email'] ?? payload['alt_email'],
    phone:
      payload['phone'] || payload['cphone'] || payload['hphone'] || payload['intl_cphone'] || payload['intl_hphone'],
  };
};
