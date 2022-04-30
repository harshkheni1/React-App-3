import { ScopeLoadingState } from './types';

export const isScopeLoading = <T = string>(loading: ScopeLoadingState<T>, scope: T): boolean =>
  loading.some((id: T) => id === scope);
