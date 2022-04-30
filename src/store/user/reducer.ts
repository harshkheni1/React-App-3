import { HYDRATE } from 'next-redux-wrapper';

import { UserActionTypes, UserState, UserAction } from './types';
import { ClaimStatus } from '@/core-types/claim';
import { PlanStatus } from '@/core-types/plan';

const initialState: UserState = {
  plans: [],
  claims: [],
  claimOptions: {
    claimItemTypes: [],
    materialTypes: [],
    manufacturers: [],
    colors: [],
    actionsTaken: [],
    specificDamages: [],
    howDidOccur: [],
    damageTypes: [],
    specificLocations: [],
  },
};

export const userReducer = (state: UserState = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case HYDRATE: {
      const mergedState = {
        ...state,
        ...action.payload.user,
      };
      return mergedState;
    }

    case UserAction.SET_PLANS: {
      const sortedActivePlans = action.payload
        ?.filter((plan) => plan.planStatus === PlanStatus.ACTIVE)
        .sort((planA, planB) => planA.id - planB.id);
      const sortedInActivePlans = action.payload
        ?.filter((plan) => plan.planStatus !== PlanStatus.ACTIVE)
        .sort((planA, planB) => planA.id - planB.id);

      return {
        ...state,
        plans: [...sortedActivePlans, ...sortedInActivePlans],
      };
    }

    case UserAction.SET_CLAIMS: {
      const inProcessSorted = action.payload
        .filter((c) => c.status === ClaimStatus.INPROCESS)
        .sort((a, b) => {
          if (b.claimDate.getTime() === a.claimDate.getTime()) {
            return b.id - a.id;
          }
          return b.claimDate.getTime() - a.claimDate.getTime();
        });

      const finishedSorted = action.payload
        .filter((c) => c.status !== ClaimStatus.INPROCESS)
        .sort((a, b) => {
          if (b.claimDate.getTime() === a.claimDate.getTime()) {
            return b.id - a.id;
          }
          return b.claimDate.getTime() - a.claimDate.getTime();
        });

      return {
        ...state,
        claims: [...inProcessSorted, ...finishedSorted],
      };
    }
    case UserAction.SET_CLAIM_OPTIONS: {
      return {
        ...state,
        claimOptions: action.payload,
      };
    }
    case UserAction.UPDATE_CLAIM: {
      const idx = state.claims.findIndex((claim) => claim.id === action.payload.id);
      state.claims[idx] = action.payload;

      return state;
    }

    default:
      return state;
  }
};
