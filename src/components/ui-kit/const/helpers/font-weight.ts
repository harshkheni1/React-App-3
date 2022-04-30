import { FontWeightType, FontWeightValue } from '../fonts';
import { GridBreakpointsArrayType, map } from '../grid';

export const fontWeightHelperStyle = (
  fontWeight: FontWeightType | { [key in GridBreakpointsArrayType]?: FontWeightType },
) => map(fontWeight, (fw) => `font-weight: ${FontWeightValue[fw]} !important;`);

export interface FontWeightHelper {
  fontWeight?: FontWeightType | { [key in GridBreakpointsArrayType]?: FontWeightType };
}
