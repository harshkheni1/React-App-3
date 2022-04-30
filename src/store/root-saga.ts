import { all, call, spawn } from 'redux-saga/effects';

//append another sagas
import sessionSaga from './app/saga';
import authSaga from './auth/saga';
import fileClaimSaga from './claim/saga';
import customerSaga from './customer/saga';
import userSaga from './user/saga';

export default function* rootSaga() {
  const sagas = [sessionSaga, authSaga, customerSaga, userSaga, fileClaimSaga];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error('Saga caught exception:', e);
          }
        }
      }),
    ),
  );
}
