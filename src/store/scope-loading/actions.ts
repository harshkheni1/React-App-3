import { ScopeLoadingAction } from './types';

export const disableScopeLoading = <T = string>(scope: T) =>
  ({
    type: ScopeLoadingAction.DISABLE_SCOPE_LOADING,
    payload: scope,
  } as const);

export const enableScopeLoading = <T = string>(scope: T) =>
  ({
    type: ScopeLoadingAction.ENABLE_SCOPE_LOADING,
    payload: scope,
  } as const);

export const cleanUpScopeLoading = () =>
  ({
    type: ScopeLoadingAction.CLEAN_UP_SCOPE_LOADING,
  } as const);
