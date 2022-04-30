import moment from 'moment';

import { RootState } from '../root-reducer';
import { FlatItem, ApiFlatItem, ChildFlatItem, ApiChildFlatItem } from '@/core-types/general';
import { Claim, ClaimStatus } from '@/core-types/claim';
import { Plan, PlanStatus } from '@/core-types/plan';
import { ClaimItem } from '@/core-types/claim-item';
import { Damage, DamageStatus } from '@/core-types/damage';
import { WarrantyItem } from '@/core-types/warranty-item';
import { UploadedFile } from '@/core-types/uploaded-file';

export const mapApiPlan = (payload: unknown): Plan => {
  return {
    id: +payload['id'],
    title: payload['Title'],
    dealerName: payload['DealerName'],
    planStatus: payload['PlanStatus'] === 'Active' ? PlanStatus.ACTIVE : PlanStatus.INACTIVE,
    programName: payload['ProgramName'],
    customerId: payload['customer_id'],
    dealerId: payload['dealer_id'],

    pdfLink: payload['fullPDF'],
    dealerLogoUrl: payload['DealerLogoUrl'],
    invoiceId: payload['invoice'],
    number: payload['number'],
    programId: payload['program_id'],
    deliveryDate: moment(payload['delivery_date'], 'YYYY-MM-DD').toDate(),
    purchaseDate: moment(payload['purchase_date'], 'YYYY-MM-DD').toDate(),
    expirationDate: moment(payload['ExpirationDate'], 'YYYY-MM-DD').toDate(),
    store: payload['stor_loc'],

    totalPrice: +payload['total_price'],
    warrantyProgramPrice: +payload['warranty_program_price'],
    userExtendedInfoId: +payload['user_extended_info_id'],
    contractHolder: payload['contract_holder'],
    warrantyItems: payload['warrantyItems']?.map((w) => mapApiWarrantyItem(w)),
  };
};

export const mapApiFlatData = (payload: ApiFlatItem): FlatItem => ({
  id: payload.ID,
  name: payload.name || payload.NAME,
});

export const mapApiChildFlatData = (payload: ApiChildFlatItem): ChildFlatItem => ({
  id: payload.ID,
  name: payload.name || payload.NAME,
  parrentId: payload.Parent_Type_ID,
});

export const getPlans = (state: RootState): Plan[] => state.user.plans;
export const getClaims = (state: RootState): Claim[] => state.user.claims;

const mapClaimStatus = (rawStatus: unknown): ClaimStatus => {
  switch (rawStatus.toString().toLowerCase()) {
    case 'closed':
      return ClaimStatus.CLOSE;
    case 'in-process':
      return ClaimStatus.INPROCESS;
    case 'open':
      return ClaimStatus.OPEN;
    default:
      throw new Error(`Mapping failed. ${rawStatus} is not recognized.`);
  }
};
export const mapApiClaim = (payload: unknown): Claim => {
  const status = mapClaimStatus(payload['claimStatus']);

  return {
    id: +payload['claimid'],
    customerId: payload['gbs_customers'],
    claimDate: payload['claim_date'] && moment(payload['claim_date'], 'YYYY-MM-DD').toDate(),
    damageDate: payload['damage_date'] && moment(payload['damage_date'], 'YYYY-MM-DD').toDate(),
    status,
    warrantyId: +payload['warranty_id'],
    warrantyNumber: payload['warr_num'],
    userExtendedInfoId: +payload['user_extended_info_id'],
  };
};

export const mapApiClaimItem = (payload: unknown): ClaimItem => {
  return {
    id: +payload['item_id'],
    ...(payload['item_type_disp'] &&
      payload['item_type'] && { type: { id: payload['item_type'], name: payload['item_type_disp'] } }),
    ...(payload['manufact_id'] &&
      payload['manufact_disp'] && { manufacturer: { id: payload['manufact_id'], name: payload['manufact_disp'] } }),
    ...(payload['color_id'] &&
      payload['color_disp'] && { color: { id: payload['color_id'], name: payload['color_disp'] } }),
    ...(payload['material_id'] &&
      payload['material_id_disp'] && { material: { id: payload['material_id'], name: payload['material_id_disp'] } }),
    sku: payload['sku'],
    claimId: +payload['claim_id'],
    vendor: payload['vendor'],
    itemDescription: payload['item_descr'],
  };
};

