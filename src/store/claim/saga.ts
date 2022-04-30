import { put, take, fork, call, select, all } from 'redux-saga/effects';

import { FileClaimAction, FileClaimScope } from './types';
import { ScopeErrorAction } from '../scope-error/types';

import * as Api from '../../service/api';

import { getActiveClaim, getClaims, mapApiInsertedClaim } from './helpers';
import { getPlans, mapApiClaimDamage, mapApiClaimItem, mapApiUploadedFile, mapApiWarrantyItem } from '../user/helpers';

import { Claim, ClaimStatus, InsertClaimDto, InsertClaimItemDto } from '@/core-types/claim';
import { ClaimItem } from '@/core-types/claim-item';
import { Damage, InsertDamageDto } from '@/core-types/damage';
import { Plan } from '@/core-types/plan';
import { InsertWarrantyItemDto } from '@/core-types/warranty-item';
import { UserAction } from '../user/types';

import { fetchPlansAndClaims } from '../user/actions';
import { removeActiveClaim } from './actions';
import { enableScopeLoading, disableScopeLoading } from '../scope-loading/actions';
import { UploadedFile } from '@/core-types/uploaded-file';

function* refetchActiveClaim(claimId: number | string, warrantyId: number | string) {
  const activeClaim = yield select(getActiveClaim);

  const itemsRaw = yield call(Api.claimCore.getClaimItems, claimId);
  const claimDamagesRaw: unknown[] = yield call(Api.claimCore.getClaimDamages, claimId);
  const filesRaw = yield call(Api.claimCore.getClaimDocuments, claimId);
  const mappedFiles = filesRaw?.map((fileRaw: unknown) => mapApiUploadedFile(fileRaw));

  activeClaim.items = itemsRaw?.map((c) => {
    const claimItem: ClaimItem = mapApiClaimItem(c);
    claimItem.damages = claimDamagesRaw
      .map((damage) => mapApiClaimDamage(damage))
      .filter((damage: Damage) => damage.claimItemId === claimItem.id);
    claimItem.files = mappedFiles.filter((file: UploadedFile) => file.claimItemsId === claimItem.id);
    return claimItem;
  });

  const warrantyItemsRaw: unknown[] = yield call(Api.claimCore.breakOutUnclaimedPlanItems, warrantyId, claimId);

  yield put({
    type: FileClaimAction.UPDATE_ACTIVE_CLAIM,
    payload: {
      ...activeClaim,
      warrantyItems: warrantyItemsRaw?.map((raw: unknown) => mapApiWarrantyItem(raw)),
      files: mappedFiles,
    },
  });
}

function* insertClaimFlow() {
  while (true) {
    const request = yield take(FileClaimAction.INSERT_CLAIM);
    yield put(enableScopeLoading(FileClaimScope));
    try {
      const dto: InsertClaimDto = request.payload;
      const claims = yield call(Api.claimCore.insertClaim, dto);

      if (!claims || claims.length === 0) {
        throw new Error('Something went wrong. PLease try again later.');
      }
      const workingClaim = mapApiInsertedClaim(claims[0]);
      const activeClaim = yield select(getActiveClaim);

      const warrantyItemsRaw: unknown[] = yield call(
        Api.claimCore.breakOutUnclaimedPlanItems,
        dto.warrentyId,
        workingClaim.id,
      );

      const plans: Plan[] = yield select(getPlans);
      const activeClaimUpdated = {
        ...(activeClaim ?? {}),
        ...workingClaim,
        plan: plans.find((plan) => plan.id === dto.warrentyId),
        claimDate: new Date(),
        warrantyItems: warrantyItemsRaw?.map((raw: unknown) => mapApiWarrantyItem(raw)),
        status: ClaimStatus.INPROCESS,
      };

      yield put({
        type: FileClaimAction.UPDATE_ACTIVE_CLAIM,
        payload: activeClaimUpdated,
      });

      const userClaims: Claim[] = yield select(getClaims);
      yield put({
        type: UserAction.SET_CLAIMS,
        payload: [...userClaims, activeClaimUpdated],
      });
    } catch (error) {
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: FileClaimScope, error });
    } finally {
      yield put(disableScopeLoading(FileClaimScope));
    }
  }
}

function* insertClaimItemFlow() {
  while (true) {
    const request = yield take(FileClaimAction.INSERT_CLAIM_ITEM);
    yield put(enableScopeLoading(FileClaimScope));
    try {
      const dtos: InsertClaimItemDto[] = request.payload;
      yield all(
        dtos.map(function* (dto: InsertClaimItemDto) {
          if (yield call(Api.claimCore.insertClaimItem, dto)) {
            yield call(refetchActiveClaim, dto.claimId, dto.warrentyId);
          }
        }),
      );
    } catch (error) {
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: FileClaimScope, error });
    } finally {
      yield put(disableScopeLoading(FileClaimScope));
    }
  }
}

