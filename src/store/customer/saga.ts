import { put, take, fork, call, all } from 'redux-saga/effects';

import { AppScope } from '../app/types';
import { CustomerScope, CustomerSearchAction } from './types';
import { enableScopeLoading, disableScopeLoading } from '../scope-loading/actions';
import * as Api from '../../service/api';
import { SearchCustomerDto, VerifyCustomerDto } from '@/core-types/customer';
import { mapApiCustomerSearch } from './helpers';
import { ScopeErrorAction } from '../scope-error/types';
import { AuthScope } from '../auth/types';
import { fetchPlansAndClaims } from '../user/actions';
import { nextRedirect } from '../../service/helpers';

function* searchPlanFlow() {
  while (true) {
    const request = yield take(CustomerSearchAction.SEARCH_CUSTOMER);
    yield put(enableScopeLoading(AppScope));
    try {
      const dto: SearchCustomerDto = request.payload;
      const { customers } = yield call(Api.customer.searchCustomer, dto);
      yield put({
        type: CustomerSearchAction.SET_CUSTOMERS,
        payload: customers?.map((value: unknown) => mapApiCustomerSearch(value)),
      });
    } catch (error) {
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: AuthScope, error });
    } finally {
      yield put(disableScopeLoading(AppScope));
    }
  }
}

function* linkUserToNewPlansFlow() {
  while (true) {
    const request = yield take(CustomerSearchAction.LINK_NEW_PLAN);
    yield put(enableScopeLoading(CustomerScope));
    try {
      const dtos: VerifyCustomerDto[] = request.payload;
      const links: [] = yield all(
        dtos.map(function* (dto: VerifyCustomerDto) {
          const response = yield call(Api.customer.verifyCustomer, dto);
          return response;
        }),
      );
      if (links.every((link) => Boolean(link))) {
        yield put(fetchPlansAndClaims());
        nextRedirect(null, '/account?view=plan');
      }
    } catch (error) {
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: CustomerScope, error });
    } finally {
      yield put(disableScopeLoading(CustomerScope));
    }
  }
}

export default function* consumerSaga() {
  yield fork(searchPlanFlow);
  yield fork(linkUserToNewPlansFlow);
}
