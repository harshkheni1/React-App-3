import { ArrayToType } from '../../const';

export const TableVariantArray = ['lines'] as const;
export type TableVariantType = ArrayToType<typeof TableVariantArray>;

export const TableCellTypeArray = ['basic', 'head'] as const;
export type TableCellTypeType = ArrayToType<typeof TableCellTypeArray>;

export const TableCellNameArray = ['toggle', 'action', 'fileListingSection', 'fileListingAction'] as const;
export type TableCellNameType = ArrayToType<typeof TableCellNameArray>;

export interface TableCellStyleType {
  width: number;
}
export const TableCellStyles: { [key in TableCellNameType]: TableCellStyleType } = {
  toggle: {
    width: 40,
  },
  action: {
    width: 80,
  },
  fileListingSection: {
    width: 200,
  },
  fileListingAction: {
    width: 200,
  },
};
