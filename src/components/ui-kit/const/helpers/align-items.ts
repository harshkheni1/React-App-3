import { ArrayToType } from '../../utils';
import { GridBreakpointsArrayType, map } from '../grid';

export const AlignItemsHelperArray = [
  'flex-start',
  'flex-end',
  'center',
  'baseline',
  'stretch',
  'inherit',
  'initial',
  'unset',
];
export type AlignItemsHelperType = ArrayToType<typeof AlignItemsHelperArray>;

export const alignItemsHelperStyle = (
  alignItems: AlignItemsHelperType | { [key in GridBreakpointsArrayType]?: AlignItemsHelperType },
) => map(alignItems, (b) => `align-items: ${b} !important;`);

export interface AlignItemsHelper {
  alignItems?: AlignItemsHelperType | { [key in GridBreakpointsArrayType]?: AlignItemsHelperType };
}
