import { combineReducers } from 'redux';

import { AppState } from './app/types';
import { ScopeLoadingState } from './scope-loading/types';
import { ScopeErrorState } from './scope-error/types';
import { CustomerSearchState } from './customer/types';
import { FileClaimState } from './claim/types';
import { UserState } from './user/types';

import { appReducer } from './app/reducer';
import { scopeLoadingReducer } from './scope-loading/reducer';
import { scopeErrorReducer } from './scope-error/reducer';
import { customerSearchReducer } from './customer/reducer';
import { userReducer } from './user/reducer';
import { fileClaimReducer } from './claim/reducer';

export interface RootState {
  app: AppState;
  customerSearch: CustomerSearchState;
  user: UserState;
  scopeLoading: ScopeLoadingState;
  scopeError: ScopeErrorState;
  fileClaim: FileClaimState;
}

const createRootReducer = () =>
  combineReducers({
    app: appReducer,
    customerSearch: customerSearchReducer,
    user: userReducer,
    scopeLoading: scopeLoadingReducer,
    scopeError: scopeErrorReducer,
    fileClaim: fileClaimReducer,
  });

export default createRootReducer;
