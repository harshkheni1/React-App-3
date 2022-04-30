import { HtmlProps } from '../../../utils';
import { SpacingProps } from '../../../const';
import { ButtonColorType } from '../../button/const';

export interface FormFileProps extends HtmlProps<HTMLInputElement> {
  buttonStyle?: ButtonColorType;
  buttonTitle?: string;
}

export interface FormFileWrapProps extends HtmlProps<HTMLDivElement>, SpacingProps {}

export interface FormFileFieldProps extends FormFileProps, SpacingProps {
  label?: string;
}
