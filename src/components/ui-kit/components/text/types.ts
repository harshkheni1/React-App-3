import { HtmlProps } from '../../utils';
import {
  ColorType,
  TextSizeType,
  TextTagType,
  AlignHelper,
  FloatHelper,
  FontWeightHelper,
  FontFamilyHelper,
  SpacingProps,
  GridBreakpointsArrayType,
  DisplayHelper,
  FontWeightType,
} from '../../const';

export interface TextProps
  extends HtmlProps<HTMLElement>,
    AlignHelper,
    FloatHelper,
    FontWeightHelper,
    FontFamilyHelper,
    DisplayHelper,
    SpacingProps {
  as?: TextTagType;
  measure?: TextSizeType | { [key in GridBreakpointsArrayType]?: TextSizeType };
  color?: ColorType;
  lineHeight?: number;
  letterSpacing?: number;
  children: any;
  breakAll?: boolean;
  /** To use uppercase text */
  uppercase?: boolean;
  /** To use capitalize text */
  capitalize?: boolean;
  /** To use line through text */
  lineThrough?: boolean;
  /** Takes full width of the parent component */
  fullWidth?: boolean;
}

export interface TextStyledAttrProps extends TextProps {
  $color?: ColorType;
  $fontWeight?: FontWeightType | { [key in GridBreakpointsArrayType]?: FontWeightType };
  $letterSpacing?: number;
}
