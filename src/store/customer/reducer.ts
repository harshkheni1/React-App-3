import { CustomerSearchActionTypes, CustomerSearchState, CustomerSearchAction } from './types';

const initialState: CustomerSearchState = {
  customers: [],
};

export const customerSearchReducer = (
  state: CustomerSearchState = initialState,
  action: CustomerSearchActionTypes,
): CustomerSearchState => {
  switch (action.type) {
    case CustomerSearchAction.SET_CUSTOMERS: {
      localStorage.setItem('state', JSON.stringify(action.payload));
      return {
        ...state,
        customers: action.payload,
      };
    }

    default:
      return state;
  }
};
