import { ArrayToType } from '../../utils';
import { GridBreakpointsArrayType, map } from '../grid';

export const FloatHelperArray = ['left', 'right', 'none'] as const;
export type FloatHelperType = ArrayToType<typeof FloatHelperArray>;

export const floatHelperStyle = (float: FloatHelperType | { [key in GridBreakpointsArrayType]?: FloatHelperType }) =>
  map(float, (f) => `float: ${f} !important;`);

export interface FloatHelper {
  float?: FloatHelperType | { [key in GridBreakpointsArrayType]?: FloatHelperType };
}
