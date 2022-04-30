import { ScopeErrorState } from './types';
import { ApiError } from '../../types/api-error';

export const hasScopeError = (state: ScopeErrorState, scope: string): boolean => !!state[scope];
export const getScopeError = (state: ScopeErrorState, scope: string): ApiError | null => state[scope] || null;
