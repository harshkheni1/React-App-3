import { ClaimStatus } from '@/core-types/claim';
import { FileClaimActionTypes, FileClaimState, FileClaimAction } from './types';

const initialState: FileClaimState = {
  activeClaim: null,
  preventSubmitClaim: {},
  errorSteps: {},
};

export const fileClaimReducer = (
  state: FileClaimState = initialState,
  action: FileClaimActionTypes,
): FileClaimState => {
  switch (action.type) {
    case FileClaimAction.UPDATE_ACTIVE_CLAIM: {
      return {
        ...state,
        activeClaim: { ...state?.activeClaim, ...action.payload, status: ClaimStatus.NOT_SUBMITTED },
      };
    }
    case FileClaimAction.REMOVE_ACTIVE_CALIM: {
      return {
        ...state,
        activeClaim: null,
      };
    }
    case FileClaimAction.SET_PREVENT_SUBMIT_CLAIM: {
      const upArr = { ...state?.preventSubmitClaim };
      upArr[action.payload.claimId] = action.payload.status;
      return {
        ...state,
        preventSubmitClaim: upArr,
      };
    }
    case FileClaimAction.REMOVE_PREVENT_SUBMIT_CLAIM: {
      const upArr = { ...state?.preventSubmitClaim };
      upArr[action.payload.claimId] && delete upArr[action.payload.claimId];
      return {
        ...state,
        preventSubmitClaim: upArr,
      };
    }
    case FileClaimAction.SET_ERROR_STEPS: {
      const upArr = { ...state?.errorSteps };
      upArr[action.payload.claimId] = upArr[action.payload.claimId] ? upArr[action.payload.claimId] : {};
      upArr[action.payload.claimId][action.payload.step] = action.payload.message;
      return {
        ...state,
        errorSteps: upArr,
      };
    }
    case FileClaimAction.REMOVE_ERROR_STEPS: {
      const upArr = { ...state?.errorSteps };
      upArr[action.payload.claimId] &&
        upArr[action.payload.claimId][action.payload.step] &&
        delete upArr[action.payload.claimId][action.payload.step];
      return {
        ...state,
        errorSteps: upArr,
      };
    }
    case FileClaimAction.CLEAR_ERROR_STEPS: {
      const upArr = { ...state?.errorSteps };
      delete upArr[action.payload.claimId];
      return {
        ...state,
        errorSteps: upArr,
      };
    }
    default:
      return state;
  }
};
