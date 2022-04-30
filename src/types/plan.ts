import { WarrantyItem } from './warranty-item';
export enum PlanStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export interface Plan {
  id: number;
  title: string;
  dealerName: string;
  programName: string;

  number: string;
  customerId: string;
  dealerId: string;
  programId: string;

  purchaseDate: Date;
  deliveryDate: Date;
  expirationDate: Date;

  store: string;
  invoiceId: string;
  totalPrice: number;
  warrantyProgramPrice: number;
  userExtendedInfoId: number;
  planStatus: PlanStatus;
  pdfLink: string;
  dealerLogoUrl: string;
  contractHolder: string;
  warrantyItems: WarrantyItem[];
}
