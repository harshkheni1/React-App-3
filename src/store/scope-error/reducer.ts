import { ScopeErrorAction, ScopeErrorState, ScopeErrorActionTypes } from './types';

const initialState: ScopeErrorState = {};

export const scopeErrorReducer = (
  state: ScopeErrorState = initialState,
  action: ScopeErrorActionTypes,
): ScopeErrorState => {
  switch (action.type) {
    case ScopeErrorAction.SET_SCOPE_ERROR: {
      return { ...state, [action.payload]: action.error };
    }
    case ScopeErrorAction.CLEAN_SCOPE_ERROR: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case ScopeErrorAction.CLEAN_UP_SCOPE_ERROR: {
      return {};
    }
    default:
      return state;
  }
};
