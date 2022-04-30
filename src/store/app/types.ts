import { HYDRATE } from 'next-redux-wrapper';

import { InferValueTypes } from '../service-types';
import * as actions from './actions';
import { Session } from '../../types/session';
import { PageError } from '../../types/page-error';

export enum AppAction {
  SET_SESSION = 'SET_SESSION',
  CLEAN_SESSION = 'CLEAN_SESSION',
  RESTORE_SESSION = 'RESTORE_SESSION',
  START_SESSION_WATCHER = 'START_SESSION_WATCHER',

  SET_PAGE_ERROR = 'SET_PAGE_ERROR',
  CLEAN_PAGE_ERROR = 'CLEAN_PAGE_ERROR',
  SET_IS_MOBILE = 'SET_IS_MOBILE',
}

export const AppScope = 'app';

export type AppState = Readonly<{
  isAuthorized: boolean;
  isMobile: boolean;

  session?: Session;
  error?: PageError;
}>;

export type AppActionTypes = ReturnType<InferValueTypes<typeof actions> & typeof HYDRATE>;
