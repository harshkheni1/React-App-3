import { RadioProps, RadioGroupProps, RadioGroupItemProps } from 'react-uforms';
import { ArrayToType, ElementSizesType, SpacingProps } from '../../../const';
import { HtmlProps } from '../../../utils';

export const FormRadioColorArray = ['primary', 'gray800'] as const;
export type FormRadioColorType = ArrayToType<typeof FormRadioColorArray>;

export interface FormRadioCustomProps {
  color?: FormRadioColorType;
  measure?: ElementSizesType;
}

export interface FormRadioProps extends Omit<RadioProps, 'color'>, FormRadioCustomProps {
  block?: boolean;
}
export interface FormRadioContainerProps extends HtmlProps<HTMLLabelElement>, SpacingProps {
  block?: boolean;
  as?: any;
}

export interface FormRadioElementProps extends HtmlProps<HTMLSpanElement>, FormRadioCustomProps {
  planStyle?: boolean;
}
export interface FormRadioLabelProps {
  block?: boolean;
}
export interface FormRadioFieldProps extends FormRadioProps, SpacingProps {
  label?: any;
  block?: boolean;
  color?: FormRadioColorType;
}

export interface FormRadioGroupProps {
  id?: string;
  name: string;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  value?: any;
  onChange?: () => void;
}

export interface FormRadioGroupFieldProps extends RadioGroupProps {
  label?: string;
  name: string;
}

export interface FormRadioGroupItemFieldProps extends RadioGroupItemProps, SpacingProps {
  label?: string;
  planStyle?: boolean;
  color?: FormRadioColorType;
}
