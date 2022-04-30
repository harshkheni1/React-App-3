import { HtmlProps } from '../../utils';
import { ButtonTypesType, ButtonSizeType, ButtonVariantType, ButtonColorType, ButtonTagsType } from './const';
import { AlignHelper, FontWeightHelper, SpacingProps } from '../../const';

export interface ButtonSizeStylesType {
  height: number;
  fontSize: number;
  lineHeight: number;
  paddingVertical: number;
  paddingHorizontal: number;
  letterSpacing: number;
}

export interface ButtonProps extends HtmlProps<HTMLButtonElement>, SpacingProps, FontWeightHelper, AlignHelper {
  href?: string;
  type?: ButtonTypesType;
  measure?: ButtonSizeType;
  variant?: ButtonVariantType;
  color?: ButtonColorType;
  fullWidth?: boolean;
  borderRadius?: number;
  shade?: boolean;
  uppercase?: boolean;
  as?: ButtonTagsType;
  square?: boolean;
}

export interface ButtonStyledAttrProps extends ButtonProps {
  $color?: ButtonColorType;
}
