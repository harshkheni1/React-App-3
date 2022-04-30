import { Colors, ColorType, FontWeightValue } from '../../../const';
import {
  FormCheckboxDisabledStyleType,
  FormCheckboxSizeStyleType,
  FormCheckboxColorStyleType,
  FormCheckboxBlockVariationType,
  FormCheckboxBlockVariantStyle,
  FormCheckboxSizeType,
} from './types';

/* Checkbox size variations */
const FormCheckboxSizeXs: FormCheckboxSizeStyleType = {
  measure: 20,
  borderRadius: 0,
  checkedIconSize: 12,
  line: {
    fontSize: 12,
  },
  block: {
    fontSize: 12,
  },
};
const FormCheckboxSizeSm: FormCheckboxSizeStyleType = {
  measure: 20,
  borderRadius: 0,
  checkedIconSize: 12,
  line: {
    fontSize: 14,
  },
  block: {
    fontSize: 14,
  },
};
const FormCheckboxSizeMd: FormCheckboxSizeStyleType = {
  measure: 20,
  borderRadius: 0,
  checkedIconSize: 12,
  line: {
    fontSize: 16,
  },
  block: {
    fontSize: 16,
  },
};
const FormCheckboxSizeLg: FormCheckboxSizeStyleType = {
  measure: 40,
  borderRadius: 2,
  checkedIconSize: 28,
  line: {
    fontSize: 18,
  },
  block: {
    fontSize: 18,
  },
};

export const FormCheckboxSize: { [key in FormCheckboxSizeType]?: FormCheckboxSizeStyleType } = {
  xs: FormCheckboxSizeXs,
  sm: FormCheckboxSizeSm,
  md: FormCheckboxSizeMd,
  lg: FormCheckboxSizeLg,
};

/* Checkbox color variations */
export const FormCheckboxColor: { [key in ColorType]?: FormCheckboxColorStyleType } = {
  white: {
    bg: Colors.white,
    border: Colors.gray500,
    checkedBg: Colors.white,
    checkedColor: 'gray500',
    checkedBorder: Colors.gray500,
  },
  primary: {
    bg: Colors.white,
    border: Colors.gray500,
    checkedBg: Colors.primary,
    checkedColor: 'white',
    checkedBorder: Colors.primary,
  },
};

/* Checkbox disabled */
export const FormCheckboxDisabled: FormCheckboxDisabledStyleType = {
  bg: Colors.gray200,
  color: Colors.gray300,
  border: Colors.gray300,
};

/* Checkbox block variations */
// Color array values [default, hover, checked, disabled]
export const FormCheckboxVariantVariantStyles: {
  [key in FormCheckboxBlockVariationType]?: FormCheckboxBlockVariantStyle;
} = {
  solid: {
    bg: [Colors.secondary, Colors.yellow, Colors.primaryDark, Colors.gray300],
    color: [Colors.gray800, Colors.white, Colors.white, Colors.gray500],
    border: [Colors.secondary, Colors.yellow, Colors.primaryDark, Colors.gray300],
    fontWeight: [FontWeightValue.bold, FontWeightValue.bold, FontWeightValue.bold, FontWeightValue.bold],
  },
  outlined: {
    bg: [Colors.transparent, Colors.transparent, Colors.secondary, Colors.gray200],
    color: [Colors.gray800, Colors.primaryDark, Colors.primaryDark, Colors.gray500],
    border: [Colors.gray500, Colors.primaryDark, Colors.primaryDark, Colors.gray200],
    fontWeight: [FontWeightValue.normal, FontWeightValue.normal, FontWeightValue.bold, FontWeightValue.normal],
  },
};
