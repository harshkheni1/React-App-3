import { Customer } from '@/core-types/customer';
import { InferValueTypes } from '../service-types';
import * as actions from './actions';

export enum CustomerSearchAction {
  SEARCH_CUSTOMER = 'SEARCH_CUSTOMERS',
  LINK_NEW_PLAN = 'LINK_NEW_PLAN',

  SET_CUSTOMERS = 'SET_CUSTOMERS',
}

export type CustomerSearchState = Readonly<{
  customers: Customer[];
}>;

export type CustomerSearchActionTypes = ReturnType<InferValueTypes<typeof actions>>;

export const CustomerScope = 'customer';
