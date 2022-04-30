import { Claim } from '@/core-types/claim';
import { RootState } from '../root-reducer';

export const getClaims = (state: RootState): Claim[] => state.user.claims;
export const getActiveClaim = (state: RootState): Partial<Claim> => state.fileClaim.activeClaim;

export const mapApiInsertedClaim = (payload: unknown): Partial<Claim> => {
  return {
    id: payload['claim_id'],
  };
};
