import { HtmlProps } from '../../utils';
import {
  AlignHelper,
  ColorType,
  DisplayHelper,
  DisplayHelperType,
  FontFamilyHelper,
  FontFamilyType,
  FontWeightHelper,
  FontWeightType,
  GridBreakpointsArrayType,
  SpacingProps,
} from '../../const';
import { HeadingSizeType, HeadingTagType } from './const';

export interface HeadingSizeScale {
  display1?: string;
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
  h6?: string;
}

export interface HeadingProps
  extends HtmlProps<HTMLHeadingElement>,
    AlignHelper,
    FontWeightHelper,
    FontFamilyHelper,
    SpacingProps,
    DisplayHelper {
  as?: HeadingTagType;
  measure?: HeadingSizeType | { [key in GridBreakpointsArrayType]?: HeadingSizeType };
  color?: ColorType;
  lineHeight?: number;
  fontSize?: number | { [key in GridBreakpointsArrayType]?: number };
  letterSpacing?: number;
  children: any;
  /** To use uppercase text */
  uppercase?: boolean;
  /** To use line through text */
  lineThrough?: boolean;
}

export interface HeadingStyledAttrProps extends HeadingProps {
  $color?: ColorType;
  $fontWeight?: FontWeightType | { [key in GridBreakpointsArrayType]?: FontWeightType };
  $letterSpacing?: number;
  $fontSize?: number | { [key in GridBreakpointsArrayType]?: number };
  $fontFamily?: FontFamilyType;
  $display?: DisplayHelperType | { [key in GridBreakpointsArrayType]?: DisplayHelperType };
}
