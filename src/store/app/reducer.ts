import { AppActionTypes, AppAction, AppState } from './types';
import { setCookieSession, getCookieSession, removeCookieSession } from '../../service/cookie-session';
import { Session } from '../../types/session';
import { HYDRATE } from 'next-redux-wrapper';
import { patchAWSTemporaryCreds } from '../../service/axiosAwsSignedUser';

const initialState: AppState = {
  isAuthorized: false,
  session: null,
  error: null,
  isMobile: false,
};

export const appReducer = (state: AppState = initialState, action: AppActionTypes): AppState => {
  switch (action.type) {
    case HYDRATE: {
      const newState = {
        ...state,
        ...action.payload.app,
      };

      return newState;
    }
    case AppAction.SET_SESSION: {
      const { session, ctx, ignoreCookie } = action.payload;
      if (!ignoreCookie) {
        setCookieSession(session, ctx);
      }

      return {
        ...state,
        isAuthorized: !!session,
        session,
      };
    }
    case AppAction.CLEAN_SESSION: {
      removeCookieSession(action.payload);
      return {
        ...state,
        isAuthorized: false,
        session: null,
      };
    }
    case AppAction.SET_PAGE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case AppAction.CLEAN_PAGE_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    case AppAction.SET_IS_MOBILE: {
      return {
        ...state,
        isMobile: action.payload,
      };
    }
    case AppAction.RESTORE_SESSION: {
      const cookieSession = getCookieSession(action.payload);
      const session: Session = cookieSession?.uemail
        ? {
            ...state.session,
            expiresAt: cookieSession?.expiresAt,
            refreshToken: cookieSession?.refreshToken,
            accessKeyId: cookieSession?.accessKeyId,
            sessionToken: cookieSession?.sessionToken,
            secretAccessKey: cookieSession?.secretAccessKey,
            user: {
              email: cookieSession.uemail,
              'custom:UserExtendedInfoId': cookieSession?.uextid,
            },
          }
        : null;

      const { accessKeyId, sessionToken, secretAccessKey } = cookieSession ?? {};
      patchAWSTemporaryCreds({
        accessKeyId,
        sessionToken,
        secretAccessKey,
      });

      return {
        ...state,
        session,
        isAuthorized: !!session,
      };
    }
    default:
      return state;
  }
};
