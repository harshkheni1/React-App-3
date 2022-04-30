import { ArrayToType } from '../../utils';
import { GridBreakpointsArrayType, map } from '../grid';

export const JustifyContentHelperArray = [
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'left',
  'right',
  'baseline',
  'first baseline',
  'last baseline',
  'space-between',
  'space-around',
];
export type JustifyContentHelperType = ArrayToType<typeof JustifyContentHelperArray>;

export const justifyContentHelperStyle = (
  justifyContent: JustifyContentHelperType | { [key in GridBreakpointsArrayType]?: JustifyContentHelperType },
) => map(justifyContent, (b) => `justify-content: ${b} !important;`);

export interface JustifyContentHelper {
  justifyContent?: JustifyContentHelperType | { [key in GridBreakpointsArrayType]?: JustifyContentHelperType };
}