function* inserClaimItemDamageFlow() {
  while (true) {
    const request = yield take(FileClaimAction.INSERT_CLAIM_ITEM_DAMAGE);
    yield put(enableScopeLoading(FileClaimScope));
    try {
      const dtos: InsertDamageDto[] = request.payload;
      yield all(
        dtos.map(function* (dto: InsertDamageDto) {
          const activeClaim: Claim = yield select(getActiveClaim);
          if (yield call(Api.claimCore.insertClaimItemDamage, dto)) {
            const claimDamagesRaw: unknown[] = yield call(Api.claimCore.getClaimDamages, dto.claimId);
            const mappedDamages = claimDamagesRaw.map((damageRaw: unknown) => mapApiClaimDamage(damageRaw));
            activeClaim.items.forEach((item) => {
              item.damages = mappedDamages.filter((damage: Damage) => damage.claimItemId === item.id);
            });

            yield put({
              type: FileClaimAction.UPDATE_ACTIVE_CLAIM,
              payload: {
                ...activeClaim,
              },
            });
            yield put({
              type: FileClaimAction.REMOVE_PREVENT_SUBMIT_CLAIM,
              payload: { claimId: activeClaim.id },
            });
            yield put({
              type: FileClaimAction.REMOVE_ERROR_STEPS,
              payload: { claimId: activeClaim.id, step: 4 },
            });
          } else {
            yield put({
              type: ScopeErrorAction.SET_SCOPE_ERROR,
              payload: FileClaimScope,
              error: { message: 'Damage areas are not saved properly.' },
            });
            yield put({
              type: FileClaimAction.SET_PREVENT_SUBMIT_CLAIM,
              payload: { claimId: activeClaim.id, status: true },
            });
            yield put({
              type: FileClaimAction.SET_ERROR_STEPS,
              payload: { claimId: activeClaim.id, step: 4, message: 'Damage areas are not saved properly.' },
            });
          }
        }),
      );
    } catch (error) {
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: FileClaimScope, error });
    } finally {
      yield put(disableScopeLoading(FileClaimScope));
    }
  }
}

function* submitClaimFlow() {
  while (true) {
    const request = yield take(FileClaimAction.SUBMIT_CLAIM);
    yield put(enableScopeLoading(FileClaimScope));
    try {
      const claimId = request.payload;
      if (yield call(Api.claimCore.submitClaim, claimId)) {
        yield put(fetchPlansAndClaims());
        yield call(removeActiveClaim);
        yield put({
          type: FileClaimAction.CLEAR_ERROR_STEPS,
          payload: { claimId },
        });
      }
    } catch (error) {
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: FileClaimScope, error });
    } finally {
      yield put(disableScopeLoading(FileClaimScope));
    }
  }
}

function* deleteDamageFlow() {
  while (true) {
    const request = yield take(FileClaimAction.DELETE_DAMAGE);
    yield put(enableScopeLoading(FileClaimScope));
    try {
      const { damageId, claimId } = request.payload;
      if (yield call(Api.claimCore.deleteDamage, damageId)) {
        const activeClaim = yield select(getActiveClaim);
        const claimDamagesRaw: unknown[] = yield call(Api.claimCore.getClaimDamages, claimId);
        const mappedDamages = claimDamagesRaw.map((damageRaw: unknown) => mapApiClaimDamage(damageRaw));
        activeClaim.items.forEach((item) => {
          item.damages = mappedDamages.filter((damage: Damage) => damage.claimItemId === item.id);
        });

        yield put({
          type: FileClaimAction.UPDATE_ACTIVE_CLAIM,
          payload: {
            ...activeClaim,
          },
        });
      }
    } catch (error) {
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: FileClaimScope, error });
    } finally {
      yield put(disableScopeLoading(FileClaimScope));
    }
  }
}

function* insertManualWarrantyItemFlow() {
  while (true) {
    const request = yield take(FileClaimAction.INSERT_WARRANTY_ITEM);
    yield put(enableScopeLoading(FileClaimScope));
    try {
      const dto: InsertWarrantyItemDto = request.payload;
      if (yield call(Api.claimCore.insertManualWarrantyItem, dto)) {
        yield call(refetchActiveClaim, dto.claimId, dto.warrentyId);
      }
    } catch (error) {
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: FileClaimScope, error });
    } finally {
      yield put(disableScopeLoading(FileClaimScope));
    }
  }
}

function* deleteClaimItemFlow() {
  while (true) {
    const request = yield take(FileClaimAction.DELETE_CLAIM_ITEM);
    yield put(enableScopeLoading(FileClaimScope));
    try {
      const claimItemId = request.payload;
      if (yield call(Api.claimCore.deleteClaimItem, claimItemId)) {
        const activeClaim: Claim = yield select(getActiveClaim);

        //delete item's documents also
        const filesToDelete = activeClaim.items.find((item: ClaimItem) => item.id === claimItemId)?.files;

        yield all(
          filesToDelete.map(function* (doc: UploadedFile) {
            return yield call(Api.claimCore.deleteClaimDocument, doc);
          }),
        );

        yield call(refetchActiveClaim, activeClaim.id, activeClaim.warrantyId ?? activeClaim.plan?.id);
      }
    } catch (error) {
      yield put({ type: ScopeErrorAction.SET_SCOPE_ERROR, payload: FileClaimScope, error });
    } finally {
      yield put(disableScopeLoading(FileClaimScope));
    }
  }
}

export default function* fileClaimSaga() {
  yield fork(insertClaimFlow);
  yield fork(insertClaimItemFlow);
  yield fork(inserClaimItemDamageFlow);
  yield fork(deleteDamageFlow);
  yield fork(insertManualWarrantyItemFlow);
  yield fork(deleteClaimItemFlow);

  yield fork(submitClaimFlow);
}
