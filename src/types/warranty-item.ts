import { FlatItem } from './general';
import { Plan } from './plan';

export interface WarrantyItem {
  id: number;
  customerId: number;
  warrantyId: number;
  itemDescription: string;
  itemPrice: number;
  itemOrigin: number;
  modelNumber: string;
  warrantyNumber: string;

  type: FlatItem;
  manufacturer: FlatItem;
  color: FlatItem;
  material: FlatItem;
  sku: string;
  quantity: number;
  vendor: string;
  rowNumber: number;
  trackKey: string;

  plan?: Plan; //covers warranty_id
}

export interface InsertWarrantyItemDto {
  claimId: number;
  color: number;
  description: string;
  manuFacturer: number;
  manualWarrNumber: string;
  itemType: number;
  material: number;
  modelNumber: string;
  price: number;
  quantity: number;
  sku: string;
  vendor: string;
  warrentyId: number;
}
