import { AppAction } from './types';
import { NextPageContext } from 'next';
import { PageError } from '../../types/page-error';
import { Session } from '../../types/session';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../root-reducer';

export const setPageError = (error: PageError) =>
  ({
    type: AppAction.SET_PAGE_ERROR,
    payload: error,
  } as const);

export const cleanPageError = () =>
  ({
    type: AppAction.CLEAN_PAGE_ERROR,
  } as const);

export const setSession = (session: Session, ctx?: NextPageContext, ignoreCookie = false) => {
  return {
    type: AppAction.SET_SESSION,
    payload: {
      session,
      ctx,
      ignoreCookie,
    },
  } as const;
};
export const cleanSession = (ctx?: NextPageContext) =>
  ({
    type: AppAction.CLEAN_SESSION,
    payload: ctx,
  } as const);

export const setIsMobile = (isMobile: boolean) =>
  ({
    type: AppAction.SET_IS_MOBILE,
    payload: isMobile,
  } as const);

export const startSessionWatcher = () =>
  ({
    type: AppAction.START_SESSION_WATCHER,
  } as const);

export const restoreSession = (ctx: NextPageContext) =>
  ({
    type: AppAction.RESTORE_SESSION,
    payload: ctx,
  } as const);

export const hydro = (payload: RootState) =>
  ({
    type: HYDRATE,
    payload,
  } as const);
