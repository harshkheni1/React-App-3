import { ScopeLoadingAction, ScopeLoadingState, ScopeLoadingActionTypes } from './types';

const initialState: ScopeLoadingState = [];

export const scopeLoadingReducer = (
  state: ScopeLoadingState = initialState,
  action: ScopeLoadingActionTypes,
): ScopeLoadingState => {
  switch (action.type) {
    case ScopeLoadingAction.ENABLE_SCOPE_LOADING: {
      return [...state, action.payload as string];
    }
    case ScopeLoadingAction.DISABLE_SCOPE_LOADING: {
      return state.filter((item) => item !== action.payload);
    }
    case ScopeLoadingAction.CLEAN_UP_SCOPE_LOADING: {
      return [];
    }
    default:
      return state;
  }
};
