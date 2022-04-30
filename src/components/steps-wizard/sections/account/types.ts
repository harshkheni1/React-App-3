export enum CreateAccountSearchWith {
  EMAIL = 'email',
  PHONE = 'phone number',
  INVOICE = 'invoice',
}

export interface UserAccount {
  name: string;
  surname: string;
  zip: string;
  searchWith: CreateAccountSearchWith;
  search: string;
  plan: string | string[];
}

export enum CreateAccountSteps {
  SEARCH_PLAN = 'Search for your plan',
  SELECT_PLAN = 'Select your Plan',
  ADD_DETAILS = 'Add your account details',
}

export const CreateAccountStepsTitle = [
  {
    label: CreateAccountSteps.SEARCH_PLAN,
    value: 'searchPlan',
  },
  {
    label: CreateAccountSteps.SELECT_PLAN,
    value: 'selectPlan',
  },
  {
    label: CreateAccountSteps.ADD_DETAILS,
    value: 'addDetails',
  },
];
