import { Colors, ColorType } from '../colors';
import { GridBreakpointsArrayType, map } from '../grid';

export const bgHelperStyle = (bg: ColorType | { [key in GridBreakpointsArrayType]?: ColorType }) =>
  map(bg, (b) => `background-color: ${Colors[b]} !important;`);

export interface BgHelper {
  bg?: ColorType | { [key in GridBreakpointsArrayType]?: ColorType };
}
