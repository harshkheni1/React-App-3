import { HYDRATE } from 'next-redux-wrapper';

import { ClaimsOptionsInterface, UserAction } from './types';
import { Plan } from '../../types/plan';
import { Claim } from '../../types/claim';
import { RootState } from '../root-reducer';

export const fetchPlansAndClaims = () =>
  ({
    type: UserAction.FETCH_PLANS_AND_CLAIMS,
  } as const);

export const setPlans = (payload: Plan[]) =>
  ({
    type: UserAction.SET_PLANS,
    payload,
  } as const);

export const fetchClaimDetailsData = () =>
  ({
    type: UserAction.FETCH_CLAIM_OPTIONS,
  } as const);

export const setClaimOptions = (payload: ClaimsOptionsInterface) =>
  ({
    type: UserAction.SET_CLAIM_OPTIONS,
    payload,
  } as const);

export const setClaims = (payload: Claim[]) =>
  ({
    type: UserAction.SET_CLAIMS,
    payload,
  } as const);

export const hydro = (payload: RootState) =>
  ({
    type: HYDRATE,
    payload,
  } as const);

export const updateClaim = (payload: Claim) =>
  ({
    type: UserAction.UPDATE_CLAIM,
    payload,
  } as const);

export const deleteClaim = (payload: number | string) =>
  ({
    type: UserAction.DELETE_CLAIM,
    payload,
  } as const);
