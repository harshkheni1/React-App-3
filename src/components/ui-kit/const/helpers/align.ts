import { ArrayToType } from '../../utils';
import { GridBreakpointsArrayType, map } from '../grid';

export const AlignHelperArray = ['left', 'center', 'right', 'justify'] as const;
export type AlignHelperType = ArrayToType<typeof AlignHelperArray>;
export const alignHelperStyle = (align: AlignHelperType | { [key in GridBreakpointsArrayType]?: AlignHelperType }) =>
  map(align, (a) => `text-align: ${a} !important;`);

export interface AlignHelper {
  align?: AlignHelperType | { [key in GridBreakpointsArrayType]?: AlignHelperType };
}
