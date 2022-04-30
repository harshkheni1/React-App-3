import { GridBreakpointsArrayType, SpacingProps, TextSizeType, TextTagType } from '../../../const';
import { HtmlProps } from '../../../utils/types';

export interface LabelProps extends HtmlProps<HTMLLabelElement>, SpacingProps {
  required?: boolean;
  measure?: TextSizeType | { [key in GridBreakpointsArrayType]?: TextSizeType };
  as?: TextTagType;
}
