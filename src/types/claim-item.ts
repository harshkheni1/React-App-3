import { Damage } from './damage';
import { FlatItem } from './general';
import { UploadedFile } from './uploaded-file';

export interface ClaimItem {
  id: number;

  type?: FlatItem;
  manufacturer?: FlatItem;
  color?: FlatItem;
  material?: FlatItem;

  damages?: Damage[];
  files?: UploadedFile[];
  sku?: number;
  claimId?: number; //for backward relation

  vendor?: string;
  itemDescription?: string;
}
