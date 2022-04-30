import { ScopeErrorAction } from './types';
import { ApiError } from '../../types/api-error';

export const cleanScopeError = (scope: string) =>
  ({
    type: ScopeErrorAction.CLEAN_SCOPE_ERROR,
    payload: scope,
  } as const);

export const setScopeError = (scope: string, error: ApiError) => {
  return {
    type: ScopeErrorAction.SET_SCOPE_ERROR,
    payload: scope,
    error,
  } as const;
};

export const cleanUpScopeError = () =>
  ({
    type: ScopeErrorAction.CLEAN_UP_SCOPE_ERROR,
  } as const);
