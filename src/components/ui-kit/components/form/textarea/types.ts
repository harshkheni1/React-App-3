import { TextAreaProps } from 'react-uforms';
import { SpacingProps } from '../../../const';
import { TextareaSizesType } from './const';
import { HtmlProps } from '../../../utils/types';

export interface FormTextAreaProps extends TextAreaProps {
  measure?: TextareaSizesType;
  clearable?: boolean;
  maxlength?: string;
}

export type FormTextAreaButtonProps = HtmlProps<HTMLButtonElement>;

export interface FormTextAreaWrapProps extends HtmlProps<HTMLDivElement>, SpacingProps {
  clearable?: boolean;
}

export interface FormTextAreaFieldProps extends FormTextAreaProps, SpacingProps {
  label?: string;
  tooltip?: string | unknown;
}
