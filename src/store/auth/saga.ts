import { put, select, take, fork, call, race } from 'redux-saga/effects';
import * as queryString from 'query-string';
import { ISignUpResult } from 'amazon-cognito-identity-js';

import { AppAction, AppScope } from '../app/types';
import { AuthAction } from './types';
import { enableScopeLoading, disableScopeLoading } from '../scope-loading/actions';
import { nextRedirect } from '../../service/helpers';
import { LoginInterface, RegisterInterface, ResetPasswordInterface, AuthInterface } from '../../types/auth';
import { isAuthenticated } from '../app/helpers';
import * as Api from '../../service/api';
import { ScopeErrorAction } from '../scope-error/types';
import { AuthScope } from '../auth/types';
import { CustomerSearchAction } from '../customer/types';
import { UserAction } from '../user/types';
import { removeActiveClaim } from '../claim/actions';
import { clearAWSTemporaryCreds } from '../../service/axiosAwsSignedUser';

function* authorize({ email, password, phone, name, customerIds, isRegistering }: AuthInterface) {
  yield put(enableScopeLoading(AppScope));
  Api.docUpload.getTempCred;
  try {
    if (isRegistering) {
      return yield call(Api.auth.register, { email, password, phone, name, customerIds });
    } else {
      return yield call(Api.auth.login, { email, password });
    }
  } catch (error) {
    if (error.code == 'PasswordResetRequiredException') {
      yield put(enableScopeLoading(AppScope));

      try {
        yield call(Api.auth.forgotPassword, email);

        nextRedirect(
          null,
          `/auth/reset-password?${queryString.stringify({ email })}&${queryString.stringify({ isMigratedUser: 1 })}`,
        );
      } catch (error) {
        yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: AuthScope, error });
        return false;
      } finally {
        yield put(disableScopeLoading(AppScope));
      }
    } else if (error.code == 'UserNotFoundException') {
      error.message = 'User does not exist!';
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: AuthScope, error });
    } else {
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: AuthScope, error });
    }

    return false;
  } finally {
    yield put(disableScopeLoading(AppScope));
  }
}

function* logout() {
  yield put(enableScopeLoading(AppScope));

  try {
    return yield call(Api.auth.logout);
  } catch (error) {
    yield put({ type: AppAction.SET_PAGE_ERROR, payload: AppScope, error });
  } finally {
    yield put(disableScopeLoading(AppScope));
  }
}

function* loginFlow() {
  while (true) {
    const request = yield take(AuthAction.LOGIN_REQUEST);
    const { email, password }: LoginInterface = request.payload;

    const winner = yield race({
      auth: call(authorize, { email, password, phone: null, name: null, customerIds: null, isRegistering: false }),
      logout: take(AuthAction.LOGOUT),
    });

    if (winner.auth) {
      yield put({ type: AppAction.SET_SESSION, payload: { session: winner.auth } });

      if (yield select(isAuthenticated)) {
        yield put({ type: AppAction.START_SESSION_WATCHER });
        nextRedirect(null, '/account');
      }
    }
  }
}

function* logoutFlow() {
  while (true) {
    yield take(AuthAction.LOGOUT);
    yield call(logout);

    yield put({ type: CustomerSearchAction.SET_CUSTOMERS, payload: [] });
    yield put({ type: UserAction.SET_PLANS, payload: [] });
    yield put({ type: UserAction.SET_CLAIMS, payload: [] });
    yield call(removeActiveClaim);
    clearAWSTemporaryCreds();

    yield put({ type: AppAction.CLEAN_SESSION });
    nextRedirect(null, '/');
  }
}

function* registerFlow() {
  while (true) {
    const request = yield take(AuthAction.REGISTER_REQUEST);
    const { email, password, phone, name, customerIds }: RegisterInterface = request.payload;

    const { user, userConfirmed }: ISignUpResult = yield call(authorize, {
      email,
      password,
      phone,
      name,
      customerIds,
      isRegistering: true,
    });

    if (user && !userConfirmed) {
      nextRedirect(null, '/auth/thank-you');
    }
  }
}

function* resendConfirmationCode(email: string) {
  yield put(enableScopeLoading(AppScope));

  try {
    return yield call(Api.auth.resendConfirmationCode, email);
  } catch (error) {
    yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: AuthScope, error });
    return false;
  } finally {
    yield put(disableScopeLoading(AppScope));
  }
}

function* resendConfirmationCodeFlow() {
  while (true) {
    const request = yield take(AuthAction.RESEND_CONFIRAMTION_CODE);
    const { email } = request.payload;

    yield call(resendConfirmationCode, email);
  }
}

function* forgotPassword(email: string) {
  yield put(enableScopeLoading(AppScope));

  try {
    yield call(Api.auth.forgotPassword, email);

    nextRedirect(null, `/auth/reset-password?${queryString.stringify({ email })}`);
  } catch (error) {
    yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: AuthScope, error });
    return false;
  } finally {
    yield put(disableScopeLoading(AppScope));
  }
}

function* forgotPasswordFlow() {
  while (true) {
    const request = yield take(AuthAction.FORGOT_PASSWORD);
    const { email } = request.payload;

    yield call(forgotPassword, email);
  }
}

function* resetPassword({ email, code, newPassword }: ResetPasswordInterface) {
  yield put(enableScopeLoading(AppScope));

  try {
    return yield call(Api.auth.resetPassword, { email, code, newPassword });
  } catch (error) {
    yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: AuthScope, error });
    return false;
  } finally {
    yield put(disableScopeLoading(AppScope));
  }
}

function* resetPasswordAndLoginFlow() {
  while (true) {
    const request = yield take(AuthAction.RESET_PASSWORD);
    const { email, code, newPassword } = request.payload;

    const res = yield call(resetPassword, { email, code, newPassword });

    if (res) {
      yield put({ type: AuthAction.LOGIN_REQUEST, payload: { email, password: newPassword } });
    }
  }
}

export default function* authSaga() {
  yield fork(loginFlow);
  yield fork(logoutFlow);
  yield fork(registerFlow);
  yield fork(resendConfirmationCodeFlow);
  yield fork(forgotPasswordFlow);
  yield fork(resetPasswordAndLoginFlow);
}
