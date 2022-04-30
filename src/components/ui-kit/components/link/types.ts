import { HtmlProps } from '../../utils';
import {
  ColorType,
  TextSizeType,
  AlignHelper,
  FontWeightHelper,
  FontFamilyHelper,
  SpacingProps,
  TextDecorationHelper,
} from '../../const';

export interface LinkProps
  extends HtmlProps<HTMLAnchorElement>,
    AlignHelper,
    FontWeightHelper,
    FontFamilyHelper,
    TextDecorationHelper,
    SpacingProps {
  measure?: TextSizeType;
  color?: ColorType;
  hoverColor?: ColorType;
  lineHeight?: number;
  letterSpacing?: number;
  underline?: boolean;
  /** To use uppercase text */
  uppercase?: boolean;
  /** To use line through text */
  lineThrough?: boolean;
  /** Takes full width of the parent component */
  fullWidth?: boolean;
  onClick?: () => void;
}
