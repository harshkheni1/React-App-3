import { InferValueTypes } from '../service-types';
import * as actions from './actions';

export enum ScopeLoadingAction {
  ENABLE_SCOPE_LOADING = 'ENABLE_SCOPE_LOADING',
  DISABLE_SCOPE_LOADING = 'DISABLE_SCOPE_LOADING',
  CLEAN_UP_SCOPE_LOADING = 'CLEAN_UP_SCOPE_LOADING',
}

export type ScopeLoadingState<T = string> = Readonly<T[]>;

export type ScopeLoadingActionTypes = ReturnType<InferValueTypes<typeof actions>>;
