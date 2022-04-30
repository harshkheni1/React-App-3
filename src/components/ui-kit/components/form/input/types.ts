import { TextProps } from 'react-uforms';
import { ArrayToType, SpacingProps } from '../../../const';
import { HtmlProps } from '../../../utils';

export const FormInputTypeArray = ['text', 'password', 'email', 'tel', 'number', 'hidden'] as const;
export type FormInputType = ArrayToType<typeof FormInputTypeArray>;

export const FormInputSizeArray = ['sm', 'md', 'lg'] as const;
export type FormInputSizeType = ArrayToType<typeof FormInputSizeArray>;

export const FormInputVariantArray = ['default', 'line'] as const;
export type FormInputVariantType = ArrayToType<typeof FormInputVariantArray>;

export interface FormInputProps extends TextProps {
  type: FormInputType;
  id?: string;
  measure?: FormInputSizeType;
  name: string;
  hideError?: boolean;
  clearable?: boolean;
  variant?: FormInputVariantType;
  maxLength?: number;
}

export interface FormInputWrapProps extends HtmlProps<HTMLDivElement>, SpacingProps {}

export interface FormInputFieldProps extends FormInputProps, SpacingProps {
  label?: string;
  tooltip?: string | unknown;
}

export interface FormInputClearableProps extends FormInputProps {
  clearable?: boolean;
  onClear?(): void;
}

export interface FormInputStyledAttrProps extends FormInputClearableProps {
  $variant?: FormInputVariantType;
}

export type FormInputClearProps = HtmlProps<HTMLButtonElement>;

export interface FormInputEmailProps extends TextProps {
  id?: string;
  measure?: FormInputSizeType;
  hideError?: boolean;
}
export interface FormInputEmailFieldProps extends FormInputEmailProps, SpacingProps {
  label?: string;
}

export interface FormInputPhoneProps extends TextProps {
  id?: string;
  measure?: FormInputSizeType;
  hideError?: boolean;
  mask?: string;
}
export interface FormInputHiddenProps extends HtmlProps<HTMLInputElement> {
  measure?: FormInputSizeType;
}

export interface FormInputPhoneFieldProps extends FormInputPhoneProps, SpacingProps {
  label?: string;
}
