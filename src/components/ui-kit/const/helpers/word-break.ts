import { ArrayToType } from '../../utils';
import { GridBreakpointsArrayType, map } from '../grid';

export const WordBreakHelperArray = ['normal', 'break-all', 'keep-all', 'break-word'] as const;
export type WordBreakType = ArrayToType<typeof WordBreakHelperArray>;

export const wordBreakHelperStyle = (
  wordBreak: WordBreakType | { [key in GridBreakpointsArrayType]?: WordBreakType },
) => map(wordBreak, (f) => `word-break: ${f} !important;`);

export interface WordBreakHelper {
  wordBreak?: WordBreakType | { [key in GridBreakpointsArrayType]?: WordBreakType };
}
