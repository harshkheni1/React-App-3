import { Props } from 'react-select';
import { SpacingProps } from '../../../const/helpers';

export interface FormSelectProps extends Props {
  location?: boolean;
  error?: boolean;
  isCreatable?: boolean;
  isMobile?: boolean;
  hideError?: boolean;
}

export interface FormSelectFieldProps extends FormSelectProps, SpacingProps {
  label?: string | unknown;
}
