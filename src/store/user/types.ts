import { InferValueTypes } from '../service-types';
import * as actions from './actions';
import { Plan } from '@/core-types/plan';
import { HYDRATE } from 'next-redux-wrapper';
import { FlatItem, ChildFlatItem } from '@/core-types/general';
import { Claim } from '@/core-types/claim';

export enum UserAction {
  FETCH_PLANS_AND_CLAIMS = 'FETCH_PLANS_AND_CLAIMS',
  FETCH_CLAIM_OPTIONS = 'FETCH_CLAIM_OPTIONS',
  DELETE_CLAIM = 'DELETE_CLAIM',

  SET_PLANS = 'SET_PLANS',
  SET_CLAIMS = 'SET_CLAIMS',
  SET_CLAIM_OPTIONS = 'SET_CLAIM_OPTIONS',

  UPDATE_CLAIM = 'UPDATE_CLAIM',
}

export interface ClaimsOptionsInterface {
  claimItemTypes: FlatItem[];
  materialTypes: FlatItem[];
  manufacturers: FlatItem[];
  colors: FlatItem[];
  actionsTaken: FlatItem[];
  specificDamages: ChildFlatItem[];
  howDidOccur: FlatItem[];
  damageTypes: FlatItem[];
  specificLocations: FlatItem[];
}

export type UserState = Readonly<{
  plans: Plan[];
  claims: Claim[];
  claimOptions: ClaimsOptionsInterface;
}>;

export type UserActionTypes = ReturnType<InferValueTypes<typeof actions> & typeof HYDRATE>;

export const UserScope = 'user';
