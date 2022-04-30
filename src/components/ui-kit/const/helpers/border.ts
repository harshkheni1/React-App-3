import { GridBreakpointsArrayType, map } from '../grid';

export const borderHelperStyle = (border: string | { [key in GridBreakpointsArrayType]?: string }) =>
  map(border, (b) => `border: ${b} !important;`);

export interface BorderHelper {
  border?: string | { [key in GridBreakpointsArrayType]?: string };
}

export const BorderStyleArray = ['dotted', 'dashed', 'solid', 'double'];
