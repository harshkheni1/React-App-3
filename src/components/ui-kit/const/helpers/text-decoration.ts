import { ArrayToType } from '../../utils';
import { GridBreakpointsArrayType, map } from '../grid';

export const TextDecorationHelperArray = [
  'blink',
  'line-through ',
  'overline',
  'underline',
  'none',
  'inherit',
] as const;
export type TextDecorationHelperType = ArrayToType<typeof TextDecorationHelperArray>;
export const textDecorationHelperStyle = (
  textDecoration: TextDecorationHelperType | { [key in GridBreakpointsArrayType]?: TextDecorationHelperType },
) => map(textDecoration, (a) => `text-decoration: ${a} !important;`);

export interface TextDecorationHelper {
  textDecoration?: TextDecorationHelperType | { [key in GridBreakpointsArrayType]?: TextDecorationHelperType };
}
