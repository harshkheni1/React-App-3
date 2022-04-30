import { put, select, fork, call, delay, takeLatest } from 'redux-saga/effects';
import getConfig from 'next/config';

import { getSession, isAuthenticated } from './helpers';
import { AppAction } from './types';

import { nextRedirect } from '../../service/helpers';
import { Session } from '../../types/session';
import { PublicRuntimeConfig } from '../../types/config';

import * as Api from '../../service/api';
import { AuthAction } from '../auth/types';

const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } = getConfig();
const { TOKEN_REFRESH_INTERVAL } = publicRuntimeConfig;

function* refreshSessionRequest() {
  try {
    const appSession = yield select(getSession);
    const newSession = yield call(Api.auth.refreshSession, appSession.user?.email, appSession.refreshToken);

    yield put({
      type: AppAction.SET_SESSION,
      payload: {
        session: {
          ...appSession,
          ...newSession,
        },
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    yield call(startSessionWatcher);
  } catch (error) {
    yield put({ type: AuthAction.LOGOUT });
    nextRedirect(null, '/');
  }
}

function* startSessionWatcher() {
  const isAuthorized = yield select(isAuthenticated);
  if (!isAuthorized) {
    return;
  }

  const session: Session = yield select(getSession);
  const secondsLeft = Math.round(session.expiresAt - +new Date() / 1000);
  const timeout = secondsLeft < TOKEN_REFRESH_INTERVAL ? secondsLeft - 10 : TOKEN_REFRESH_INTERVAL;
  if (secondsLeft < 0 || timeout < 0) {
    return yield put({ type: AuthAction.LOGOUT });
  }

  yield delay(timeout * 1000);

  yield call(refreshSessionRequest);
}

function* watchSessionTask() {
  yield takeLatest(AppAction.START_SESSION_WATCHER, startSessionWatcher);
}

export default function* sessionSaga() {
  yield fork(watchSessionTask);
}
