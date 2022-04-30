import { InferValueTypes } from '../service-types';
import * as actions from './actions';
import { ApiError } from '../../types/api-error';

export enum ScopeErrorAction {
  SET_SCOPE_ERROR = 'SET_SCOPE_ERROR',
  CLEAN_SCOPE_ERROR = 'CLEAN_SCOPE_ERROR',
  CLEAN_UP_SCOPE_ERROR = 'CLEAN_UP_SCOPE_ERROR',
}

export type ScopeErrorState = Readonly<{
  [key: string]: ApiError;
}>;

export type ScopeErrorActionTypes = ReturnType<InferValueTypes<typeof actions>>;
