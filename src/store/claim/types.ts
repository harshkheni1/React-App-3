import { Claim } from '@/core-types/claim';
import { InferValueTypes } from '../service-types';
import * as actions from './actions';

export enum FileClaimAction {
  INSERT_CLAIM = 'INSERT_CLAIM',
  INSERT_CLAIM_ITEM = 'INSERT_CLAIM_ITEM',
  INSERT_CLAIM_ITEM_DAMAGE = 'INSERT_CLAIM_ITEM_DAMAGE',
  INSERT_WARRANTY_ITEM = 'INSERT_WARRANTY_ITEM',
  DELETE_DAMAGE = 'DELETE_DAMAGE',
  DELETE_CLAIM_ITEM = 'DELETE_CLAIM_ITEM',
  SUBMIT_CLAIM = 'SUBMIT_CLAIM',

  UPDATE_ACTIVE_CLAIM = 'UPDATE_ACTIVE_CLAIM',
  REMOVE_ACTIVE_CALIM = 'REMOVE_ACTIVE_CALIM',

  SET_PREVENT_SUBMIT_CLAIM = 'SET_PREVENT_SUBMIT_CLAIM',
  REMOVE_PREVENT_SUBMIT_CLAIM = 'REMOVE_PREVENT_SUBMIT_CLAIM',

  SET_ERROR_STEPS = 'SET_ERROR_STEPS',
  REMOVE_ERROR_STEPS = 'REMOVE_ERROR_STEPS',
  CLEAR_ERROR_STEPS = 'CLEAR_ERROR_STEPS',
}

export type FileClaimState = Readonly<{
  activeClaim: Partial<Claim>;
  preventSubmitClaim: Record<string, unknown>;
  errorSteps: Record<string, unknown>;
}>;

export type ErrorStep = {
  claimId: number;
  step: number;
  message: string;
};

export type PreventSubmit = {
  claimId: number;
  status: boolean;
};

export type FileClaimActionTypes = ReturnType<InferValueTypes<typeof actions>>;

export const FileClaimScope = 'file-claim';
