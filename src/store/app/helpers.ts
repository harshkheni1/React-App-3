import { RootState } from '../root-reducer';
import { Session } from '../../types/session';

export const isAuthenticated = (state: RootState): boolean => state.app.isAuthorized;
export const getSession = (state: RootState): Session => state.app.session;
