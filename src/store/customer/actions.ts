import { CustomerSearchAction } from './types';
import { SearchCustomerDto, VerifyCustomerDto } from '../../types/customer';

export const searchCustomer = (payload: SearchCustomerDto) =>
  ({
    type: CustomerSearchAction.SEARCH_CUSTOMER,
    payload,
  } as const);

export const setCustomers = (payload: []) =>
  ({
    type: CustomerSearchAction.SET_CUSTOMERS,
    payload,
  } as const);

export const linkNewPlans = (payload: VerifyCustomerDto[]) =>
  ({
    type: CustomerSearchAction.LINK_NEW_PLAN,
    payload,
  } as const);