const mapDamageStatus = (rawStatus: unknown): DamageStatus => {
  switch (+rawStatus) {
    case 1606:
      return DamageStatus.ADVICE;
    case 1607:
      return DamageStatus.KIT;
    case 1608:
      return DamageStatus.SERVICE_TECH;
    case 1609:
      return DamageStatus.STORE_REFERRAL;
    case 1610:
      return DamageStatus.PART_REPLACEMENT;
    case 1611:
      return DamageStatus.FULL_REPLACEMENT;
    case 1612:
      return DamageStatus.COMPENSATION;
    case 1613:
      return DamageStatus.DENIAL;
    case 1885:
      return DamageStatus.STORED_OPTED_RP;
    case 3087:
      return DamageStatus.PHOTO_REVIEW;
    case 3315:
      return DamageStatus.IN_DISPOSITION;
    case 3318:
      return DamageStatus.INVOICE_REQUEST;
    case 3319:
      return DamageStatus.PARTS_INQUIRY;
    case 3456:
    default:
      return DamageStatus.ONLINE_CLAIM_REVIEW;
  }
};

export const mapApiClaimDamage = (payload: unknown): Damage => {
  return {
    id: +payload['damage_id'],
    claimId: +payload['claim_id'],
    claimItemId: +payload['item_id'],
    status: mapDamageStatus(payload['action']), //payload['status_id']
    notes: payload['note_damage_area'],
    damageDate: payload['da_damage_date'] && moment(payload['da_damage_date'], 'YYYY-MM-DD').toDate(),
    ...(payload['actions_taken'] &&
      payload['actions_taken_disp'] && {
        actionTaken: { id: payload['actions_taken'], name: payload['actions_taken_disp'] },
      }),
    ...(payload['damage_type'] &&
      payload['damage_type_disp'] && { type: { id: payload['damage_type'], name: payload['damage_type_disp'] } }),
    ...(payload['how_did_occur'] &&
      payload['how_did_occur_disp'] && {
        occuredReason: { id: payload['how_did_occur'], name: payload['how_did_occur_disp'] },
      }),
    ...(payload['specific_damage'] &&
      payload['specific_damage_disp'] && {
        specificDamage: { id: payload['specific_damage'], name: payload['specific_damage_disp'] },
      }),
    ...(payload['specific_location'] &&
      payload['specific_location_disp'] && {
        specificLocation: { id: payload['specific_location'], name: payload['specific_location_disp'] },
      }),
  };
};

export const mapApiWarrantyItem = (payload: unknown): WarrantyItem => {
  return {
    color: { id: +payload['color'], name: payload['color_disp'] },
    customerId: +payload['cust_id'],
    id: +payload['id'],
    itemOrigin: payload['itemOrigin'],
    type: { id: +payload['item_type'], name: payload['item_type_disp'] },
    itemDescription: payload['item_descr'],
    itemPrice: +payload['item_price'],
    manufacturer: { id: +payload['manufact'], name: payload['manufact_disp'] },
    material: { id: +payload['material'], name: payload['material_disp'] },
    modelNumber: payload['model_num'],
    quantity: +payload['quantity'],
    rowNumber: +payload['row_number'],
    sku: payload['sku'],
    trackKey: payload['trackKey'],
    vendor: payload['vendor'],
    warrantyNumber: payload['warr_number'],
    warrantyId: +payload['warranty_id'],
  };
};

export const mapApiUploadedFile = (payload: unknown): UploadedFile => {
  return {
    id: +payload['id'],
    name: payload['doc_name'],
    docDef: payload['docdef'],
    claimId: +payload['ref_id'],
    type: payload['type'],
    addedDate: payload['date_added'] && moment(payload['date_added']).toDate(),

    //non-obligatory params
    addedBy: payload['added_by'] ?? 'CP2.0',
    fileType: payload['file_type'],
    linkKey: payload['linkKey'],
    metaTag1: payload['meta_tag_1'],
    metaTag2: payload['meta_tag_2'],
    notes: payload['notes'],
    tempFlag: payload['temp_flag'],
    ts: payload['ts'] && moment(payload['ts']).toDate(),
    ...(payload['gbs_claim_items_damage_areas_id'] && {
      cliamItemDamageId: +payload['gbs_claim_items_damage_areas_id'],
    }),
    ...(payload['gbs_claim_items_id'] && { claimItemsId: +payload['gbs_claim_items_id'] }),
  };
};

//is used once new document is uploaded; payload differs from claim details uploaded file!
export const mapApiInsertedFile = (payload: unknown): UploadedFile => {
  return {
    id: +payload['id'],
    name: payload['name'],
    docDef: payload['docDef'],
    claimId: +payload['claimId'],
    type: payload['type'],
    addedDate: payload['addedDate'] && moment(payload['addedDate']).toDate(),

    //non-obligatory params
    addedBy: payload['added_by'] ?? 'CP2.0',

    ...(payload['claimItemsDamageAreasId'] && { cliamItemDamageId: +payload['claimItemsDamageAreasId'] }),
    ...(payload['claimItemsId'] && { claimItemsId: +payload['claimItemsId'] }),
  };
};
