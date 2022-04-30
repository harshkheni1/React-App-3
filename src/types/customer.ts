export interface Customer {
  id: string;

  firstName: string;
  lastName: string;

  phone: string;
  zip: string;
  email: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type SearchType = ['search_plan_1', 'search_plan_2', 'search_plan_3'];
export type OneOfSearchType = SearchType[0] | SearchType[1] | SearchType[2];

export interface SearchCustomerDto {
  search_type: OneOfSearchType;

  invoice_number?: string;
  zip_code?: string;

  name_first?: string;
  name_last?: string;
  phone_number?: string;
}

export type VerifyType = ['search_plan_verify_1_2', 'search_plan_verify_3'];
export type OneOfVerifyType = VerifyType[0] | VerifyType[1];

export interface VerifyCustomerDto {
  search_type: OneOfVerifyType;

  invoice_number?: string;
  zip_code?: string;

  name_first?: string;
  name_last?: string;
  phone_number?: string;

  email: string;
}
