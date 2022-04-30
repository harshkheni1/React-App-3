import { HtmlProps } from '../../../utils/types';
import { ArrayToType } from '../../../const';

export const InputSpinnerSizeArray = ['sm', 'md'] as const;
export type InputSpinnerSizeType = ArrayToType<typeof InputSpinnerSizeArray>;

export interface InputSpinnerProps extends HtmlProps<HTMLInputElement> {
  defaultValue?: number;
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  readOnly?: boolean;
  measure: InputSpinnerSizeType;
}
