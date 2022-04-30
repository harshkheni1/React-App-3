import { put, take, fork, call, all, select } from 'redux-saga/effects';

import { UserAction, UserScope } from './types';
import { enableScopeLoading, disableScopeLoading } from '../scope-loading/actions';
import * as Api from '../../service/api';
import {
  mapApiPlan,
  mapApiFlatData,
  mapApiChildFlatData,
  mapApiClaim,
  mapApiClaimItem,
  mapApiClaimDamage,
  mapApiWarrantyItem,
  getClaims,
  mapApiUploadedFile,
} from './helpers';
import { ScopeErrorAction } from '../scope-error/types';
import { ApiFlatItem, ApiChildFlatItem } from '@/core-types/general';
import { Plan } from '@/core-types/plan';
import { Claim } from '@/core-types/claim';
import { ClaimItem } from '@/core-types/claim-item';
import { Damage } from '@/core-types/damage';
import { UploadedFile } from '@/core-types/uploaded-file';

function* fetchHelperData() {
  while (true) {
    yield take(UserAction.FETCH_CLAIM_OPTIONS);
    yield put(enableScopeLoading(UserScope));
    try {
      const [
        damageItemTypes,
        materialTypes,
        manufacturers,
        colors,
        actionsTaken,
        specificDamages,
        howDidOccur,
        damageTypes,
        specificLocations,
      ] = yield all([
        call(Api.claimOptions.damageItemTypes),
        call(Api.claimOptions.materialTypes),
        call(Api.claimOptions.manufacturers),
        call(Api.claimOptions.colors),
        //damage

        call(Api.claimOptions.actionsTaken),
        call(Api.claimOptions.specificDamages),
        call(Api.claimOptions.howDidOccur),
        call(Api.claimOptions.damageTypes),
        call(Api.claimOptions.specificLocations),
      ]);

      yield put({
        type: UserAction.SET_CLAIM_OPTIONS,
        payload: {
          claimItemTypes: damageItemTypes?.map((rawItem: ApiFlatItem) => mapApiFlatData(rawItem)),
          materialTypes: materialTypes?.map((rawItem: ApiFlatItem) => mapApiFlatData(rawItem)),
          manufacturers: manufacturers?.map((rawItem: ApiFlatItem) => mapApiFlatData(rawItem)),
          colors: colors?.map((rawItem: ApiFlatItem) => mapApiFlatData(rawItem)),
          actionsTaken: actionsTaken?.map((rawItem: ApiFlatItem) => mapApiFlatData(rawItem)),
          specificDamages: specificDamages?.map((rawItem: ApiChildFlatItem) => mapApiChildFlatData(rawItem)),
          howDidOccur: howDidOccur?.map((rawItem: ApiFlatItem) => mapApiFlatData(rawItem)),
          damageTypes: damageTypes?.map((rawItem: ApiFlatItem) => mapApiFlatData(rawItem)),
          specificLocations: specificLocations?.map((rawItem: ApiFlatItem) => mapApiFlatData(rawItem)),
        },
      });
    } catch (error) {
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: UserScope, error });
    } finally {
      yield put(disableScopeLoading(UserScope));
    }
  }
}

function* fetchPlansAndClaimsFlow() {
  while (true) {
    yield take(UserAction.FETCH_PLANS_AND_CLAIMS);
    yield put(enableScopeLoading(UserScope));
    try {
      const [{ plans }, { result: rawClaims }] = yield all([call(Api.user.plans), call(Api.user.detailedClaims)]);
      const mappedPlans: Plan[] = plans?.map((rawPlan: unknown) => mapApiPlan(rawPlan));
      yield put({
        type: UserAction.SET_PLANS,
        payload: mappedPlans,
      });

      const mappedClaims: Claim[] = yield all(
        rawClaims?.map(function* (rawClaim: unknown) {
          const mappedClaim = mapApiClaim(rawClaim);

          const mappedUploadedFiles: UploadedFile[] = rawClaim['documents']?.map((rawFile: unknown) =>
            mapApiUploadedFile(rawFile),
          );

          const mappedDamages: Damage[] = rawClaim['damageAreasDisp']?.map((rawDamage: unknown) => {
            const mappedDamage = mapApiClaimDamage(rawDamage);
            return {
              ...mappedDamage,
              files: mappedUploadedFiles.filter((file: UploadedFile) => file.cliamItemsDamageId === mappedDamage.id),
            };
          });

          const mappedItems: ClaimItem[] = rawClaim['items']?.map((rawClaimItem: unknown) => {
            const mappedItem = mapApiClaimItem(rawClaimItem);
            return {
              ...mappedItem,
              damages: mappedDamages.filter((damage: Damage) => damage.claimItemId === mappedItem.id),
              files: mappedUploadedFiles.filter((file: UploadedFile) => file.claimItemsId === mappedItem.id),
            };
          });
          const warrantyItems: unknown[] = yield call(
            Api.claimCore.breakOutUnclaimedPlanItems,
            mappedClaim.warrantyId,
            mappedClaim.id,
          );
          return {
            ...mappedClaim,
            items: mappedItems,
            warrantyItems: warrantyItems?.map((w) => mapApiWarrantyItem(w)),
            plan: mappedPlans?.find((plan) => plan.id === mappedClaim.warrantyId),
            files: mappedUploadedFiles,
          };
        }),
      );

      yield put({
        type: UserAction.SET_CLAIMS,
        payload: mappedClaims.filter((claim: Claim) => Boolean(claim)), //TODO <- rude hack; we need all data to be fetched,
      });
    } catch (error) {
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: UserScope, error });
    } finally {
      yield put(disableScopeLoading(UserScope));
    }
  }
}

function* deleteClaimFlow() {
  while (true) {
    const request = yield take(UserAction.DELETE_CLAIM);
    yield put(enableScopeLoading(UserScope));
    try {
      const removedClaimId = request.payload;
      if (yield call(Api.claimCore.deleteClaim, removedClaimId)) {
        const claims: Claim[] = yield select(getClaims);

        yield put({ type: UserAction.SET_CLAIMS, payload: claims.filter((c) => c.id !== removedClaimId) });
      }
    } catch (error) {
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: UserScope, error });
    } finally {
      yield put(disableScopeLoading(UserScope));
    }
  }
}

export default function* userSaga() {
  yield fork(fetchPlansAndClaimsFlow);
  yield fork(fetchHelperData);
  yield fork(deleteClaimFlow);
}
