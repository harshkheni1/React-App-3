import { CheckboxProps, CheckboxGroupProps, CheckboxGroupItemProps } from 'react-uforms';
import { ColorType, SpacingProps, ArrayToType } from '../../../const';
import { HtmlProps } from '../../../utils';

export const FormCheckboxColorArray = ['white', 'primary'] as const;
export const FormCheckboxSizeArray = ['xs', 'sm', 'md', 'lg'] as const;
export type FormCheckboxSizeType = ArrayToType<typeof FormCheckboxSizeArray>;

export const FormCheckboxBlockVariationArray = ['solid', 'outlined'] as const;
export type FormCheckboxBlockVariationType = ArrayToType<typeof FormCheckboxBlockVariationArray>;

export interface FormCheckboxCustomProps {
  color?: ColorType;
  measure?: FormCheckboxSizeType;
  variant?: FormCheckboxBlockVariationType;
}

export interface FormCheckboxCustomStyledAttrProps extends FormCheckboxCustomProps {
  $variant?: FormCheckboxBlockVariationType;
}

export interface FormCheckboxProps extends Omit<CheckboxProps, 'color'>, FormCheckboxCustomProps {
  toggle?: boolean;
}
export interface FormCheckboxRawProps extends HtmlProps<HTMLInputElement>, FormCheckboxCustomProps {
  toggle?: boolean;
}

export interface FormCheckboxRawStyledAttrProps extends FormCheckboxRawProps {
  $color?: ColorType;
}

export interface FormCheckboxContainerProps extends HtmlProps<HTMLLabelElement>, SpacingProps {
  as?: any;
  inline?: boolean;
}

export interface FormCheckboxContainerStyledAttrProps extends FormCheckboxContainerProps {
  $name?: string;
}

export interface FormCheckboxElementProps extends Omit<HtmlProps<HTMLSpanElement>, 'ref'>, FormCheckboxCustomProps {}
export interface FormCheckboxLabelProps {
  toggle?: boolean;
}

export interface FormCheckboxFieldProps extends FormCheckboxProps, SpacingProps {
  label?: any;
  inline?: boolean;
}

export interface FormCheckboxPlanGroupFieldProps extends CheckboxGroupItemProps, SpacingProps {
  value: string;
  label?: string;
  sku?: string;
  vendor?: string;
  itemDescription?: string;
}

export interface FormCheckboxRawFieldProps extends FormCheckboxRawProps, SpacingProps {
  label?: any;
}

export interface FormCheckboxSizeStyleType {
  measure: number;
  borderRadius?: number;
  checkedIconSize: number;
  line: {
    fontSize: number;
  };
  block: {
    fontSize: number;
  };
}

export interface FormCheckboxDisabledStyleType {
  bg: string;
  color: string;
  border: string;
}

export interface FormCheckboxColorStyleType {
  bg: string;
  border: string;
  checkedBg: string;
  checkedColor: ColorType;
  checkedBorder: string;
}

export interface FormCheckboxGroupProps {
  id?: string;
  name: string;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  value?: any;
  onChange?: () => void;
}

export interface FormCheckboxGroupFieldProps extends CheckboxGroupProps {
  label?: string;
  name: string;
  hideError?: boolean;
}

export interface FormCheckboxGroupItemProps extends CheckboxGroupItemProps, SpacingProps {
  value: string;
  label?: string;
  toggle?: boolean;
  variant?: FormCheckboxBlockVariationType;
  inline?: boolean;
  measure?: FormCheckboxSizeType;
}

export interface FormCheckboxBlockVariantStyle {
  bg: string[];
  color: string[];
  border: string[];
  fontWeight: number[];
}
