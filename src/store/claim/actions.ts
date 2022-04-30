import { FileClaimAction, ErrorStep, PreventSubmit } from './types';
import { Claim, InsertClaimDto, InsertClaimItemDto } from '@/core-types/claim';
import { DeleteDamageDto, InsertDamageDto } from '@/core-types/damage';
import { InsertWarrantyItemDto } from '@/core-types/warranty-item';

export const insertClaim = (payload: InsertClaimDto) =>
  ({
    type: FileClaimAction.INSERT_CLAIM,
    payload,
  } as const);

export const insertClaimItem = (payload: InsertClaimItemDto[]) =>
  ({
    type: FileClaimAction.INSERT_CLAIM_ITEM,
    payload,
  } as const);

export const updateActiveClaim = (payload: Partial<Claim>) =>
  ({
    type: FileClaimAction.UPDATE_ACTIVE_CLAIM,
    payload,
  } as const);

export const setPreventSubmitClaim = (payload: PreventSubmit) =>
  ({
    type: FileClaimAction.SET_PREVENT_SUBMIT_CLAIM,
    payload,
  } as const);

export const removePreventSubmitClaim = (payload: PreventSubmit) =>
  ({
    type: FileClaimAction.REMOVE_PREVENT_SUBMIT_CLAIM,
    payload,
  } as const);

export const setErrorSteps = (payload: ErrorStep) =>
  ({
    type: FileClaimAction.SET_ERROR_STEPS,
    payload,
  } as const);

export const removeErrorSteps = (payload: ErrorStep) =>
  ({
    type: FileClaimAction.REMOVE_ERROR_STEPS,
    payload,
  } as const);

export const clearErrorSteps = (payload: ErrorStep) =>
  ({
    type: FileClaimAction.CLEAR_ERROR_STEPS,
    payload,
  } as const);

export const removeActiveClaim = () =>
  ({
    type: FileClaimAction.REMOVE_ACTIVE_CALIM,
  } as const);

export const insertClaimItemDamage = (payload: InsertDamageDto[]) =>
  ({
    type: FileClaimAction.INSERT_CLAIM_ITEM_DAMAGE,
    payload,
  } as const);

export const submitClaim = (payload: string | number) =>
  ({
    type: FileClaimAction.SUBMIT_CLAIM,
    payload,
  } as const);

export const deleteDamage = (payload: DeleteDamageDto) =>
  ({
    type: FileClaimAction.DELETE_DAMAGE,
    payload,
  } as const);

export const insertWarrantyItem = (payload: InsertWarrantyItemDto) =>
  ({
    type: FileClaimAction.INSERT_WARRANTY_ITEM,
    payload,
  } as const);

export const deleteClaimItem = (payload: string | number) =>
  ({
    type: FileClaimAction.DELETE_CLAIM_ITEM,
    payload,
  } as const);
