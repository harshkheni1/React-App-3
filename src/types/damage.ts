import { FlatItem } from './general';
import { UploadedFile } from './uploaded-file';

export enum DamageStatus {
  /**@deprecated */
  APPROVED = 'APPROVED',
  /**@deprecated */
  REVIEW = 'REVIEW',
  /**@deprecated */
  DENIED = 'DENIED',

  ADVICE = 'ADVICE',
  KIT = 'KIT',
  SERVICE_TECH = 'SERVICE_TECH',
  STORE_REFERRAL = 'STORE_REFERRAL',
  PART_REPLACEMENT = 'PART_REPLACEMENT',
  FULL_REPLACEMENT = 'FULL_REPLACEMENT',
  COMPENSATION = 'COMPENSATION',
  DENIAL = 'DENIAL',
  STORED_OPTED_RP = 'STORED_OPTED_RP',
  PHOTO_REVIEW = 'PHOTO_REVIEW',
  IN_DISPOSITION = 'IN_DISPOSITION',
  INVOICE_REQUEST = 'INVOICE_REQUEST',
  PARTS_INQUIRY = 'PARTS_INQUiRY',
  ONLINE_CLAIM_REVIEW = 'ONLINE_CLAIM_REVIEW',
}

export interface Damage {
  id: number;

  status: DamageStatus;
  damageDate: Date;

  actionTaken?: FlatItem;
  type?: FlatItem;
  occuredReason?: FlatItem;
  specificDamage?: FlatItem;
  specificLocation?: FlatItem; //area
  notes?: string;

  claimId?: number;
  claimItemId?: number;
  files?: UploadedFile[];
}

type DamageStatusColorType = 'approved' | 'denied' | 'review';

export const DamageSatusToUI: { [key in DamageStatus]: { text: string; color: DamageStatusColorType } } = {
  [DamageStatus.APPROVED]: { text: 'Approved', color: 'approved' },
  [DamageStatus.DENIED]: { text: 'Denied', color: 'denied' },
  [DamageStatus.REVIEW]: { text: 'Under Review', color: 'review' },

  [DamageStatus.ADVICE]: { text: 'Advice', color: 'approved' },
  [DamageStatus.KIT]: { text: 'Kit', color: 'approved' },
  [DamageStatus.SERVICE_TECH]: { text: 'Service Tech', color: 'approved' },
  [DamageStatus.STORE_REFERRAL]: { text: 'Store Referral', color: 'approved' },
  [DamageStatus.PART_REPLACEMENT]: { text: 'Part Replacement', color: 'approved' },
  [DamageStatus.FULL_REPLACEMENT]: { text: 'Full Replacement', color: 'approved' },
  [DamageStatus.COMPENSATION]: { text: 'Compensation', color: 'approved' },
  [DamageStatus.DENIAL]: { text: 'Denial', color: 'denied' },
  [DamageStatus.STORED_OPTED_RP]: { text: 'Stored Opted RP', color: 'approved' },
  [DamageStatus.PHOTO_REVIEW]: { text: 'Photo Review', color: 'review' },
  [DamageStatus.IN_DISPOSITION]: { text: 'In Disposition', color: 'approved' },
  [DamageStatus.INVOICE_REQUEST]: { text: 'Invoice Request', color: 'approved' },
  [DamageStatus.PARTS_INQUIRY]: { text: 'Parts Inquiry', color: 'approved' },
  [DamageStatus.ONLINE_CLAIM_REVIEW]: { text: 'Online Claim Review', color: 'review' },
};

export interface InsertDamageDto {
  claimId: number;
  damageType: number;
  specificDamage: number;
  specificLocation: number;
  howDidOccur: number;
  actionTaken: number;
  damageDate: Date;
  selectedItemId: number; //claim item id
  notes: string;
}

export interface DeleteDamageDto {
  damageId: string | number;
  claimId: string | number;
}
