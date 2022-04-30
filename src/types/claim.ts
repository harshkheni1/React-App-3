import { ClaimItem } from './claim-item';
import { Plan } from './plan';
import { UploadedFile } from './uploaded-file';
import { WarrantyItem } from './warranty-item';

export enum ClaimStatus {
  OPEN = 'Open',
  CLOSE = 'Closed',
  INPROCESS = 'In process',
  // technical
  NOT_SUBMITTED = 'Not submitted',
}

export interface Claim {
  id: number;
  customerId: string;
  claimDate: Date;
  status: ClaimStatus;
  warrantyId: number;
  damageDate: Date;
  warrantyNumber: string;
  userExtendedInfoId: number;

  plan?: Plan;
  warrantyItems?: WarrantyItem[];
  items?: ClaimItem[];
  files?: UploadedFile[];
}

enum ClaimStatusColors {
  OPEN = 'open',
  CLOSE = 'close',
  DRAFT = 'draft', // draft == in-process

  DENIED = 'denied',
  REVIEW = 'review',
  APPROVED = 'approved',
}
export const ClaimStatusToUI: { [key in ClaimStatus]: { color: ClaimStatusColors; text: string } } = {
  [ClaimStatus.OPEN]: { color: ClaimStatusColors.OPEN, text: 'Open' },
  [ClaimStatus.CLOSE]: { color: ClaimStatusColors.CLOSE, text: 'Closed' },
  [ClaimStatus.INPROCESS]: { color: ClaimStatusColors.DRAFT, text: 'Draft' },

  [ClaimStatus.NOT_SUBMITTED]: { color: ClaimStatusColors.DRAFT, text: '' },
};

export interface InsertClaimDto {
  warrentyId: number;

  claimdate: string;
  damagedate: string;
  allowSMS: boolean;
}

export interface InsertClaimItemDto {
  itemType: number;
  material: number;
  color: number;
  selectedItemId: number;
  warrentyId: number;
  claimId: number;

  manuFacturer?: number;
}
