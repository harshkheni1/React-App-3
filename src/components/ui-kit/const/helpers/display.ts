import { ArrayToType } from '../../utils';
import { GridBreakpointsArrayType, map } from '../grid';

export const DisplayHelperArray = ['block', 'inline-block', 'inline', 'flex', 'none', 'table-cell'] as const;
export type DisplayHelperType = ArrayToType<typeof DisplayHelperArray>;

export const displayHelperStyle = (
  display: DisplayHelperType | { [key in GridBreakpointsArrayType]?: DisplayHelperType },
) => map(display, (d) => (d ? `display: ${d} !important;` : ''));

export interface DisplayHelper {
  display?: DisplayHelperType | { [key in GridBreakpointsArrayType]?: DisplayHelperType };
}

export interface DisplayHelperStyledAttrProps extends DisplayHelper {
  $display?: DisplayHelperType | { [key in GridBreakpointsArrayType]?: DisplayHelperType };
}
